namespace Requests.Carts;

using System.ComponentModel.DataAnnotations;

public class AddItemRequest
{
    [Required]
    public required string ItemId { get; set; }
    [Required]
    public int Quantity { get; set; }
}