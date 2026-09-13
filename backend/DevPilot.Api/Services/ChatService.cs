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
            string? previousResponseId)
        {
            return await _aiService.GetAnswerAsync(
                message,
                previousResponseId
            );
        }
    }
}