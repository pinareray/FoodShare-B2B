"use client";

import { useEffect, useMemo, useState } from "react";
import { useRealtime } from "@/components/providers/RealtimeProvider";
import { getPendingDonations } from "@/lib/api";
import { demoDonations } from "@/lib/demo-data";
import type { Donation } from "@/lib/types";

export type DataSource = "loading" | "api" | "demo";

/** Pending donations from the API, merged with donations received live over SignalR. */
export function usePendingDonations() {
  const { liveDonations } = useRealtime();
  const [fetched, setFetched] = useState<Donation[]>([]);
  const [source, setSource] = useState<DataSource>("loading");

  useEffect(() => {
    const controller = new AbortController();

    getPendingDonations(controller.signal)
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
    const seen = new Set<string>();
    return [...liveDonations, ...fetched].filter((d) => {
      if (d.status !== "Pending" || seen.has(d.id)) return false;
      seen.add(d.id);
      return true;
    });
  }, [liveDonations, fetched]);

  return { donations, source };
}
