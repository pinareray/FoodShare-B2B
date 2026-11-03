using FoodShare.Application.Donations.Dtos;
using FoodShare.Domain.Enums;
using MediatR;

namespace FoodShare.Application.Donations.Commands.CreateDonation;

public sealed record CreateDonationCommand(
    string Title,
    FoodCategory Category,
    int Quantity,
    Guid OrganizationId,
    DateTime? ExpiresAt = null) : IRequest<DonationDto>;
