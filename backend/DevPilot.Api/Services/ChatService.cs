using DevPilot.Api.Models;

namespace DevPilot.Api.Services
{
    public class ChatService : IChatService
    {
        private readonly IAiService _aiService;

        public ChatService(IAiService aiService)
        {
            _aiService = aiService;
        }

        public async Task<AiResult> GetResponseAsync(
            string message,
            string? previousResponseId,
            string mode,
            string? topic)
        {
            return await _aiService.GetAnswerAsync(
                message,
                previousResponseId,
                mode,
                topic
            );
        }
    }
}