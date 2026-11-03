using FoodShare.Application.Common.Exceptions;
using FoodShare.Application.Common.Interfaces;
using FoodShare.Application.Donations.Dtos;
using FoodShare.Application.Donations.Notifications;
using FoodShare.Domain.Entities;
using FoodShare.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodShare.Application.Donations.Commands.ChangeDonationStatus;

/// <summary>Handles the donation lifecycle transitions: Pending → Reserved → Collected, or Cancelled.</summary>
public sealed class ChangeDonationStatusCommandHandler(IApplicationDbContext context, IPublisher publisher)
    : IRequestHandler<ReserveDonationCommand, DonationDto>,
      IRequestHandler<CollectDonationCommand, DonationDto>,
      IRequestHandler<CancelDonationCommand, DonationDto>
{
    public async Task<DonationDto> Handle(ReserveDonationCommand request, CancellationToken cancellationToken)
    {
        var recipient = await context.Organizations
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == request.RecipientOrganizationId, cancellationToken)
            ?? throw new NotFoundException(nameof(Organization), request.RecipientOrganizationId);

        if (recipient.Type != OrganizationType.Recipient)
            throw new ArgumentException("Only recipient organizations can reserve donations.");

        return await UpdateAsync(request.DonationId, d => d.Reserve(recipient.Id), cancellationToken);
    }

    public Task<DonationDto> Handle(CollectDonationCommand request, CancellationToken cancellationToken)
        => UpdateAsync(request.DonationId, d => d.MarkCollected(), cancellationToken);

    public Task<DonationDto> Handle(CancelDonationCommand request, CancellationToken cancellationToken)
        => UpdateAsync(request.DonationId, d => d.Cancel(), cancellationToken);

    private async Task<DonationDto> UpdateAsync(Guid donationId, Action<Donation> transition, CancellationToken cancellationToken)
    {
        var donation = await context.Donations.FirstOrDefaultAsync(d => d.Id == donationId, cancellationToken)
            ?? throw new NotFoundException(nameof(Donation), donationId);

        transition(donation);
        await context.SaveChangesAsync(cancellationToken);

        var dto = await context.Donations
            .AsNoTracking()
            .Where(d => d.Id == donationId)
            .Select(DonationDto.Projection)
            .SingleAsync(cancellationToken);

        await publisher.Publish(new DonationUpdatedNotification(dto), cancellationToken);

        return dto;
    }
}
