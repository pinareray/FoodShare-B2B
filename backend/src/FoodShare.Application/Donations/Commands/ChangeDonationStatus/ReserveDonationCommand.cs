using FoodShare.Application.Donations.Dtos;
using MediatR;

namespace FoodShare.Application.Donations.Commands.ChangeDonationStatus;

public sealed record ReserveDonationCommand(Guid DonationId, Guid RecipientOrganizationId) : IRequest<DonationDto>;

public sealed record CollectDonationCommand(Guid DonationId) : IRequest<DonationDto>;

public sealed record CancelDonationCommand(Guid DonationId) : IRequest<DonationDto>;
