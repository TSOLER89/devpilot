using DevPilot.Api.Models;

namespace DevPilot.Api.Services
{
    public interface IAiService
    {
        Task<AiResult> GetAnswerAsync(
            string message,
            string? previousResponseId,
            string mode
        );
    }
}