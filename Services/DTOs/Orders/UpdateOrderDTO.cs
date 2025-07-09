namespace Services.DTOs.Orders;

public class UpdateOrderDTO
{
    public required string OrderId { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string Tel { get; set; }
    public required string Address { get; set; }
    public required decimal DeliveryPrice { get; set; }
    public required string Status { get; set; }
}