using FoodShare.Domain.Entities;
using FoodShare.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FoodShare.Infrastructure.Persistence.Configurations;

public class DonationConfiguration : IEntityTypeConfiguration<Donation>
{
    public void Configure(EntityTypeBuilder<Donation> builder)
    {
        builder.ToTable("donations");
        builder.HasKey(d => d.Id);

        builder.Property(d => d.Title).HasMaxLength(200).IsRequired();
        builder.Property(d => d.Category).HasConversion<string>().HasMaxLength(32);
        builder.Property(d => d.Status).HasConversion<string>().HasMaxLength(32);
        builder.Property(d => d.Quantity).IsRequired();

        builder.HasIndex(d => d.Status);

        builder.HasOne(d => d.Organization)
            .WithMany(o => o.Donations)
            .HasForeignKey(d => d.OrganizationId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasData(
            new
            {
                Id = Guid.Parse("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a01"),
                Title = "Fresh sourdough bread",
                Category = FoodCategory.Bakery,
                Quantity = 40,
                Status = DonationStatus.Pending,
                OrganizationId = SeedData.GreenBakeryId,
                CreatedAt = SeedData.CreatedAt
            },
            new
            {
                Id = Guid.Parse("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a02"),
                Title = "Seasonal vegetables crate",
                Category = FoodCategory.Produce,
                Quantity = 25,
                Status = DonationStatus.Pending,
                OrganizationId = SeedData.FreshMarketId,
                CreatedAt = SeedData.CreatedAt.AddHours(1)
            },
            new
            {
                Id = Guid.Parse("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a03"),
                Title = "Yogurt & cheese assortment",
                Category = FoodCategory.Dairy,
                Quantity = 60,
                Status = DonationStatus.Reserved,
                OrganizationId = SeedData.FreshMarketId,
                CreatedAt = SeedData.CreatedAt.AddHours(2)
            });
    }
}
