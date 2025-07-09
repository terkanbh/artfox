namespace Web.Extensions;

public static class CorsSetup
{
    public static IServiceCollection AddCors(this IServiceCollection services, IConfiguration configuration)
    {
        var allowedOrigins = configuration.GetSection("AllowedOrigins").Get<string[]>()!;
        
        services.AddCors(options => {
            options.AddDefaultPolicy(
                builder => builder.WithOrigins(allowedOrigins)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
            );
        });

        return services;
    }
}