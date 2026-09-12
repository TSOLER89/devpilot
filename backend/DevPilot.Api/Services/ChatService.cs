namespace DevPilot.Api.Services
{
    public class ChatService : IChatService
    {
        public Task<string> GetResponseAsync(string message)
        {
            var question = message.ToLower();

            if (question.Contains("react"))
            {
                return Task.FromResult("React is a JavaScript library used to build user interfaces with reusable components.") ;
            }

            if (question.Contains("javascript"))
            {
                return Task.FromResult("JavaScript is a programming language commonly used to make websites interactive.");
            }

            if (question.Contains("c#"))
            {
                return Task.FromResult("C# is a programming language developed by Microsoft and commonly used with .NET.");
            }

            if (question.Contains(".net"))
            {
                return Task.FromResult(".NET is a development platform from Microsoft used to build web APIs, applications and services.");
            }

            if (question.Contains("git"))
            {
                return Task.FromResult("Git is a version control system used to track changes in source code.");
            }

            if (question.Contains("rest api"))
            {
                return Task.FromResult("A REST API allows applications to communicate over HTTP using methods such as GET, POST, PUT and DELETE.");
            }

            if (question.Contains("dependency injection"))
            {
                return Task.FromResult("Dependency injection means that a class receives the services it needs instead of creating them itself.");
            }

            if (question.Contains("usestate"))
            {
                return Task.FromResult("useState is a React Hook used to store and update state inside a component.");
            }

            return Task.FromResult(
                "I don't know that yet. Later, DevPilot will use an AI service to answer more advanced questions.");
        }
    }
}