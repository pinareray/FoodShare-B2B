using FoodShare.Application.Common.Interfaces;
using FoodShare.Application.Organizations.Dtos;
using FoodShare.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodShare.Application.Organizations.Queries.GetOrganizations;

public sealed class GetOrganizationsQueryHandler(IApplicationDbContext context)
    : IRequestHandler<GetOrganizationsQuery, IReadOnlyList<OrganizationDto>>
{
    public async Task<IReadOnlyList<OrganizationDto>> Handle(GetOrganizationsQuery request, CancellationToken cancellationToken)
    {
        var donations = context.Donations.Where(d => d.Status != DonationStatus.Cancelled);

        return await context.Organizations
            .AsNoTracking()
            .OrderBy(o => o.Type)
            .ThenBy(o => o.Name)
            .Select(o => new OrganizationDto(
                o.Id,
                o.Name,
                o.Type,
                o.Email,
                o.City,
                donations.Count(d => o.Type == OrganizationType.Donor
                    ? d.OrganizationId == o.Id
                    : d.RecipientOrganizationId == o.Id),
                donations
                    .Where(d => o.Type == OrganizationType.Donor
                        ? d.OrganizationId == o.Id
                        : d.RecipientOrganizationId == o.Id)
                    .Sum(d => (int?)d.Quantity) ?? 0))
            .ToListAsync(cancellationToken);
    }
}
