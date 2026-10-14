using System.Text.Json.Serialization;
using FoodShare.Application;
using FoodShare.Infrastructure;
using FoodShare.Infrastructure.Persistence;
using FoodShare.WebAPI.Hubs;
using FoodShare.WebAPI.Infrastructure;
using Microsoft.EntityFrameworkCore;

const string FrontendCorsPolicy = "Frontend";

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddApplication(typeof(Program).Assembly)
    .AddInfrastructure(builder.Configuration);

builder.Services
    .AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services
    .AddSignalR()
    .AddJsonProtocol(o => o.PayloadSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? ["http://localhost:3000"];

builder.Services.AddCors(options =>
{
    options.AddPolicy(FrontendCorsPolicy, policy => policy
        .WithOrigins(allowedOrigins)
        .AllowAnyHeader()
        .AllowAnyMethod()
        // SignalR negotiation requires credentials, which in turn forbids AllowAnyOrigin().
        .AllowCredentials());
});

builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    try
    {
        await db.Database.MigrateAsync();
    }
    catch (Exception ex)
    {
        app.Logger.LogError(ex, "Database migration failed. Is PostgreSQL running? (see docker-compose.yml)");
    }
}
else
{
    app.UseHttpsRedirection();
}

app.UseExceptionHandler();
app.UseCors(FrontendCorsPolicy);
app.UseAuthorization();

app.MapControllers();
app.MapHub<DonationHub>(DonationHub.Route);

app.Run();
