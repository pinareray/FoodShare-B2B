using FoodShare.Application.Donations.Notifications;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace FoodShare.WebAPI.Hubs;

public sealed class DonationCreatedNotificationHandler(IHubContext<DonationHub, IDonationClient> hubContext)
    : INotificationHandler<DonationCreatedNotification>
{
    public Task Handle(DonationCreatedNotification notification, CancellationToken cancellationToken)
        => hubContext.Clients.All.ReceiveNewDonation(notification.Donation);
}
