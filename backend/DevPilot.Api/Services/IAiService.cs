namespace DevPilot.Api.Services
{
    public interface IAiService
    {
        Task<string> GetAnswerAsync(string message);
    }
}