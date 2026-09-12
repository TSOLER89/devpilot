namespace DevPilot.Api.Services
{
    public class ChatService : IChatService
    {
        private readonly IAiService _aiService;

        public ChatService(IAiService aiService)
        {
            _aiService = aiService;
        }

        public async Task<string> GetResponseAsync(string message)
        {
            return await _aiService.GetAnswerAsync(message);
        }
    }
}