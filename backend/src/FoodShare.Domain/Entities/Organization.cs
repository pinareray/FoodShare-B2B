using FoodShare.Domain.Enums;

namespace FoodShare.Domain.Entities;

public class Organization
{
    private readonly List<Donation> _donations = [];

    private Organization() { }

    public Organization(string name, OrganizationType type, string email, string city)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentException.ThrowIfNullOrWhiteSpace(email);

        Id = Guid.NewGuid();
        Name = name.Trim();
        Type = type;
        Email = email.Trim();
        City = city.Trim();
        CreatedAt = DateTime.UtcNow;
    }

    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public OrganizationType Type { get; private set; }
    public string Email { get; private set; } = string.Empty;
    public string City { get; private set; } = string.Empty;
    public DateTime CreatedAt { get; private set; }

    public IReadOnlyCollection<Donation> Donations => _donations.AsReadOnly();
}
