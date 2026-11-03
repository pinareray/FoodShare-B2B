namespace FoodShare.Infrastructure.Persistence;

internal static class SeedData
{
    // Donors
    public static readonly Guid GreenBakeryId = Guid.Parse("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a01");
    public static readonly Guid FreshMarketId = Guid.Parse("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a02");
    public static readonly Guid LezzetRestaurantId = Guid.Parse("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a04");

    // Recipients
    public static readonly Guid HopeFoodBankId = Guid.Parse("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a03");
    public static readonly Guid KardeslikSoupKitchenId = Guid.Parse("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a05");
    public static readonly Guid GulumseAssociationId = Guid.Parse("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a06");

    public static readonly DateTime CreatedAt = new(2026, 1, 1, 9, 0, 0, DateTimeKind.Utc);
}
