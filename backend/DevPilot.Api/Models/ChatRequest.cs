using System.ComponentModel.DataAnnotations;

namespace DevPilot.Api.Models
{
    public class ChatRequest
    {
        [Required(ErrorMessage = "Message is required.")]
        [StringLength(1000, MinimumLength = 1)]
        public string Message { get; set; } = string.Empty;

        public string? PreviousResponseId { get; set; }
    }
}