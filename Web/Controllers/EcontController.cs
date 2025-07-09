namespace Web.Controllers;

using Microsoft.AspNetCore.Mvc;
using Services;

[ApiController]
[Route("api/econt")]
public class EcontController : ControllerBase
{
    private readonly EcontService _econtService;

    public EcontController(EcontService econtService)
    {
        _econtService = econtService;
    }

    [HttpGet("offices")]
    public async Task<IActionResult> GetAsync()
    {
        try
        {
            var offices =  await _econtService.GetOfficesAsync();

            return Ok(offices);
        }
        catch
        {
            var errorMessage = "An error occured while fetching offices.";
            return StatusCode(500, errorMessage);
        }
    }
}