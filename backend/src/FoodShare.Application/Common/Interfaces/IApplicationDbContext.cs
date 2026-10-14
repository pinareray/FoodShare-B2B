using FoodShare.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FoodShare.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Donation> Donations { get; }
    DbSet<Organization> Organizations { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
