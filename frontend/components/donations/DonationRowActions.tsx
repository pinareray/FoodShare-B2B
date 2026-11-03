"use client";

import type { Donation } from "@/lib/types";

interface DonationRowActionsProps {
  donation: Donation;
  busy: boolean;
  onReserve: (donation: Donation) => void;
  onCollect: (id: string) => void;
  onCancel: (id: string) => void;
}

const base = "rounded-lg px-2.5 py-1.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

export function DonationRowActions({ donation, busy, onReserve, onCollect, onCancel }: DonationRowActionsProps) {
  const { status } = donation;

  if (status === "Collected" || status === "Cancelled") {
    return <span className="text-xs text-gray-300">—</span>;
  }

  return (
    <div className="inline-flex items-center gap-1.5">
      {status === "Pending" && (
        <button
          type="button"
          disabled={busy}
          onClick={() => onReserve(donation)}
          className={`${base} bg-sky-50 text-sky-700 hover:bg-sky-100`}
        >
          Rezerve et
        </button>
      )}
      {status === "Reserved" && (
        <button
          type="button"
          disabled={busy}
          onClick={() => onCollect(donation.id)}
          className={`${base} bg-emerald-50 text-emerald-700 hover:bg-emerald-100`}
        >
          Teslim alındı
        </button>
      )}
      <button
        type="button"
        disabled={busy}
        onClick={() => onCancel(donation.id)}
        className={`${base} text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
      >
        İptal
      </button>
    </div>
  );
}
