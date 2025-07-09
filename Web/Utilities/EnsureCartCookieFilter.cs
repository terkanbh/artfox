namespace Web.Utilities;

using Microsoft.AspNetCore.Mvc.Filters;
using Services;

public class EnsureCartCookieFilter : IAsyncActionFilter
{
    private readonly IServiceScopeFactory _serviceScopeFactory;

    public EnsureCartCookieFilter(IServiceScopeFactory serviceScopeFactory)
    {
        _serviceScopeFactory = serviceScopeFactory;
    }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var httpContext = context.HttpContext;
        var cartId = httpContext.Request.Cookies["CartId"];
        
        using var scope = _serviceScopeFactory.CreateScope();
        var cartsService = scope.ServiceProvider.GetRequiredService<CartsService>();
        if (!cartsService.Exists(cartId))
        {
            cartId = await cartsService.CreateAsync();
            var options = new CookieOptions
            {
                Expires = DateTime.UtcNow.AddDays(7),
                Secure = false,
                SameSite = SameSiteMode.Lax
            };
            httpContext.Response.Cookies.Append("CartId", cartId, options);
            httpContext.Items["CartId"] = cartId;
        }

        httpContext.Items["CartId"] = cartId;

        await next();
    }
}
