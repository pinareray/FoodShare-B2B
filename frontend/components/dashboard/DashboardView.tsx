"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ActivityIcon, PackageIcon, PlusIcon, UsersIcon, BasketIcon } from "@/components/icons";
import { useRealtime } from "@/components/providers/RealtimeProvider";
import { usePendingDonations } from "@/hooks/usePendingDonations";
import { createDonation } from "@/lib/api";
import { randomSampleDonation } from "@/lib/demo-data";
import { DonationsTable } from "./DonationsTable";
import { StatCard } from "./StatCard";

export function DashboardView() {
  const { donations, source } = usePendingDonations();
  const { liveDonations, status } = useRealtime();
  const [submitting, setSubmitting] = useState(false);

  const stats = useMemo(() => {
    const totalUnits = donations.reduce((sum, d) => sum + d.quantity, 0);
    const donors = new Set(donations.map((d) => d.organizationId)).size;
    return { totalUnits, donors };
  }, [donations]);

  const liveIds = useMemo(() => new Set(liveDonations.map((d) => d.id)), [liveDonations]);

  const handleSimulate = async () => {
    setSubmitting(true);
    try {
      await createDonation(randomSampleDonation());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not create donation");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track surplus food donations and match them with organizations in real time.
          </p>
        </div>
        {source === "demo" && (
          <span className="inline-flex w-fit items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
            API unreachable — showing demo data
          </span>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Pending Donations"
          value={donations.length}
          hint="Awaiting pickup by a recipient"
          icon={BasketIcon}
          accent="emerald"
        />
        <StatCard
          label="Food Units Available"
          value={stats.totalUnits.toLocaleString("en-US")}
          hint="Across all pending donations"
          icon={PackageIcon}
          accent="green"
        />
        <StatCard
          label="Active Donors"
          value={stats.donors}
          hint="Organizations with open donations"
          icon={UsersIcon}
          accent="teal"
        />
        <StatCard
          label="Live Updates"
          value={liveDonations.length}
          hint={status === "connected" ? "Received this session via SignalR" : "Real-time channel offline"}
          icon={ActivityIcon}
          accent="gray"
        />
      </div>

      <DonationsTable
        title="Recent Food Donations"
        description="Pending donations, newest first. Live arrivals are highlighted."
        donations={donations}
        loading={source === "loading"}
        highlightIds={liveIds}
        actions={
          <button
            type="button"
            onClick={handleSimulate}
            disabled={submitting || source !== "api"}
            title={source !== "api" ? "Start the backend API to create donations" : undefined}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-200 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
          >
            <PlusIcon className="h-4 w-4" />
            {submitting ? "Adding..." : "Sample donation"}
          </button>
        }
      />
    </div>
  );
}
