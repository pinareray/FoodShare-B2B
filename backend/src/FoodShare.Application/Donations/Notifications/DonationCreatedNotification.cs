using FoodShare.Application.Donations.Dtos;
using MediatR;

namespace FoodShare.Application.Donations.Notifications;

public sealed record DonationCreatedNotification(DonationDto Donation) : INotification;
