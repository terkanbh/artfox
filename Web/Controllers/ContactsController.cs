namespace Web.Controllers;

using Microsoft.AspNetCore.Mvc;
using Requests.Contacts;
using Services;

[ApiController]
[Route("api/contacts")]
public class ContactsController : ControllerBase
{
    private readonly EmailService _emailService;

    public ContactsController(EmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpPost]
    public async Task<IActionResult> SendAsync(ContactsRequest input)
    {
        try
        {
            if (_emailService.IsEmailConfigured())
            {
                await _emailService.ReceiveAsync(
                subject: $"{input.Name} contacted you",
                body: input.Content + $"\n{input.Email}");
            }

            return Ok(new { Success = true });
        }
        catch
        {
            var errorMessage = "There was an error while receiving contact form.";
            return StatusCode(500, errorMessage);
        }
    }
}