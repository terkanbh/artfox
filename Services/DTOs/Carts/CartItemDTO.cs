namespace Services.DTOs.Carts;

public class CartItemDTO
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public required decimal Price { get; set; }
    public required byte[] ImageData { get; set; }
    public required int Quantity { get; set; }
}