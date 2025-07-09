namespace Requests.Images;

using System.ComponentModel.DataAnnotations;

public class UpdateImagesRequest
{
    [Required]
    public required string ArtworkId { get; set; }
    [Required]
    public required UpdateImageRequest[] Images { get; set; }
}