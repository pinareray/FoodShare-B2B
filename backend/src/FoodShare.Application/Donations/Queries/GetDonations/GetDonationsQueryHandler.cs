using FoodShare.Application.Common.Interfaces;
using FoodShare.Application.Donations.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodShare.Application.Donations.Queries.GetDonations;

public sealed class GetDonationsQueryHandler(IApplicationDbContext context)
    : IRequestHandler<GetDonationsQuery, IReadOnlyList<DonationDto>>
{
    public async Task<IReadOnlyList<DonationDto>> Handle(GetDonationsQuery request, CancellationToken cancellationToken)
    {
        var query = context.Donations.AsNoTracking();

        if (request.Status is { } status)
            query = query.Where(d => d.Status == status);

        return await query
            .OrderByDescending(d => d.CreatedAt)
            .Select(DonationDto.Projection)
            .ToListAsync(cancellationToken);
    }
}
