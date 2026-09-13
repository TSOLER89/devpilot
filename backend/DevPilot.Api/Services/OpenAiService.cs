#pragma warning disable OPENAI001

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

        public async Task<string> GetAnswerAsync(string message)
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
                Model = "gpt-5.6-luna"
            };

            options.InputItems.Add(
                ResponseItem.CreateUserMessageItem(message)
            );

            var response = await client.CreateResponseAsync(options);

            return response.Value.GetOutputText();
        }
    }
}