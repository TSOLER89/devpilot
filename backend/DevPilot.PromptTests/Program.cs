using DevPilot.Api.Services;

// Dependency-free checks: run with dotnet run --project backend/DevPilot.PromptTests.
var modes = new Dictionary<string, string>
{
    ["explain"] = "Explain the programming concept",
    ["debug"] = "root cause of bugs",
    ["improve"] = "focused improvements",
    ["error"] = "troubleshooting steps",
    ["quiz"] = "do not reveal its answer until the user responds",
    ["teach"] = "Teach the concept step by step",
    ["plan"] = "ordered, actionable plan"
};
var topics = new[] { ".NET", "React", "JavaScript", "C#", "API", "HTML", "CSS", "Git" };

void Check(bool condition, string message)
{
    if (!condition) throw new InvalidOperationException(message);
}

foreach (var (mode, expectedBehavior) in modes)
{
    foreach (var topic in topics)
    {
        var prompt = DevPilotInstructions.Build(mode, topic);
        Check(prompt.Split("Current mode: ")[1].Split("Current route: ")[0].Contains(expectedBehavior),
              $"Missing behavior for {mode}/{topic}");
        Check(prompt.Contains($"The user selected the {topic} learning route."), $"Missing topic: {topic}");
        Check(prompt.Contains("Do not provide the unrelated instructions"), $"Missing scope for {mode}/{topic}");
        Check(prompt.Contains("not isolated words"), $"Missing intent guidance for {mode}/{topic}");
        Check(prompt.Contains("Help with legitimate software questions outside the selected route too"), "Route must not become a refusal rule");
        Check(prompt.Contains("previous off-topic answer does not change"), "History must not override scope");
    }
}
Console.WriteLine("PASS: all 56 mode/route combinations preserve scope, intent, and selected behavior.");

Check(DevPilotInstructions.Build(" DEBUG ", " React ") == DevPilotInstructions.Build("debug", "React"), "Mode/topic normalization failed");
Check(DevPilotInstructions.Build(null, null) == DevPilotInstructions.Build("explain", ""), "Missing values must use safe defaults");
Check(DevPilotInstructions.Build("unknown", " ") == DevPilotInstructions.Build("explain", null), "Unknown mode must fall back to Explain");
Console.WriteLine("PASS: missing, unknown, mixed-case, and padded settings use the expected defaults.");

var instructions = DevPilotInstructions.Build("explain", null);
Check(instructions.Contains("is a cooking request: politely redirect"), "Missing unrelated-request example");
Check(instructions.Contains("is a programming request: help build the React application"), "Missing everyday-domain programming example");
Check(instructions.Contains("is a programming request: provide debugging assistance"), "Missing debugging example");
Check(instructions.Contains("greetings and follow-up questions") && instructions.Contains("clarifying question"), "Missing guidance against unnecessary refusals");
Console.WriteLine("PASS: scope examples distinguish cooking from software and allow legitimate follow-ups.");

await ScopeChecks.RunAsync();

// Optional real-model behavior checks; only calls the local Ollama endpoint.
if (args.Contains("--live-ollama")) await ScopeChecks.RunLiveAsync();
if (args.Contains("--live-acknowledgements")) await ScopeChecks.RunLiveAcknowledgementsAsync();
