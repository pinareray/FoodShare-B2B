using FoodShare.Domain.Enums;

namespace FoodShare.Application.Donations.Dtos;

public sealed record DonationDto(
    Guid Id,
    string Title,
    FoodCategory Category,
    int Quantity,
    DonationStatus Status,
    Guid OrganizationId,
    string OrganizationName,
    DateTime CreatedAt);
