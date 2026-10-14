import type { Metadata } from "next";
import { FoodListingsView } from "@/components/dashboard/FoodListingsView";

export const metadata: Metadata = { title: "Food Listings · FoodShare B2B" };

export default function FoodListingsPage() {
  return <FoodListingsView />;
}
