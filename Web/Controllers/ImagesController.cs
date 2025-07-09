namespace Web.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Requests.Images;
using Services;

[ApiController]
[Route("api/images")]
public class ImagesController(ImagesService imagesService) : ControllerBase
{
    [HttpGet("{artworkId}")]
    public async Task<IActionResult> GetAsync(string artworkId)
    {
        try
        {
            var imagesDTO = await imagesService.GetAsync(artworkId);
            return Ok(imagesDTO);
        }
        catch
        {
            var errorMessage = "An error occured while fetching images.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpGet("main/{artworkId}")]
    public async Task<IActionResult> GetMainAsync(string artworkId)
    {
        try
        {
            var mainImageDTO = await imagesService.GetMainAsync(artworkId);
            return Ok(mainImageDTO);
        }
        catch
        {
            var errorMessage = "An error occured while fetching main image.";
            return StatusCode(500, errorMessage);
        }
    }

    [Authorize]
    [HttpPost("{artworkId}")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UpdateListAsync(string artworkId, [FromForm] List<UpdateImageRequest> images)
    {
        try
        {
            var updatedImages = await imagesService.UpdateAsync(artworkId, images);

            return Ok(updatedImages);
        }
        catch (ArgumentNullException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500);
        }

    }
}