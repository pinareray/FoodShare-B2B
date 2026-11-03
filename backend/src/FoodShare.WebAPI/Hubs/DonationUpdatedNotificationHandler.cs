using FoodShare.Application.Donations.Notifications;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace FoodShare.WebAPI.Hubs;

public sealed class DonationUpdatedNotificationHandler(IHubContext<DonationHub, IDonationClient> hubContext)
    : INotificationHandler<DonationUpdatedNotification>
{
    public Task Handle(DonationUpdatedNotification notification, CancellationToken cancellationToken)
        => hubContext.Clients.All.ReceiveDonationUpdated(notification.Donation);
}
