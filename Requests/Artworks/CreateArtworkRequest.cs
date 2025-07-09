namespace Requests.Artworks;

using System.ComponentModel.DataAnnotations;

public class CreateArtworkRequest
{
    [Required]
    public required string Title { get; set; }
    [Required]
    public required string Description { get; set; }
    [Required]
    public required decimal Price { get; set; }
    [Required]
    public List<SizeRequest> Sizes { get; set; } = new List<SizeRequest>();
}