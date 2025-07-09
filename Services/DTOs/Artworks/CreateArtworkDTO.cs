namespace Services.DTOs.Artworks;

public class CreateArtworkDTO
{
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required decimal Price { get; set; }
    public List<SizeDTO> Sizes { get; set; } = new List<SizeDTO>();
}