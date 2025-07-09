namespace Services.DTOs.Orders;

public class OrderItemDTO
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public required decimal Price { get; set; }
    public required int Quantity { get; set; }
}