using DevPilot.Api.Models;

namespace DevPilot.Api.Services
{
    public interface IChatService
    {
        Task<AiResult> GetResponseAsync(
            string message,
            string? previousResponseId,
            string mode
        );
    }
}