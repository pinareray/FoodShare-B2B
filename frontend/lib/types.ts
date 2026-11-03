export type DonationStatus = "Pending" | "Reserved" | "Collected" | "Cancelled";

export type FoodCategory =
  | "Bakery"
  | "Produce"
  | "Dairy"
  | "PreparedMeals"
  | "Packaged"
  | "Beverages"
  | "Other";

export interface Donation {
  id: string;
  title: string;
  category: FoodCategory;
  quantity: number;
  status: DonationStatus;
  /** Donor business. */
  organizationId: string;
  organizationName: string;
  createdAt: string;
  expiresAt: string | null;
  recipientOrganizationId: string | null;
  recipientOrganizationName: string | null;
  reservedAt: string | null;
  collectedAt: string | null;
}

export interface CreateDonationRequest {
  title: string;
  category: FoodCategory;
  quantity: number;
  organizationId: string;
  expiresAt?: string | null;
}

export type OrganizationType = "Donor" | "Recipient";

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  email: string;
  city: string;
  /** Donations offered (donors) or reserved (recipients), excluding cancelled ones. */
  donationCount: number;
  /** Food units offered (donors) or received (recipients), excluding cancelled ones. */
  totalQuantity: number;
}
