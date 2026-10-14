"use client";

import { useMemo, useState, type ReactNode } from "react";
import { SearchIcon } from "@/components/icons";
import { formatCategory, formatDate } from "@/lib/format";
import type { Donation, DonationStatus, FoodCategory } from "@/lib/types";

const statusBadge: Record<DonationStatus, string> = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Reserved: "bg-sky-50 text-sky-700 ring-sky-600/20",
  Collected: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Cancelled: "bg-gray-100 text-gray-600 ring-gray-500/20",
};

const categoryDot: Record<FoodCategory, string> = {
  Bakery: "bg-amber-400",
  Produce: "bg-green-500",
  Dairy: "bg-sky-400",
  PreparedMeals: "bg-orange-400",
  Packaged: "bg-violet-400",
  Beverages: "bg-cyan-400",
  Other: "bg-gray-400",
};

interface DonationsTableProps {
  title: string;
  description?: string;
  donations: Donation[];
  loading?: boolean;
  highlightIds?: Set<string>;
  actions?: ReactNode;
}

export function DonationsTable({
  title,
  description,
  donations,
  loading,
  highlightIds,
  actions,
}: DonationsTableProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return donations;
    return donations.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.organizationName.toLowerCase().includes(q) ||
        formatCategory(d.category).toLowerCase().includes(q),
    );
  }, [donations, query]);

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm shadow-gray-100">
      <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          {description && <p className="mt-0.5 text-sm text-gray-500">{description}</p>}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter..."
              className="w-48 rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            />
          </div>
          {actions}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50/80 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-6 py-3">Donation</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3 text-right">Quantity</th>
              <th className="px-6 py-3">Donor</th>
              <th className="px-6 py-3">Created</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading &&
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={`skeleton-${i}`}>
                  {Array.from({ length: 6 }).map((__, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 animate-pulse rounded bg-gray-100" />
                    </td>
                  ))}
                </tr>
              ))}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-400">
                  No donations found.
                </td>
              </tr>
            )}

            {!loading &&
              filtered.map((d) => (
                <tr
                  key={d.id}
                  className={`transition-colors hover:bg-emerald-50/40 ${
                    highlightIds?.has(d.id) ? "bg-emerald-50/70" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{d.title}</p>
                    <p className="font-mono text-xs text-gray-400">#{d.id.slice(0, 8)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 text-gray-700">
                      <span className={`h-2 w-2 rounded-full ${categoryDot[d.category]}`} />
                      {formatCategory(d.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold tabular-nums text-gray-900">
                    {d.quantity}
                    <span className="ml-1 text-xs font-normal text-gray-400">units</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{d.organizationName}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-500">{formatDate(d.createdAt)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusBadge[d.status]}`}
                    >
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
