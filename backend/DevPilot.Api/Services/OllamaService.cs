using System.Net;
using System.Net.Http.Json;
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
                new("system", BuildSystemPrompt(mode, topic))
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

            try
            {
                using var response = await _httpClient.PostAsJsonAsync(
                    "api/chat",
                    new OllamaChatRequest(
                        _options.Model,
                        messages,
                        Stream: false,
                        Options: new Dictionary<string, int>
                        {
                            ["num_predict"] = _options.NumPredict
                        }),
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

                return new AiResult
                {
                    Answer = answer.Trim(),
                    ResponseId = string.Empty
                };
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

        private static string BuildSystemPrompt(string mode, string? topic)
        {
            var modeInstruction = (mode ?? "explain").ToLowerInvariant() switch
            {
                "debug" =>
                    "Help identify the root cause of bugs. Explain the evidence and provide a focused, verifiable fix.",
                "improve" =>
                    "Review the code or approach and suggest practical, focused improvements with reasons.",
                "error" =>
                    "Explain the error in approachable language, identify likely causes, and give concrete troubleshooting steps.",
                "quiz" =>
                    "Act as a programming tutor. Ask one question at a time and do not reveal its answer until the user responds.",
                "teach" =>
                    "Teach the concept step by step, with a small example and a brief check for understanding when useful.",
                "plan" =>
                    "Create a clear, ordered, actionable plan. State important assumptions and keep each step practical.",
                _ =>
                    "Explain the programming concept clearly, accurately, and at an appropriate level for the question."
            };

            var topicInstruction = string.IsNullOrWhiteSpace(topic)
                ? "No specific learning route is selected."
                : $"The user selected the {topic} learning route. Prefer relevant examples from this topic.";

            return $"""
                You are DevPilot, a professional and helpful programming assistant.
                Focus on C#, .NET, ASP.NET Core, React, JavaScript, APIs, debugging, and software development.
                Current mode: {modeInstruction}
                Current route: {topicInstruction}

                Write clear, concise answers. Use Markdown headings and lists when they improve readability.
                Use inline code for identifiers and fenced code blocks for multi-line examples.
                Explain code examples and avoid inventing APIs or unsupported facts.
                """;
        }

        private sealed record OllamaChatRequest(
            string Model,
            IReadOnlyList<OllamaMessage> Messages,
            bool Stream,
            Dictionary<string, int> Options);

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
