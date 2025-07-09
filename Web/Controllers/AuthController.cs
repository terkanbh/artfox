namespace Web.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Requests.Auth;
using Services;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly JWTService _jwtService;
    private readonly IConfiguration _configuration;


    public AuthController(JWTService jwtService, IConfiguration configuration)
    {
        _jwtService = jwtService;
        _configuration = configuration;
    }

    [HttpPost("login")]
    public IActionResult Login(LoginRequest loginRequest)
    {
        string adminUsername = _configuration["Admin:Username"] ?? throw new Exception("Admin username is not configured.");
        string adminPassword = _configuration["Admin:Password"] ?? throw new Exception("Admin password is not configured.");

        if (loginRequest.Username == adminUsername && loginRequest.Password == adminPassword)
        {
            var token = _jwtService.GenerateToken();
            return Ok(new { token });
        }

        return Unauthorized("Invalid credentials");
    }

    [HttpGet]
    [Authorize]
    public IActionResult ValidateToken()
    {
        return Ok();
    }
}