namespace DevPilot.Api.Services
{
    public class ChatService
    {
        public string GetResponse(string message)
        {
            var question = message.ToLower();

            if (question.Contains("react"))
            {
                return "React is a JavaScript library used to build user interfaces with reusable components.";
            }

            if (question.Contains("javascript"))
            {
                return "JavaScript is a programming language commonly used to make websites interactive.";
            }

            if (question.Contains("c#"))
            {
                return "C# is a programming language developed by Microsoft and commonly used with .NET.";
            }

            if (question.Contains(".net"))
            {
                return ".NET is a development platform from Microsoft used to build web APIs, applications and services.";
            }

            if (question.Contains("git"))
            {
                return "Git is a version control system used to track changes in source code.";
            }

            if (question.Contains("rest api"))
            {
                return "A REST API allows applications to communicate over HTTP using methods such as GET, POST, PUT and DELETE.";
            }

            if (question.Contains("dependency injection"))
            {
                return "Dependency injection means that a class receives the services it needs instead of creating them itself.";
            }

            if (question.Contains("usestate"))
            {
                return "useState is a React Hook used to store and update state inside a component.";
            }

            return "I don't know that yet. Later, DevPilot will use an AI service to answer more advanced questions.";
        }
    }
}