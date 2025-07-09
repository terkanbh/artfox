namespace Requests.Orders;

using System.ComponentModel.DataAnnotations;

public class UpdateOrderRequest
{
    [Required]
    public required string OrderId { get; set; }
    [Required]
    public required string FirstName { get; set; }
    [Required]
    public required string LastName { get; set; }
    [Required]
    public required string Email { get; set; }
    [Required]
    public required string Tel { get; set; }
    [Required]
    public required string Address { get; set; }
    [Required]
    public required decimal DeliveryPrice { get; set; }
    [Required]
    public required string Status { get; set; }
}