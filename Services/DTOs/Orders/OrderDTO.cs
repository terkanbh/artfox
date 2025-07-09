namespace Services.DTOs.Orders;

public class OrderDTO
{
    public required string Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string Tel { get; set; }
    public required string Address { get; set; }
    public required decimal DeliveryPrice { get; set; }
    public required decimal ProductsPrice { get; set; }
    public required decimal TotalPrice { get; set; }
    public required string Status { get; set; }
    public required DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset ModifiedAt { get; set; }
}