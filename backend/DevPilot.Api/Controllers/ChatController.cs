using DevPilot.Api.Models;
using DevPilot.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace DevPilot.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;
        private readonly IOllamaService _ollamaService;

        public ChatController(IChatService chatService, IOllamaService ollamaService)
        {
            _chatService = chatService;
            _ollamaService = ollamaService;
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok(new
            {
                message = "DevPilot API is running"
            });
        }


        [HttpPost]
        public async Task<IActionResult> SendMessage(
            ChatRequest request,
            CancellationToken cancellationToken)
        {
            var provider = request.Provider?.Trim().ToLowerInvariant();
            if (provider != "ollama" && provider != "openai")
            {
                return BadRequest(new
                {
                    message = "Provider must be 'ollama' or 'openai'."
                });
            }

            try
            {
                var result = provider == "ollama"
                    ? await _ollamaService.GetAnswerAsync(
                        request.Message,
                        request.ConversationHistory ?? [],
                        request.Mode,
                        request.Topic,
                        cancellationToken)
                    : await _chatService.GetResponseAsync(
                        request.Message,
                        request.PreviousResponseId,
                        request.Mode,
                        request.Topic);

                var response = new ChatResponse
                {
                    Answer = result.Answer,
                    ResponseId = result.ResponseId
                };

                return Ok(response);
            }
            catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
            {
                return new EmptyResult();
            }
            catch (OllamaServiceException exception)
            {
                var statusCode = exception.FailureKind switch
                {
                    OllamaFailureKind.Unavailable => StatusCodes.Status503ServiceUnavailable,
                    OllamaFailureKind.ModelNotFound => StatusCodes.Status503ServiceUnavailable,
                    OllamaFailureKind.Timeout => StatusCodes.Status504GatewayTimeout,
                    _ => StatusCodes.Status502BadGateway
                };

                return StatusCode(statusCode, new { message = exception.Message });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return StatusCode(500, new
                {
                    message = "DevPilot could not reach the AI service. Please try again later."
                });
            }
        }
    }
}