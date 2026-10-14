using FoodShare.Domain.Entities;
using FoodShare.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FoodShare.Infrastructure.Persistence.Configurations;

public class OrganizationConfiguration : IEntityTypeConfiguration<Organization>
{
    public void Configure(EntityTypeBuilder<Organization> builder)
    {
        builder.ToTable("organizations");
        builder.HasKey(o => o.Id);

        builder.Property(o => o.Name).HasMaxLength(200).IsRequired();
        builder.Property(o => o.Email).HasMaxLength(256).IsRequired();
        builder.Property(o => o.City).HasMaxLength(100);
        builder.Property(o => o.Type).HasConversion<string>().HasMaxLength(32);

        builder.HasIndex(o => o.Email).IsUnique();

        builder.Metadata
            .FindNavigation(nameof(Organization.Donations))!
            .SetPropertyAccessMode(PropertyAccessMode.Field);

        builder.HasData(
            new
            {
                Id = SeedData.GreenBakeryId,
                Name = "Green Leaf Bakery",
                Type = OrganizationType.Donor,
                Email = "contact@greenleaf.example",
                City = "Istanbul",
                CreatedAt = SeedData.CreatedAt
            },
            new
            {
                Id = SeedData.FreshMarketId,
                Name = "FreshMarket Supermarket",
                Type = OrganizationType.Donor,
                Email = "csr@freshmarket.example",
                City = "Ankara",
                CreatedAt = SeedData.CreatedAt
            },
            new
            {
                Id = SeedData.HopeFoodBankId,
                Name = "Hope Food Bank",
                Type = OrganizationType.Recipient,
                Email = "hello@hopefoodbank.example",
                City = "Istanbul",
                CreatedAt = SeedData.CreatedAt
            });
    }
}
