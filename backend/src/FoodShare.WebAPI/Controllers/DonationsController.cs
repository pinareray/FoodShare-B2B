using FoodShare.Application.Donations.Commands.CreateDonation;
using FoodShare.Application.Donations.Dtos;
using FoodShare.Application.Donations.Queries.GetPendingDonations;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FoodShare.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class DonationsController(ISender sender) : ControllerBase
{
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
}
