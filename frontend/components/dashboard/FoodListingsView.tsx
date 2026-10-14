"use client";

import { usePendingDonations } from "@/hooks/usePendingDonations";
import { DonationsTable } from "./DonationsTable";

export function FoodListingsView() {
  const { donations, source } = usePendingDonations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Food Listings</h1>
        <p className="mt-1 text-sm text-gray-500">All surplus food currently available for collection.</p>
      </div>
      <DonationsTable title="Available Listings" donations={donations} loading={source === "loading"} />
    </div>
  );
}
