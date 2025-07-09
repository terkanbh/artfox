namespace Web.Controllers;

using Microsoft.AspNetCore.Mvc;
using Requests.Carts;
using Services;
using Web.Utilities;

[ApiController]
[Route("api/carts")]
[ServiceFilter(typeof(EnsureCartCookieFilter))]
public class CartsController(CartsService cartsService) : ControllerBase
{
    [HttpPut("addItem")]
    public async Task<IActionResult> AddItemAsync(AddItemRequest req)
    {
        var cartId = HttpContext.Items["CartId"] as string;

        if (cartId == null)
        {
            return BadRequest("No CartId cookie found.");
        }

        try
        {
            var cartDTO = await cartsService.AddItemAsync(cartId, req.ItemId, req.Quantity);
            return Ok(cartDTO);
        }
        catch
        {
            var errorMessage = "An error occured while adding item to cart.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpDelete("deleteItem/{itemId}")]
    public async Task<IActionResult> DeleteItemAsync(string itemId)
    {
        var cartId = HttpContext.Items["CartId"] as string;

        if (cartId == null)
        {
            return BadRequest("No CartId cookie found.");
        }

        try
        {
            var cartDTO = await cartsService.DeleteItemAsync(cartId, itemId);
            return Ok(cartDTO);
        }
        catch
        {
            var errorMessage = "An error occured while deleting the cart item.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAsync()
    {
        var cartId = HttpContext.Items["CartId"] as string;
        
        if (cartId == null)
        {
            return BadRequest("No CartId cookie found.");
        }

        try
        {
            var cartDTO = await cartsService.GetItemsAsync(cartId);
            return Ok(cartDTO);
        }
        catch
        {
            var errorMessage = "An error occured while fetching cart.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpPut("updateItem")]
    public async Task<IActionResult> UpdateItemAsync(UpdateItemRequest req)
    {
        var cartId = HttpContext.Items["CartId"] as string;

        if (cartId == null)
        {
            return BadRequest("No CartId cookie found.");
        }

        try
        {
            var cartDTO = await cartsService.UpdateItemAsync(cartId, req.ItemId, req.Quantity);
            return Ok(cartDTO);
        }
        catch
        {
            var errorMessage = "An error occured while updating the cart item.";
            return StatusCode(500, errorMessage);
        }
    }
}