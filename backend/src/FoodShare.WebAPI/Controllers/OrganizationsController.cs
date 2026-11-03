using FoodShare.Application.Organizations.Dtos;
using FoodShare.Application.Organizations.Queries.GetOrganizations;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FoodShare.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class OrganizationsController(ISender sender) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType<IReadOnlyList<OrganizationDto>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        => Ok(await sender.Send(new GetOrganizationsQuery(), cancellationToken));
}
