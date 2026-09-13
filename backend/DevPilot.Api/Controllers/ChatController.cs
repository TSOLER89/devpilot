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
        [HttpPost]
        public async Task<IActionResult> SendMessage(ChatRequest request)
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
    }
}