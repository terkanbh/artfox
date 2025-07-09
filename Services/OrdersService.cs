namespace Services;

using Database;
using Database.Enums;
using Database.Models;
using Microsoft.EntityFrameworkCore;
using Services.DTOs.Orders;

public class OrdersService
{
    private readonly Context _context;

    public OrdersService (Context context)
    {
        _context = context;
    }

    public async Task<OrderDTO> CreateAsync(CreateOrderDTO input)
    {
        var cart = await _context.Carts
        .Include(x => x.Items)
        .ThenInclude(x => x.Artwork)
        .FirstOrDefaultAsync(x => x.Id == input.CartId);

        if (cart == null)
            throw new Exception("Cart not found.");

        if (cart.Items.Count == 0)
            throw new Exception("No items in cart.");

        var order = new Order
        {
            Id = Guid.NewGuid().ToString(),
            FirstName = input.FirstName,
            LastName = input.LastName,
            Email = input.Email,
            Tel = input.Tel,
            Address = input.Address,
            DeliveryPrice = input.DeliveryPrice,
            ProductsPrice = 0,
            TotalPrice = 0,
            Status = OrderStatus.Pending,
            CreatedAt = DateTimeOffset.UtcNow
        };

        foreach(var item in cart.Items)
        {
            order.Items.Add(new OrderItem
            {
                Id = Guid.NewGuid().ToString(),
                OrderId = order.Id,
                ArtworkId = item.ArtworkId,
                Quantity = item.Quantity
            });
            order.ProductsPrice += item.Quantity * item.Artwork!.Price;
        }

        order.TotalPrice = order.DeliveryPrice + order.ProductsPrice;

        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();

        return MapToOrderDTO(order);
    }

    public async Task DeleteAsync(string id)
    {
        var order = await _context.Orders.FindAsync(id);

        if (order == null)
        {
            throw new Exception("Order not found.");
        }

        _context.Orders.Remove(order);

        await _context.SaveChangesAsync();
    }

    public async Task<OrderDTO[]> GetAllAsync()
    {
        return await _context.Orders
        .Select(order => MapToOrderDTO(order))
        .ToArrayAsync();
    }

    public async Task<OrderDetailsDTO> GetAsync(string orderId)
    {
        var order = await _context.Orders
        .Include(x => x.Items)
        .ThenInclude(x => x.Artwork)
        .FirstOrDefaultAsync(x => x.Id == orderId);

        if (order == null)
            throw new Exception("Order not found.");

        return MapToOrderDetailsDTO(order);
    }

    public async Task<OrderDTO> UpdateAsync(UpdateOrderDTO input)
    {
        var order = await _context.Orders.FindAsync(input.OrderId);

        if (order == null)
            throw new Exception("Order not found.");

        order.FirstName = input.FirstName;
        order.LastName = input.LastName;
        order.Email = input.Email;
        order.Tel = input.Tel;
        order.Address = input.Address;
        order.DeliveryPrice = input.DeliveryPrice;
        order.TotalPrice = order.DeliveryPrice + order.ProductsPrice;
        order.Status = MapOrderStatus(input.Status);
        order.ModifiedAt = DateTimeOffset.UtcNow;

        await _context.SaveChangesAsync();

        return MapToOrderDTO(order);
    }

    private static OrderStatus MapOrderStatus(string status)
    {
        switch (status)
        {
            case "Pending":
                return OrderStatus.Pending;
            case "Sent":
                return OrderStatus.Sent;
            case "Completed":
                return OrderStatus.Completed;
            case "Cancelled":
                return OrderStatus.Cancelled;
            default:
                throw new Exception("Invalid order status.");
        }
    }

    // Use static method to avoid potential memory leak warning.
    private static OrderDTO MapToOrderDTO(Order order)
    {
        return new OrderDTO
        {
            Id = order.Id,
            FirstName = order.FirstName,
            LastName = order.LastName,
            Email = order.Email,
            Tel = order.Tel,
            Address = order.Address,
            DeliveryPrice = order.DeliveryPrice,
            ProductsPrice = order.ProductsPrice,
            TotalPrice = order.TotalPrice,
            Status = order.Status.ToString(),
            CreatedAt = order.CreatedAt,
            ModifiedAt = order.ModifiedAt
        };
    }

        private static OrderDetailsDTO MapToOrderDetailsDTO(Order order)
        {
            var orderDTO = new OrderDetailsDTO
            {
                Id = order.Id,
                FirstName = order.FirstName,
                LastName = order.LastName,
                Email = order.Email,
                Tel = order.Tel,
                Address = order.Address,
                DeliveryPrice = order.DeliveryPrice,
                ProductsPrice = order.ProductsPrice,
                TotalPrice = order.TotalPrice,
                Status = order.Status.ToString(),
                CreatedAt = order.CreatedAt,
                ModifiedAt = order.ModifiedAt
            };

            foreach(var item in order.Items)
            {
                orderDTO.Items.Add(new OrderItemDTO
                {
                    Id = item.Artwork!.Id,
                    Title = item.Artwork!.Title,
                    Price = item.Artwork!.Price,
                    Quantity = item.Quantity
                });
            }

            return orderDTO;
        }
}