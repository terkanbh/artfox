namespace Requests.Carts;

using System.ComponentModel.DataAnnotations;

public class UpdateItemRequest
{
    [Required]
    public required string ItemId { get; set; }
    [Required]
    public int Quantity { get; set; }
}