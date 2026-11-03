import type { Metadata } from "next";
import { OrganizationsView } from "@/components/organizations/OrganizationsView";

export const metadata: Metadata = { title: "Kurumlar · FoodShare B2B" };

export default function OrganizationsPage() {
  return <OrganizationsView />;
}
