namespace Services.DTOs.Orders;

public class OrderDetailsDTO : OrderDTO
{
    public List<OrderItemDTO> Items { get; set; } = new List<OrderItemDTO>();
}