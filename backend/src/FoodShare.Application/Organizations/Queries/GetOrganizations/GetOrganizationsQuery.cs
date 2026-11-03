using FoodShare.Application.Organizations.Dtos;
using MediatR;

namespace FoodShare.Application.Organizations.Queries.GetOrganizations;

public sealed record GetOrganizationsQuery : IRequest<IReadOnlyList<OrganizationDto>>;
