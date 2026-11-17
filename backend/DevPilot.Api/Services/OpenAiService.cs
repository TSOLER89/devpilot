#pragma warning disable OPENAI001

using DevPilot.Api.Models;
using OpenAI.Responses;

namespace DevPilot.Api.Services
{
    public class OpenAiService : IAiService
    {
        private readonly IConfiguration _configuration;

        public OpenAiService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<AiResult> GetAnswerAsync(
            string message,
            string? previousResponseId,
            string mode,
            string? topic)
        {
            var apiKey = _configuration["OpenAI:ApiKey"];

            if (string.IsNullOrWhiteSpace(apiKey))
            {
                throw new InvalidOperationException(
                    "OpenAI API key is missing."
                );
            }

            var client = new ResponsesClient(apiKey);

            var options = new CreateResponseOptions
            {
                Model = "gpt-5.6-luna",

                PreviousResponseId = previousResponseId,

                MaxOutputTokenCount = 400,

                ReasoningOptions = new ResponseReasoningOptions
                {
                    ReasoningEffortLevel =
                        ResponseReasoningEffortLevel.None
                },

                Instructions = DevPilotInstructions.Build(mode, topic)
            };

            options.InputItems.Add(
                ResponseItem.CreateUserMessageItem(message)
            );

            var response =
                await client.CreateResponseAsync(options);

            return new AiResult
            {
                Answer = response.Value.GetOutputText(),
                ResponseId = response.Value.Id
            };
        }
    }
}

#pragma warning restore OPENAI001
