using FoodShare.Application.Donations.Dtos;
using Microsoft.AspNetCore.SignalR;

namespace FoodShare.WebAPI.Hubs;

public interface IDonationClient
{
    Task ReceiveNewDonation(DonationDto donation);
}

public sealed class DonationHub(ILogger<DonationHub> logger) : Hub<IDonationClient>
{
    public const string Route = "/hubs/donations";

    public override Task OnConnectedAsync()
    {
        logger.LogInformation("Client connected to DonationHub: {ConnectionId}", Context.ConnectionId);
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        logger.LogInformation("Client disconnected from DonationHub: {ConnectionId}", Context.ConnectionId);
        return base.OnDisconnectedAsync(exception);
    }
}
