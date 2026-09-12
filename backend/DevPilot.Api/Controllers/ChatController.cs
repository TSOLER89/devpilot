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
            var answer = await _chatService.GetResponseAsync(request.Message);

            var response = new ChatResponse
            {
                Answer = answer
            };

            return Ok(response);
        }
    }
}