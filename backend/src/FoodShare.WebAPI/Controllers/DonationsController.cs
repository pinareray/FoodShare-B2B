using FoodShare.Application.Donations.Commands.ChangeDonationStatus;
using FoodShare.Application.Donations.Commands.CreateDonation;
using FoodShare.Application.Donations.Dtos;
using FoodShare.Application.Donations.Queries.GetDonations;
using FoodShare.Application.Donations.Queries.GetPendingDonations;
using FoodShare.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FoodShare.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class DonationsController(ISender sender) : ControllerBase
{
    public sealed record ReserveDonationRequest(Guid RecipientOrganizationId);

    [HttpGet]
    [ProducesResponseType<IReadOnlyList<DonationDto>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll([FromQuery] DonationStatus? status, CancellationToken cancellationToken)
        => Ok(await sender.Send(new GetDonationsQuery(status), cancellationToken));

    [HttpGet("pending")]
    [ProducesResponseType<IReadOnlyList<DonationDto>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetPending(CancellationToken cancellationToken)
        => Ok(await sender.Send(new GetPendingDonationsQuery(), cancellationToken));

    [HttpPost]
    [ProducesResponseType<DonationDto>(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Create(CreateDonationCommand command, CancellationToken cancellationToken)
    {
        var donation = await sender.Send(command, cancellationToken);
        return Created($"/api/donations/{donation.Id}", donation);
    }

    [HttpPost("{id:guid}/reserve")]
    [ProducesResponseType<DonationDto>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Reserve(Guid id, ReserveDonationRequest request, CancellationToken cancellationToken)
        => Ok(await sender.Send(new ReserveDonationCommand(id, request.RecipientOrganizationId), cancellationToken));

    [HttpPost("{id:guid}/collect")]
    [ProducesResponseType<DonationDto>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Collect(Guid id, CancellationToken cancellationToken)
        => Ok(await sender.Send(new CollectDonationCommand(id), cancellationToken));

    [HttpPost("{id:guid}/cancel")]
    [ProducesResponseType<DonationDto>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Cancel(Guid id, CancellationToken cancellationToken)
        => Ok(await sender.Send(new CancelDonationCommand(id), cancellationToken));
}
