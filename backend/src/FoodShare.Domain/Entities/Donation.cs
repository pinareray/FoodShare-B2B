using FoodShare.Domain.Enums;

namespace FoodShare.Domain.Entities;

public class Donation
{
    private Donation() { }

    public Donation(string title, FoodCategory category, int quantity, Guid organizationId, DateTime? expiresAt = null)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(title);
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(quantity);

        if (expiresAt is { } expiry && expiry <= DateTime.UtcNow)
            throw new ArgumentException("Expiry date must be in the future.", nameof(expiresAt));

        Id = Guid.NewGuid();
        Title = title.Trim();
        Category = category;
        Quantity = quantity;
        OrganizationId = organizationId;
        Status = DonationStatus.Pending;
        CreatedAt = DateTime.UtcNow;
        ExpiresAt = expiresAt;
    }

    public Guid Id { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public FoodCategory Category { get; private set; }
    public int Quantity { get; private set; }
    public DonationStatus Status { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? ExpiresAt { get; private set; }
    public DateTime? ReservedAt { get; private set; }
    public DateTime? CollectedAt { get; private set; }

    /// <summary>Donor business that offered the food.</summary>
    public Guid OrganizationId { get; private set; }
    public Organization? Organization { get; private set; }

    /// <summary>Recipient organization that reserved the food, if any.</summary>
    public Guid? RecipientOrganizationId { get; private set; }
    public Organization? RecipientOrganization { get; private set; }

    public void Reserve(Guid recipientOrganizationId)
    {
        if (Status != DonationStatus.Pending)
            throw new InvalidOperationException($"Only pending donations can be reserved (current: {Status}).");

        RecipientOrganizationId = recipientOrganizationId;
        ReservedAt = DateTime.UtcNow;
        Status = DonationStatus.Reserved;
    }

    public void MarkCollected()
    {
        if (Status != DonationStatus.Reserved)
            throw new InvalidOperationException($"Only reserved donations can be collected (current: {Status}).");

        CollectedAt = DateTime.UtcNow;
        Status = DonationStatus.Collected;
    }

    public void Cancel()
    {
        if (Status == DonationStatus.Collected)
            throw new InvalidOperationException("Collected donations cannot be cancelled.");

        Status = DonationStatus.Cancelled;
    }
}
