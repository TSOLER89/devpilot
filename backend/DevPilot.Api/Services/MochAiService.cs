namespace DevPilot.Api.Services
{
    public class MockAiService : IAiService
    {
        public Task<string> GetAnswerAsync(string message)
        {
            var question = message.ToLower();

            if (question.Contains("react"))
            {
                return Task.FromResult(
                    "React is a JavaScript library used to build user interfaces with reusable components."
                );
            }

            if (question.Contains("javascript"))
            {
                return Task.FromResult(
                    "JavaScript is a programming language commonly used to make websites interactive."
                );
            }

            if (question.Contains("c#"))
            {
                return Task.FromResult(
                    "C# is a programming language developed by Microsoft and commonly used with .NET."
                );
            }

            if (question.Contains(".net"))
            {
                return Task.FromResult(
                    ".NET is a development platform from Microsoft used to build web APIs, applications and services."
                );
            }

            if (question.Contains("git"))
            {
                return Task.FromResult(
                    "Git is a version control system used to track changes in source code."
                );
            }

            return Task.FromResult(
                "This is currently a mock AI response. A real AI service will be connected later."
            );
        }
    }
}