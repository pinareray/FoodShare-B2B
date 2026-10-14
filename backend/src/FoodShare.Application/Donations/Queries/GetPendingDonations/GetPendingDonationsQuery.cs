using FoodShare.Application.Donations.Dtos;
using MediatR;

namespace FoodShare.Application.Donations.Queries.GetPendingDonations;

public sealed record GetPendingDonationsQuery : IRequest<IReadOnlyList<DonationDto>>;
