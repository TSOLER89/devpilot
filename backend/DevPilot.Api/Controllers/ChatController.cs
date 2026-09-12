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
    }
}