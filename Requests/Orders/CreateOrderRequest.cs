namespace Requests.Orders;

using System.ComponentModel.DataAnnotations;

public class CreateOrderRequest
{
    [Required]
    public required string FirstName { get; set; }
    [Required]
    public required string LastName { get; set; }
    [Required]
    [EmailAddress]
    public required string Email { get; set; }
    [Required]
    public required string Tel { get; set; }
    [Required]
    public required string Address { get; set; }
    [Required]
    public required decimal DeliveryPrice { get; set; }
}