using System.Linq.Expressions;
using FoodShare.Domain.Entities;
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
    DateTime CreatedAt,
    DateTime? ExpiresAt,
    Guid? RecipientOrganizationId,
    string? RecipientOrganizationName,
    DateTime? ReservedAt,
    DateTime? CollectedAt)
{
    /// <summary>EF Core-translatable projection; requires no explicit Include.</summary>
    public static readonly Expression<Func<Donation, DonationDto>> Projection = d => new DonationDto(
        d.Id,
        d.Title,
        d.Category,
        d.Quantity,
        d.Status,
        d.OrganizationId,
        d.Organization!.Name,
        d.CreatedAt,
        d.ExpiresAt,
        d.RecipientOrganizationId,
        d.RecipientOrganization != null ? d.RecipientOrganization.Name : null,
        d.ReservedAt,
        d.CollectedAt);
}
