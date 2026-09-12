using DevPilot.Api.Models;
using DevPilot.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace DevPilot.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly ChatService _chatService;

        public ChatController(ChatService chatService)
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
        public IActionResult SendMessage(ChatRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest(new
                {
                    message = "Message cannot be empty"
                });
            }
            var answer = _chatService.GetResponse(request.Message);

            var response = new ChatResponse
            {
                Answer = answer
            };

            return Ok(response);
        }
    }
}