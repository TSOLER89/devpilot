using DevPilot.Api.Services;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IChatService, ChatService>();

builder.Services.AddScoped<IAiService, OpenAiService>();

builder.Services
    .AddOptions<OllamaOptions>()
    .Bind(builder.Configuration.GetSection(OllamaOptions.SectionName))
    .Validate(
        options => Uri.TryCreate(options.BaseUrl, UriKind.Absolute, out var uri) &&
            (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps),
        "Ollama:BaseUrl must be an absolute HTTP or HTTPS URL.")
    .Validate(options => !string.IsNullOrWhiteSpace(options.Model),
        "Ollama:Model must be configured.")
    .Validate(options => options.TimeoutSeconds > 0,
        "Ollama:TimeoutSeconds must be greater than zero.")
    .Validate(options => options.NumPredict > 0,
        "Ollama:NumPredict must be greater than zero.")
    .ValidateOnStart();

builder.Services.AddHttpClient<IOllamaService, OllamaService>((services, client) =>
{
    var options = services.GetRequiredService<IOptions<OllamaOptions>>().Value;
    client.BaseAddress = new Uri($"{options.BaseUrl.TrimEnd('/')}/");
    client.Timeout = TimeSpan.FromSeconds(options.TimeoutSeconds);
});

//koppla frontend till backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevPilotFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


var app = builder.Build();

app.UseCors("DevPilotFrontend");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();



