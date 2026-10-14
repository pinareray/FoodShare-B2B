using FoodShare.Domain.Enums;

namespace FoodShare.Domain.Entities;

public class Donation
{
    private Donation() { }

    public Donation(string title, FoodCategory category, int quantity, Guid organizationId)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(title);
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(quantity);

        Id = Guid.NewGuid();
        Title = title.Trim();
        Category = category;
        Quantity = quantity;
        OrganizationId = organizationId;
        Status = DonationStatus.Pending;
        CreatedAt = DateTime.UtcNow;
    }

    public Guid Id { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public FoodCategory Category { get; private set; }
    public int Quantity { get; private set; }
    public DonationStatus Status { get; private set; }
    public DateTime CreatedAt { get; private set; }

    public Guid OrganizationId { get; private set; }
    public Organization? Organization { get; private set; }

    public void Reserve()
    {
        if (Status != DonationStatus.Pending)
            throw new InvalidOperationException($"Only pending donations can be reserved (current: {Status}).");

        Status = DonationStatus.Reserved;
    }

    public void MarkCollected()
    {
        if (Status != DonationStatus.Reserved)
            throw new InvalidOperationException($"Only reserved donations can be collected (current: {Status}).");

        Status = DonationStatus.Collected;
    }

    public void Cancel()
    {
        if (Status == DonationStatus.Collected)
            throw new InvalidOperationException("Collected donations cannot be cancelled.");

        Status = DonationStatus.Cancelled;
    }
}
