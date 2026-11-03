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
            Seed(SeedData.GreenBakeryId, "Yeşil Yaprak Fırını", OrganizationType.Donor, "iletisim@yesilyaprak.example", "İstanbul"),
            Seed(SeedData.FreshMarketId, "TazePazar Market", OrganizationType.Donor, "sosyal@tazepazar.example", "Ankara"),
            Seed(SeedData.LezzetRestaurantId, "Lezzet Durağı Restoran", OrganizationType.Donor, "info@lezzetduragi.example", "İzmir"),
            Seed(SeedData.HopeFoodBankId, "Umut Gıda Bankası", OrganizationType.Recipient, "merhaba@umutgidabankasi.example", "İstanbul"),
            Seed(SeedData.KardeslikSoupKitchenId, "Kardeşlik Aşevi", OrganizationType.Recipient, "destek@kardeslikasevi.example", "Ankara"),
            Seed(SeedData.GulumseAssociationId, "Gülümse Çocuk Derneği", OrganizationType.Recipient, "bilgi@gulumsedernegi.example", "İzmir"));
    }

    private static object Seed(Guid id, string name, OrganizationType type, string email, string city) => new
    {
        Id = id,
        Name = name,
        Type = type,
        Email = email,
        City = city,
        CreatedAt = SeedData.CreatedAt
    };
}
