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
            string? previousResponseId)
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

                Instructions = """
                    You are DevPilot, a friendly developer learning assistant.

                    Focus on:
                    C#, .NET, ASP.NET Core, React, JavaScript,
                    HTML, CSS, Git, APIs and software development.

                    Default response style:
                    - Be concise and beginner-friendly.
                    - Usually answer in 80-150 words.
                    - Use at most 3-5 bullet points.
                    - Give one small code example only when useful.
                    - Do not create a full tutorial unless asked.
                    - Answer only what the user asked.
                    - If the user asks for more detail, expand the previous topic.
                    - Use Markdown when helpful.
                    """
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