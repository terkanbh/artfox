namespace Requests.Contacts;

using System.ComponentModel.DataAnnotations;

public class ContactsRequest
{
    [Required]
    public required string Name { get; set; }
    [Required]
    [EmailAddress]
    public required string Email { get; set; }
    [Required]
    public required string Content { get; set; }
}