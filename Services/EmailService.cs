namespace Services;
using MimeKit;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;

public class EmailService
{
    private readonly string _name;
    private readonly string _address;
    private readonly string _password;
    private readonly string _host;
    private readonly int _port;

    public EmailService(IConfiguration configuration)
    {
        _name = configuration["Email:Name"]!;
        _address = configuration["Email:Address"]!;
        _password = configuration["Email:Password"]!;
        _host = configuration["Email:Host"]!;
        _port = int.Parse(configuration["Email:Port"]!);
    }

    public bool IsEmailConfigured()
    {
        return !string.IsNullOrEmpty(_address);
    }

    public async Task SendAsync(string receiverName, string receiverAddress, string subject, string body)
    {
        var message = new MimeMessage();

        message.To.Add(new MailboxAddress(receiverName, receiverAddress));
        message.Subject = subject;
        message.Body = new TextPart("html") { Text = body };

        await SendMailAsync(message);
    }

    public async Task ReceiveAsync(string subject, string body)
    {
        var message = new MimeMessage();
        message.To.Add(new MailboxAddress(_name, _address));
        message.Subject = subject;
        message.Body = new TextPart("plain") { Text = body };

        await SendMailAsync(message);
    }

    private async Task SendMailAsync(MimeMessage message)
    {
        message.From.Add(new MailboxAddress(_name, _address));

        using(var client = new SmtpClient())
        {
            await client.ConnectAsync(_host, _port, false);
            await client.AuthenticateAsync(_address, _password);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
}