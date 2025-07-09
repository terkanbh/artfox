namespace Requests.Artworks;

using System.ComponentModel.DataAnnotations;

public class SizeRequest
{
    [Required]
    public required double Width { get; set; }
    [Required]
    public required double Height { get; set; }
}