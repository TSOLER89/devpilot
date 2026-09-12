using System.ComponentModel.DataAnnotations;

namespace DevPilot.Api.Models
{
    public class ChatRequest
    {
        [Required(ErrorMessage = "Message is required.")]
        [StringLength(1000, MinimumLength = 1, ErrorMessage = "Message must be between 1 and 1000 characters.")]
        public string Message { get; set; } = string.Empty;
    }
}