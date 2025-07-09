namespace Services.DTOs.Images;

public class ImageDTO
{
    public required string ImageId { get; set; }
    public required string ArtworkId { get; set; }
    public required byte[] ImageData { get; set; }
    public required int DisplayOrder { get; set; }
}