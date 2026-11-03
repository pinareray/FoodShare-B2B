using FoodShare.Domain.Enums;

namespace FoodShare.Application.Organizations.Dtos;

/// <param name="DonationCount">Donations offered (donors) or reserved (recipients).</param>
/// <param name="TotalQuantity">Food units offered (donors) or received (recipients), excluding cancelled donations.</param>
public sealed record OrganizationDto(
    Guid Id,
    string Name,
    OrganizationType Type,
    string Email,
    string City,
    int DonationCount,
    int TotalQuantity);
