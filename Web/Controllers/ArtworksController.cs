namespace Web.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Requests.Artworks;
using Services;
using Services.DTOs.Artworks;

[ApiController]
[Route("api/artworks")]
public class ArtworksController : ControllerBase
{
    protected readonly ArtworksService _artworkService;

    public ArtworksController(ArtworksService artworkService)
    {
        _artworkService = artworkService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAsync(string id)
    {
        try
        {
            var artwork =  await _artworkService.GetAsync(id);

            if (artwork == null)
            {
                return NotFound();
            }

            return Ok(artwork);
        }
        catch
        {
            var errorMessage = "An error occured while fetching artwork.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        try
        {
            var artworks = await _artworkService.GetAllAsync();
            return Ok(artworks);
        }
        catch
        {
            var errorMessage = "An error occured while fetching artworks.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpGet("random/{count}")]
    public async Task<IActionResult> GetRandomAsync(int count)
    {
        try
        {
            if (count < 1)
            {
                return BadRequest();
            }

            var artworks = await _artworkService.GetRandomAsync(count);
            return Ok(artworks);
        }
        catch
        {
            var errorMessage = "An error occured while fetching artworks.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateAsync(CreateArtworkRequest input)
    {
        try
        {
            var dto = MapToCreateArtworkDTO(input);
            var artwork = await _artworkService.CreateAsync(dto);
            return Created($"http://localhost:5000/api/artworks", artwork);
        }
        catch
        {
            var errorMessage = "An error occured while saving the artwork.";
            return StatusCode(500, errorMessage);
        }
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(string id)
    {
        try
        {
            await _artworkService.DeleteAsync(id);
            return Ok(new { Success = true });
        }
        catch
        {
            var errorMessage = "An error occured while deleting the artwork.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpPut]
    [Authorize]
    public async Task<IActionResult> UpdateAsync(UpdateArtworkRequest input)
    {
        try
        {
            if (!await _artworkService.ExistsAsync(input.Id))
            {
                return NotFound();
            }

            var dto = MapToUpdateArtworkDTO(input);
            var artwork = await _artworkService.UpdateAsync(dto);
            return Ok(artwork);
        }
        catch
        {
            var errorMessage = "An error occured while adding sizes to artwork.";
            return StatusCode(500, errorMessage);
        }
    }

    private static CreateArtworkDTO MapToCreateArtworkDTO(CreateArtworkRequest request)
    {
        return new CreateArtworkDTO
        {
            Title = request.Title,
            Description = request.Description,
            Price = request.Price,
            Sizes = request.Sizes
                .Select(x => new SizeDTO
                {
                    Width = x.Width,
                    Height = x.Height
                })
                .ToList()
        };
    }

    private static UpdateArtworkDTO MapToUpdateArtworkDTO(UpdateArtworkRequest request)
    {
        return new UpdateArtworkDTO
        {
            Id = request.Id,
            Title = request.Title,
            Description = request.Description,
            Price = request.Price,
            Sizes = request.Sizes
                .Select(x => new SizeDTO
                {
                    Width = x.Width,
                    Height = x.Height
                })
                .ToList()
        };
    }
}