namespace Services.DTOs.Artworks;

using Services.DTOs.Images;

public class ArtworkDTO
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required decimal Price { get; set; }
    public List<SizeDTO> Sizes { get; set; } = new List<SizeDTO>();
    public List<ImageDTO> Images { get; set; } = new List<ImageDTO>();
}