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

        public ChatController(IChatService chatService)
        {
            _chatService = chatService;
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
        public async Task<IActionResult> SendMessage(ChatRequest request)
        {
            try
            {
                var result = await _chatService.GetResponseAsync(
                    request.Message,
                    request.PreviousResponseId
                );

                var response = new ChatResponse
                {
                    Answer = result.Answer,
                    ResponseId = result.ResponseId
                };

                return Ok(response);
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