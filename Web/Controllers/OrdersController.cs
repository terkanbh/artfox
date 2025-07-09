namespace Web.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RazorLight;
using Requests.Orders;
using Services;
using Services.DTOs.Orders;

[ApiController]
[Route("api/orders")]
public class OrdersController : ControllerBase
{
    protected readonly OrdersService _ordersService;
    private readonly CartsService _cartsService;
    private readonly EmailService _emailService;

    public OrdersController(
        OrdersService ordersService,
        CartsService cartsService,
        EmailService emailService)
    {
        _ordersService = ordersService;
        _cartsService = cartsService;
        _emailService = emailService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateAsync(CreateOrderRequest input)
    {
        var cartId = Request.Cookies["CartId"];

        if (cartId == null)
        {
            return BadRequest("No CartId cookie found.");
        }

        try
        {
            var createOrderDTO = MapToCreateOrderDTO(cartId, input);

            var orderDTO = await _ordersService.CreateAsync(createOrderDTO);

            await _cartsService.ClearAsync(cartId);

            var orderDetailsDTO = await _ordersService.GetAsync(orderDTO.Id);

            if (_emailService.IsEmailConfigured())
            {
                await SendOrderConfirmationEmail(orderDetailsDTO);
            }

            return Ok(orderDTO);
        }
        catch
        {
            var errorMessage = "An error occurred while creating order.";
            return StatusCode(500, errorMessage);
        }
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(string id)
    {
        try
        {
            await _ordersService.DeleteAsync(id);
            return Ok(new { Success = true });
        }
        catch
        {
            var errorMessage = "An error occured while deleting the order.";
            return StatusCode(500, errorMessage);
        }
    }

    [Authorize]
    [HttpGet("{orderId}")]
    public async Task<IActionResult> GetAsync(string orderId)
    {
        try
        {
            var orderDTO = await _ordersService.GetAsync(orderId);
            return Ok(orderDTO);
        }
        catch
        {
            var errorMessage = "An error occured while fetching order details.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAsync()
    {
        try
        {
            var ordersDTO = await _ordersService.GetAllAsync();
            return Ok(ordersDTO);
        }
        catch
        {
            var errorMessage = "An error occured while fetching orders.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpPut]
    [Authorize]
    public async Task<IActionResult> UpdateAsync(UpdateOrderRequest input)
    {
        try
        {
            var updateOrderDTO = MapToUpdateOrderDTO(input);
            var orderDTO = await _ordersService.UpdateAsync(updateOrderDTO);
            return Ok(orderDTO);
        }
        catch
        {
            var errorMessage = "An error occured while updating order.";
            return StatusCode(500, errorMessage);
        }
    }

    private static UpdateOrderDTO MapToUpdateOrderDTO(UpdateOrderRequest request)
    {
        return new UpdateOrderDTO
        {
            OrderId = request.OrderId,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Tel = request.Tel,
            Address = request.Address,
            DeliveryPrice = request.DeliveryPrice,
            Status = request.Status
        };
    }

    private static CreateOrderDTO MapToCreateOrderDTO(string cartId, CreateOrderRequest request)
    {
        return new CreateOrderDTO
        {
            CartId = cartId,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Tel = request.Tel,
            Address = request.Address,
            DeliveryPrice = request.DeliveryPrice
        };
    }

    private async Task SendOrderConfirmationEmail(OrderDetailsDTO orderDetails)
    {
        var razorLight = new RazorLightEngineBuilder()
            .UseEmbeddedResourcesProject(typeof(Program).Assembly, "Web.Utilities")
            .UseMemoryCachingProvider()
            .EnableDebugMode(true)
            .Build();

        string renderedTemplate = await razorLight.CompileRenderAsync("OrderConfirmationEmail", orderDetails);

        await _emailService.SendAsync(
        $"{orderDetails.FirstName} ${orderDetails.LastName}",
        orderDetails.Email,
        "Поръчката е приета",
        renderedTemplate);
    }
}