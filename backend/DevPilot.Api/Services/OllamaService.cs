using System.Net;
using System.Net.Http.Json;
using System.Text.Json.Serialization;
using DevPilot.Api.Models;
using Microsoft.Extensions.Options;

namespace DevPilot.Api.Services
{
    public class OllamaService : IOllamaService
    {
        private const int MaxHistoryMessages = 20;

        private readonly HttpClient _httpClient;
        private readonly OllamaOptions _options;

        public OllamaService(HttpClient httpClient, IOptions<OllamaOptions> options)
        {
            _httpClient = httpClient;
            _options = options.Value;
        }

        public async Task<AiResult> GetAnswerAsync(
            string message,
            IReadOnlyList<ChatHistoryMessage> conversationHistory,
            string mode,
            string? topic,
            CancellationToken cancellationToken)
        {
            var messages = new List<OllamaMessage>
            {
                new("system", DevPilotInstructions.Build(mode, topic))
            };

            foreach (var historyMessage in
                (conversationHistory ?? Array.Empty<ChatHistoryMessage>())
                .TakeLast(MaxHistoryMessages))
            {
                if (string.IsNullOrWhiteSpace(historyMessage.Content) ||
                    (historyMessage.Role != "user" && historyMessage.Role != "assistant"))
                {
                    continue;
                }

                messages.Add(new OllamaMessage(historyMessage.Role, historyMessage.Content));
            }

            messages.Add(new OllamaMessage("user", message));

            var scopeMessages = new List<OllamaMessage> { new("system", ProgrammingScope.Instructions) };
            scopeMessages.AddRange(messages.Skip(1));
            var decision = ProgrammingScope.ParseDecision(
                await SendAsync(scopeMessages, cancellationToken, classify: true));

            return new AiResult
            {
                Answer = decision switch
                {
                    "allow" => await SendAsync(messages, cancellationToken, classify: false),
                    "redirect" => ProgrammingScope.RedirectMessage,
                    _ => ProgrammingScope.ClarifyMessage
                },
                ResponseId = string.Empty
            };
        }

        private async Task<string> SendAsync(
            IReadOnlyList<OllamaMessage> messages,
            CancellationToken cancellationToken,
            bool classify)
        {
            try
            {
                using var response = await _httpClient.PostAsJsonAsync(
                    "api/chat",
                    new OllamaChatRequest(
                        _options.Model,
                        messages,
                        Stream: false,
                        Options: classify
                            ? new Dictionary<string, object> { ["num_predict"] = 40, ["temperature"] = 0 }
                            : new Dictionary<string, object> { ["num_predict"] = _options.NumPredict },
                        Format: classify ? ProgrammingScope.ResponseFormat : null),
                    cancellationToken);

                if (!response.IsSuccessStatusCode)
                {
                    var errorBody = await response.Content.ReadAsStringAsync(cancellationToken);

                    if (IsMissingModel(response.StatusCode, errorBody))
                    {
                        throw new OllamaServiceException(
                            OllamaFailureKind.ModelNotFound,
                            $"Ollama model '{_options.Model}' was not found. Run `ollama pull {_options.Model}`.");
                    }

                    throw new OllamaServiceException(
                        OllamaFailureKind.ServerError,
                        $"Ollama returned HTTP {(int)response.StatusCode}: {GetErrorMessage(errorBody)}");
                }

                var result = await response.Content.ReadFromJsonAsync<OllamaChatResponse>(
                    cancellationToken);

                if (!string.IsNullOrWhiteSpace(result?.Error))
                {
                    if (IsMissingModel(response.StatusCode, result.Error))
                    {
                        throw new OllamaServiceException(
                            OllamaFailureKind.ModelNotFound,
                            $"Ollama model '{_options.Model}' was not found. Run `ollama pull {_options.Model}`.");
                    }

                    throw new OllamaServiceException(
                        OllamaFailureKind.ServerError,
                        $"Ollama reported an error: {result.Error}");
                }

                var answer = result?.Message?.Content;
                if (string.IsNullOrWhiteSpace(answer))
                {
                    throw new OllamaServiceException(
                        OllamaFailureKind.InvalidResponse,
                        "Ollama returned an empty response.");
                }

                return answer.Trim();
            }
            catch (HttpRequestException exception)
            {
                throw new OllamaServiceException(
                    OllamaFailureKind.Unavailable,
                    $"Could not connect to Ollama at {_options.BaseUrl}. Make sure Ollama is running.",
                    exception);
            }
            catch (OperationCanceledException exception)
                when (!cancellationToken.IsCancellationRequested)
            {
                throw new OllamaServiceException(
                    OllamaFailureKind.Timeout,
                    $"Ollama did not respond within the configured {_options.TimeoutSeconds}-second timeout.",
                    exception);
            }
        }

        private static bool IsMissingModel(HttpStatusCode statusCode, string errorBody)
        {
            return statusCode == HttpStatusCode.NotFound &&
                errorBody.Contains("model", StringComparison.OrdinalIgnoreCase) &&
                errorBody.Contains("not found", StringComparison.OrdinalIgnoreCase);
        }

        private static string GetErrorMessage(string errorBody)
        {
            return string.IsNullOrWhiteSpace(errorBody)
                ? "No error details were returned."
                : errorBody;
        }

        private sealed record OllamaChatRequest(
            string Model,
            IReadOnlyList<OllamaMessage> Messages,
            bool Stream,
            Dictionary<string, object> Options,
            [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] object? Format);

        private sealed record OllamaMessage(string Role, string Content);

        private sealed class OllamaChatResponse
        {
            public OllamaResponseMessage? Message { get; set; }

            public string? Error { get; set; }
        }

        private sealed class OllamaResponseMessage
        {
            public string? Content { get; set; }
        }
    }

    public enum OllamaFailureKind
    {
        Unavailable,
        ModelNotFound,
        Timeout,
        InvalidResponse,
        ServerError
    }

    public class OllamaServiceException : Exception
    {
        public OllamaServiceException(
            OllamaFailureKind failureKind,
            string message,
            Exception? innerException = null)
            : base(message, innerException)
        {
            FailureKind = failureKind;
        }

        public OllamaFailureKind FailureKind { get; }
    }
}
