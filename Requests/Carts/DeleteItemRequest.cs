namespace Requests.Carts;

using System.ComponentModel.DataAnnotations;

public class DeleteItemRequest
{
    [Required]
    public required string ItemId { get; set; }
}