namespace Services.DTOs.Images;

public class UpdateImagesDTO
{
    public required string ArtworkId { get; set; }
    public List<UpdateImageDTO> Images { get; set; } = new List<UpdateImageDTO>();
}