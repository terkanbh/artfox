using Microsoft.AspNetCore.Http;

namespace Services.DTOs.Images;

public class UpdateImageDTO
{
    public required byte[] ImageData { get; set; }
    public required int DisplayOrder { get; set; }
}