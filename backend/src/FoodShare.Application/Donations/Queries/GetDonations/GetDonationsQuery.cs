using FoodShare.Application.Donations.Dtos;
using FoodShare.Domain.Enums;
using MediatR;

namespace FoodShare.Application.Donations.Queries.GetDonations;

/// <param name="Status">Optional status filter; all donations are returned when null.</param>
public sealed record GetDonationsQuery(DonationStatus? Status = null) : IRequest<IReadOnlyList<DonationDto>>;
