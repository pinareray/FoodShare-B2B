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
  organizationId: string;
  organizationName: string;
  createdAt: string;
}

export interface CreateDonationRequest {
  title: string;
  category: FoodCategory;
  quantity: number;
  organizationId: string;
}

export type OrganizationType = "Donor" | "Recipient";

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  email: string;
  city: string;
}
