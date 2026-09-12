namespace DevPilot.Api.Services
{
    public class ChatService
    {
        public string GetResponse(string message)
        {
            return $"DevPilot received: {message}";
        }
    }
}