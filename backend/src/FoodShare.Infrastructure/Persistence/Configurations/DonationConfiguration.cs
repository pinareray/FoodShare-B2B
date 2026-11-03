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

        builder.HasOne(d => d.RecipientOrganization)
            .WithMany()
            .HasForeignKey(d => d.RecipientOrganizationId)
            .OnDelete(DeleteBehavior.Restrict);

        var day = TimeSpan.FromDays(1);
        var hour = TimeSpan.FromHours(1);

        builder.HasData(
            Seed(1, "Taze ekşi maya ekmek", FoodCategory.Bakery, 40, SeedData.GreenBakeryId, SeedData.CreatedAt),
            Seed(2, "Mevsim sebzeleri kasası", FoodCategory.Produce, 25, SeedData.FreshMarketId, SeedData.CreatedAt + hour),
            Seed(3, "Yoğurt ve peynir çeşitleri", FoodCategory.Dairy, 60, SeedData.FreshMarketId, SeedData.CreatedAt + 2 * hour,
                DonationStatus.Reserved, SeedData.HopeFoodBankId),
            Seed(4, "Hazır öğle yemeği paketleri", FoodCategory.PreparedMeals, 30, SeedData.LezzetRestaurantId, SeedData.CreatedAt - 3 * day,
                DonationStatus.Collected, SeedData.KardeslikSoupKitchenId),
            Seed(5, "Paketli makarna ve pirinç", FoodCategory.Packaged, 120, SeedData.FreshMarketId, SeedData.CreatedAt - 5 * day,
                DonationStatus.Collected, SeedData.HopeFoodBankId),
            Seed(6, "Simit ve poğaça", FoodCategory.Bakery, 45, SeedData.GreenBakeryId, SeedData.CreatedAt - 2 * day,
                DonationStatus.Collected, SeedData.GulumseAssociationId),
            Seed(7, "Meyve suyu kolileri", FoodCategory.Beverages, 80, SeedData.FreshMarketId, SeedData.CreatedAt + 3 * hour),
            Seed(8, "Günün çorbası", FoodCategory.PreparedMeals, 20, SeedData.LezzetRestaurantId, SeedData.CreatedAt - day,
                DonationStatus.Cancelled));
    }

    private static object Seed(
        int number,
        string title,
        FoodCategory category,
        int quantity,
        Guid donorId,
        DateTime createdAt,
        DonationStatus status = DonationStatus.Pending,
        Guid? recipientId = null) => new
    {
        Id = Guid.Parse($"8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a{number:D2}"),
        Title = title,
        Category = category,
        Quantity = quantity,
        Status = status,
        OrganizationId = donorId,
        CreatedAt = createdAt,
        ExpiresAt = (DateTime?)null,
        RecipientOrganizationId = recipientId,
        ReservedAt = recipientId is null ? (DateTime?)null : createdAt + TimeSpan.FromHours(2),
        CollectedAt = status == DonationStatus.Collected ? createdAt + TimeSpan.FromHours(5) : (DateTime?)null
    };
}
