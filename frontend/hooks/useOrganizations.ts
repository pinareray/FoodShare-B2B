"use client";

import { useEffect, useState } from "react";
import { getOrganizations } from "@/lib/api";
import { demoOrganizations } from "@/lib/demo-data";
import type { Organization } from "@/lib/types";
import type { DataSource } from "./useDonations";

export function useOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [source, setSource] = useState<DataSource>("loading");

  useEffect(() => {
    const controller = new AbortController();

    getOrganizations(controller.signal)
      .then((data) => {
        setOrganizations(data);
        setSource("api");
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setOrganizations(demoOrganizations);
        setSource("demo");
      });

    return () => controller.abort();
  }, []);

  return { organizations, source };
}
