using DevPilot.Api.Models;

namespace DevPilot.Api.Services
{
    public interface IOllamaService
    {
        Task<AiResult> GetAnswerAsync(
            string message,
            IReadOnlyList<ChatHistoryMessage> conversationHistory,
            string mode,
            string? topic,
            CancellationToken cancellationToken
        );
    }
}
