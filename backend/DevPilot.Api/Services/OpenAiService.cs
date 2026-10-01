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

            var modeInstruction = mode.ToLowerInvariant() switch
{
    "debug" =>
        "Help the user find bugs. Explain what is wrong, why it happens, and suggest a focused fix.",

    "improve" =>
        "Review the user's code or approach and suggest practical improvements. Keep changes focused and explain why they help.",

    "error" =>
        "Explain the error message in beginner-friendly language. Describe the likely cause and give clear steps to fix it.",

    "quiz" =>
        "Act as a programming tutor. Ask the user one question at a time about the topic. Do not reveal the answer immediately.",

    _ =>
        "Explain the requested programming concept clearly and in beginner-friendly language."
};

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

               Instructions = $"""
                    You are DevPilot, a friendly developer learning assistant.

                    Focus on:
                    C#, .NET, ASP.NET Core, React, JavaScript,
                    HTML, CSS, Git, APIs and software development.

                    Current developer mode:
                    {modeInstruction}

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