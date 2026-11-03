"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { donationToastId, useRealtime } from "@/components/providers/RealtimeProvider";
import { cancelDonation, collectDonation, reserveDonation } from "@/lib/api";
import { formatStatus } from "@/lib/format";
import type { Donation } from "@/lib/types";

/** Donation lifecycle actions; results are applied locally so the UI updates even if the hub is offline. */
export function useDonationActions() {
  const { applyDonation } = useRealtime();
  const [busyId, setBusyId] = useState<string | null>(null);

  const run = async (id: string, action: () => Promise<Donation>) => {
    setBusyId(id);
    try {
      const updated = await action();
      applyDonation(updated);
      toast.success(`${updated.title}: ${formatStatus(updated.status)}`, { id: donationToastId(updated) });
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "İşlem başarısız");
      return false;
    } finally {
      setBusyId(null);
    }
  };

  return {
    busyId,
    reserve: (id: string, recipientId: string) => run(id, () => reserveDonation(id, recipientId)),
    collect: (id: string) => run(id, () => collectDonation(id)),
    cancel: (id: string) => run(id, () => cancelDonation(id)),
  };
}
