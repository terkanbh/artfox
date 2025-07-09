namespace Services.DTOs.Orders;

public class CreateOrderDTO
{
    public required string CartId { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string Tel { get; set; }
    public required string Address { get; set; }
    public required decimal DeliveryPrice { get; set; }
}