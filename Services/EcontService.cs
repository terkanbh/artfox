namespace Services;

using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;

public class EcontService
{
    private readonly HttpClient _httpClient;
    private readonly string _baseUrl;
    private readonly string _username;
    private readonly string _password;

    public EcontService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _baseUrl = configuration["Econt:ApiUrl"]!;
        _username = configuration["Econt:Username"]!;
        _password = configuration["Econt:Password"]!;
    }

    public async Task<string[]> GetOfficesAsync()
    {
        var url = _baseUrl + "/Nomenclatures/NomenclaturesService.getOffices.json";

        var request = new HttpRequestMessage(HttpMethod.Post, url);
        
        request.Headers.Authorization = new AuthenticationHeaderValue("Basic", $"{_username}:{_password}");

        var body = JsonSerializer.Serialize(new { countryCode = "BGR" });

        request.Content = new StringContent(body, Encoding.UTF8, "application/json");

        var response = await _httpClient.SendAsync(request);

        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();

            using (var doc = JsonDocument.Parse(content))
            {
                var root = doc.RootElement;
                var offices = root.GetProperty("offices");
                var addresses = new List<string>();

                foreach (var office in offices.EnumerateArray())
                {
                    var address = office.GetProperty("address");
                    var fullAddress = address.GetProperty("fullAddress").GetString();
                    if (fullAddress != null)
                    {
                        addresses.Add(fullAddress);
                    }
                    
                }

                return addresses.ToArray();
            }
        }

        throw new Exception("Failed to retrieve Econt offices.");
    }
}
