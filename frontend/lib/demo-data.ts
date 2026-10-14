import type { CreateDonationRequest, Donation, Organization } from "./types";

// IDs match the seed data in backend ApplicationDbContext configurations.
export const organizations: Organization[] = [
  {
    id: "3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a01",
    name: "Green Leaf Bakery",
    type: "Donor",
    email: "contact@greenleaf.example",
    city: "Istanbul",
  },
  {
    id: "3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a02",
    name: "FreshMarket Supermarket",
    type: "Donor",
    email: "csr@freshmarket.example",
    city: "Ankara",
  },
  {
    id: "3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a03",
    name: "Hope Food Bank",
    type: "Recipient",
    email: "hello@hopefoodbank.example",
    city: "Istanbul",
  },
];

export const demoDonations: Donation[] = [
  {
    id: "demo-1",
    title: "Fresh sourdough bread",
    category: "Bakery",
    quantity: 40,
    status: "Pending",
    organizationId: organizations[0].id,
    organizationName: organizations[0].name,
    createdAt: "2026-01-01T09:00:00Z",
  },
  {
    id: "demo-2",
    title: "Seasonal vegetables crate",
    category: "Produce",
    quantity: 25,
    status: "Pending",
    organizationId: organizations[1].id,
    organizationName: organizations[1].name,
    createdAt: "2026-01-01T10:00:00Z",
  },
  {
    id: "demo-3",
    title: "Packaged pasta & rice",
    category: "Packaged",
    quantity: 120,
    status: "Pending",
    organizationId: organizations[1].id,
    organizationName: organizations[1].name,
    createdAt: "2026-01-01T11:30:00Z",
  },
];

const sampleDonations: Omit<CreateDonationRequest, "organizationId">[] = [
  { title: "Croissants & pastries", category: "Bakery", quantity: 35 },
  { title: "Organic apples", category: "Produce", quantity: 50 },
  { title: "Ready-to-eat lunch boxes", category: "PreparedMeals", quantity: 30 },
  { title: "Bottled water packs", category: "Beverages", quantity: 80 },
  { title: "Milk cartons", category: "Dairy", quantity: 45 },
];

export function randomSampleDonation(): CreateDonationRequest {
  const donors = organizations.filter((o) => o.type === "Donor");
  const sample = sampleDonations[Math.floor(Math.random() * sampleDonations.length)];
  const donor = donors[Math.floor(Math.random() * donors.length)];
  return { ...sample, organizationId: donor.id };
}
