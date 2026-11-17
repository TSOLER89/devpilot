using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using DevPilot.Api.Models;
using DevPilot.Api.Services;
using Microsoft.Extensions.Options;

static class ScopeChecks
{
    public static async Task RunLiveAcknowledgementsAsync()
    {
        using var client = new HttpClient { BaseAddress = new Uri("http://localhost:11434/"), Timeout = TimeSpan.FromSeconds(150) };
        foreach (var (message, expected) in new[]
        {
            ("okay got it", "allow"),
            ("tack, jag förstår", "allow"),
            ("Thanks, now tell me how to cook pasta", "redirect")
        })
        {
            using var response = await client.PostAsJsonAsync("api/chat", new
            {
                model = new OllamaOptions().Model,
                messages = new[]
                {
                    new { role = "system", content = ProgrammingScope.Instructions },
                    new { role = "user", content = "what about the color blue do you think is good on me?" },
                    new { role = "assistant", content = ProgrammingScope.RedirectMessage },
                    new { role = "user", content = message }
                },
                stream = false,
                format = ProgrammingScope.ResponseFormat,
                options = new { temperature = 0, num_predict = 40 }
            });
            response.EnsureSuccessStatusCode();
            using var result = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
            var decision = ProgrammingScope.ParseDecision(result.RootElement.GetProperty("message").GetProperty("content").GetString()!);
            if (decision != expected) throw new Exception($"Acknowledgement check failed: {message} => {decision}");
            Console.WriteLine($"PASS (live local Ollama): {message} => {decision}");
        }
    }

    public static async Task RunLiveAsync()
    {
        using var client = new HttpClient { BaseAddress = new Uri("http://localhost:11434/"), Timeout = TimeSpan.FromSeconds(150) };
        var service = new OllamaService(client, Options.Create(new OllamaOptions()));
        var cases = new[]
        {
            ("How do I train for a marathon?", "explain", "React", false),
            ("How can I make a cake?", "teach", "C#", false),
            ("How can I build a cake ordering website in React?", "plan", "React", true),
            ("How do I debug a C# API?", "debug", "C#", true)
        };
        foreach (var (message, mode, topic, allowed) in cases)
        {
            var result = await service.GetAnswerAsync(message, [], mode, topic, default);
            var redirected = result.Answer == ProgrammingScope.RedirectMessage;
            if (allowed ? redirected || result.Answer == ProgrammingScope.ClarifyMessage : !redirected)
                throw new Exception($"Live scope check failed for: {message}\nAnswer: {result.Answer}");
            Console.WriteLine($"PASS (live local Ollama): {message} => {(redirected ? "redirected" : "programming answer generated")}");
        }
    }

    public static async Task RunAsync()
    {
        if (!ProgrammingScope.Instructions.Contains("standalone thanks, acknowledgements, and farewells") ||
            !ProgrammingScope.Instructions.Contains("After a redirect, \"okay got it\" => allow") ||
            !DevPilotInstructions.Build("explain", null).Contains("without repeating the programming-focus reminder"))
            throw new Exception("Scope and response instructions must allow brief acknowledgements after a redirect.");
        foreach (var (classification, expected) in new[]
        {
            ("{\"decision\":\"redirect\"}", ProgrammingScope.RedirectMessage),
            ("{\"decision\":\"clarify\"}", ProgrammingScope.ClarifyMessage),
            ("invalid json", ProgrammingScope.ClarifyMessage),
            ("{\"decision\":\"unknown\"}", ProgrammingScope.ClarifyMessage),
            ("{\"decision\":true}", ProgrammingScope.ClarifyMessage)
        })
        {
            var handler = new FakeOllama(classification);
            var result = await CreateService(handler).GetAnswerAsync("An unrelated request", [], "explain", "React", default);
            if (result.Answer != expected || handler.Requests.Count != 1)
                throw new Exception("Out-of-scope or invalid classifications must not generate a free-form answer.");
        }

        var allowedHandler = new FakeOllama("{\"decision\":\"allow\"}", "React application help");
        var history = new[] { new ChatHistoryMessage { Role = "user", Content = "I am building a React website." } };
        var answer = await CreateService(allowedHandler).GetAnswerAsync("How do I add a form?", history, "debug", "React", default);
        if (answer.Answer != "React application help" || allowedHandler.Requests.Count != 2)
            throw new Exception("Allowed programming requests must reach answer generation.");

        var classificationRequest = allowedHandler.Requests[0];
        var generationRequest = allowedHandler.Requests[1];
        if (!classificationRequest.TryGetProperty("format", out _) || generationRequest.TryGetProperty("format", out _))
            throw new Exception("Only the classifier should request structured JSON.");
        if (generationRequest.GetProperty("messages")[0].GetProperty("content").GetString() != DevPilotInstructions.Build("debug", "React"))
            throw new Exception("Scope checking must preserve Route and Mode instructions.");
        foreach (var request in allowedHandler.Requests)
        {
            var messages = request.GetProperty("messages");
            if (messages[1].GetProperty("content").GetString() != history[0].Content ||
                messages[2].GetProperty("content").GetString() != "How do I add a form?")
                throw new Exception("Both stages must retain history and the latest request.");
        }
        Console.WriteLine("PASS: scope routing blocks unrelated/invalid decisions and preserves programming requests, history, Route, and Mode.");
    }

    private static OllamaService CreateService(FakeOllama handler) => new(
        new HttpClient(handler) { BaseAddress = new Uri("http://local-test/") },
        Options.Create(new OllamaOptions()));

    private sealed class FakeOllama(params string[] answers) : HttpMessageHandler
    {
        public List<JsonElement> Requests { get; } = [];

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            using var json = JsonDocument.Parse(await request.Content!.ReadAsStringAsync(cancellationToken));
            Requests.Add(json.RootElement.Clone());
            var content = answers[Requests.Count - 1];
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = JsonContent.Create(new { message = new { content } })
            };
        }
    }
}
