using Database;
using Microsoft.EntityFrameworkCore;
using Services;
using Web.Extensions;
using Web.Utilities;

var builder = WebApplication.CreateBuilder(args);

var settings = builder.Configuration;

builder.Services.AddControllers();
builder.Services.AddCors(settings);
builder.Services.AddJwt(settings);
builder.Services.AddDbContext<Context>(opt => opt.UseInMemoryDatabase("ArtFox"));
builder.Services.AddHttpClient<EcontService>();
builder.Services.AddScoped<ArtworksService>();
builder.Services.AddScoped<CartsService>();
builder.Services.AddScoped<EcontService>();
builder.Services.AddScoped<EnsureCartCookieFilter>();
builder.Services.AddScoped<ImagesService>(); 
builder.Services.AddScoped<OrdersService>();
builder.Services.AddSingleton<JWTService>();
builder.Services.AddTransient<EmailService>();

var app = builder.Build();

if (builder.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<Context>();
    var seeder = new DataSeeder(context);
    seeder.Seed();
}

app.UseCors();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
