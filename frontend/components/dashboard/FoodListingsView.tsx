"use client";

import { useMemo, useState } from "react";
import { PlusIcon } from "@/components/icons";
import { DonationRowActions } from "@/components/donations/DonationRowActions";
import { NewDonationDialog } from "@/components/donations/NewDonationDialog";
import { ReserveDialog } from "@/components/donations/ReserveDialog";
import { useDonationActions } from "@/components/donations/useDonationActions";
import { primaryButtonClass } from "@/components/ui/Dialog";
import { useDonations } from "@/hooks/useDonations";
import { statusLabels } from "@/lib/format";
import type { Donation, DonationStatus } from "@/lib/types";
import { DonationsTable } from "./DonationsTable";

type Filter = "All" | DonationStatus;

const filters: Filter[] = ["All", "Pending", "Reserved", "Collected", "Cancelled"];

export function FoodListingsView() {
  const { donations, source } = useDonations();
  const { busyId, reserve, collect, cancel } = useDonationActions();
  const [filter, setFilter] = useState<Filter>("All");
  const [reserving, setReserving] = useState<Donation | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const canAct = source === "api";

  const counts = useMemo(() => {
    const result: Record<Filter, number> = { All: donations.length, Pending: 0, Reserved: 0, Collected: 0, Cancelled: 0 };
    for (const d of donations) result[d.status] += 1;
    return result;
  }, [donations]);

  const visible = filter === "All" ? donations : donations.filter((d) => d.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Gıda İlanları</h1>
          <p className="mt-1 text-sm text-gray-500">
            Bağışları rezerve edin, teslim alındığını işaretleyin ve tüm süreci tek ekrandan yönetin.
          </p>
        </div>
        <button type="button" onClick={() => setDialogOpen(true)} disabled={!canAct} className={primaryButtonClass}>
          <PlusIcon className="h-4 w-4" />
          Yeni Bağış
        </button>
      </div>

      <DonationsTable
        title="Tüm İlanlar"
        donations={visible}
        loading={source === "loading"}
        toolbar={
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  filter === f ? "bg-emerald-500 text-white shadow-sm shadow-emerald-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f === "All" ? "Tümü" : statusLabels[f]}
                <span className={`rounded-full px-1.5 ${filter === f ? "bg-white/20" : "bg-white text-gray-500"}`}>
                  {counts[f]}
                </span>
              </button>
            ))}
          </div>
        }
        renderRowActions={
          canAct
            ? (d) => (
                <DonationRowActions
                  donation={d}
                  busy={busyId === d.id}
                  onReserve={setReserving}
                  onCollect={collect}
                  onCancel={cancel}
                />
              )
            : undefined
        }
      />

      <ReserveDialog
        donation={reserving}
        busy={reserving !== null && busyId === reserving.id}
        onClose={() => setReserving(null)}
        onConfirm={async (recipientId) => {
          if (reserving && (await reserve(reserving.id, recipientId))) setReserving(null);
        }}
      />
      <NewDonationDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
