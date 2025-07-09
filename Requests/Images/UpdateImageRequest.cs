namespace Requests.Images;

using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

public class UpdateImageRequest
{
    public string? Id { get; set; }
    public IFormFile? ImageFile { get; set; }
    [Required] public required int DisplayOrder { get; set; }
}