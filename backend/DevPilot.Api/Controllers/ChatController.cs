using DevPilot.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace DevPilot.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
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

            return Ok(new
            {
                answer = $"DevPilot received: {request.Message}"
            });
        }
    }
}