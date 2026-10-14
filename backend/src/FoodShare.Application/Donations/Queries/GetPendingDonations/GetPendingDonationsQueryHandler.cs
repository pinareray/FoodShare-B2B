using FoodShare.Application.Common.Interfaces;
using FoodShare.Application.Donations.Dtos;
using FoodShare.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodShare.Application.Donations.Queries.GetPendingDonations;

public sealed class GetPendingDonationsQueryHandler(IApplicationDbContext context)
    : IRequestHandler<GetPendingDonationsQuery, IReadOnlyList<DonationDto>>
{
    public async Task<IReadOnlyList<DonationDto>> Handle(GetPendingDonationsQuery request, CancellationToken cancellationToken)
    {
        return await context.Donations
            .AsNoTracking()
            .Where(d => d.Status == DonationStatus.Pending)
            .OrderByDescending(d => d.CreatedAt)
            .Select(d => new DonationDto(
                d.Id,
                d.Title,
                d.Category,
                d.Quantity,
                d.Status,
                d.OrganizationId,
                d.Organization!.Name,
                d.CreatedAt))
            .ToListAsync(cancellationToken);
    }
}
