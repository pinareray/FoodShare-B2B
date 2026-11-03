using FoodShare.Application.Common.Exceptions;
using FoodShare.Application.Common.Interfaces;
using FoodShare.Application.Donations.Dtos;
using FoodShare.Application.Donations.Notifications;
using FoodShare.Domain.Entities;
using FoodShare.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodShare.Application.Donations.Commands.CreateDonation;

public sealed class CreateDonationCommandHandler(IApplicationDbContext context, IPublisher publisher)
    : IRequestHandler<CreateDonationCommand, DonationDto>
{
    public async Task<DonationDto> Handle(CreateDonationCommand request, CancellationToken cancellationToken)
    {
        var organization = await context.Organizations
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == request.OrganizationId, cancellationToken)
            ?? throw new NotFoundException(nameof(Organization), request.OrganizationId);

        if (organization.Type != OrganizationType.Donor)
            throw new ArgumentException("Only donor organizations can create donations.");

        var expiresAt = request.ExpiresAt?.ToUniversalTime();
        var donation = new Donation(request.Title, request.Category, request.Quantity, organization.Id, expiresAt);

        context.Donations.Add(donation);
        await context.SaveChangesAsync(cancellationToken);

        var dto = new DonationDto(
            donation.Id,
            donation.Title,
            donation.Category,
            donation.Quantity,
            donation.Status,
            organization.Id,
            organization.Name,
            donation.CreatedAt,
            donation.ExpiresAt,
            RecipientOrganizationId: null,
            RecipientOrganizationName: null,
            ReservedAt: null,
            CollectedAt: null);

        await publisher.Publish(new DonationCreatedNotification(dto), cancellationToken);

        return dto;
    }
}
