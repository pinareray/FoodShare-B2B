"use client";

import { useEffect, useMemo, useState } from "react";
import { useRealtime } from "@/components/providers/RealtimeProvider";
import { getDonations } from "@/lib/api";
import { demoDonations } from "@/lib/demo-data";
import type { Donation } from "@/lib/types";

export type DataSource = "loading" | "api" | "demo";

/** All donations from the API, kept current with creations and status changes received over SignalR. */
export function useDonations() {
  const { liveDonations, donationUpdates } = useRealtime();
  const [fetched, setFetched] = useState<Donation[]>([]);
  const [source, setSource] = useState<DataSource>("loading");

  useEffect(() => {
    const controller = new AbortController();

    getDonations(controller.signal)
      .then((donations) => {
        setFetched(donations);
        setSource("api");
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setFetched(demoDonations);
        setSource("demo");
      });

    return () => controller.abort();
  }, []);

  const donations = useMemo(() => {
    const byId = new Map<string, Donation>();
    for (const d of [...liveDonations, ...fetched]) {
      if (!byId.has(d.id)) byId.set(d.id, d);
    }
    for (const d of Object.values(donationUpdates)) byId.set(d.id, d);

    return [...byId.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [liveDonations, fetched, donationUpdates]);

  return { donations, source };
}
