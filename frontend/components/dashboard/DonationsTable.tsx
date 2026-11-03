"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { ClockIcon, SearchIcon } from "@/components/icons";
import { EmptyPlate } from "@/components/illustrations/FoodShareScene";
import { formatCategory, formatDate, formatExpiry, formatStatus } from "@/lib/format";
import type { Donation, DonationStatus } from "@/lib/types";
import { categoryStyles } from "./categoryStyles";

const statusBadge: Record<DonationStatus, string> = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Reserved: "bg-sky-50 text-sky-700 ring-sky-600/20",
  Collected: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Cancelled: "bg-gray-100 text-gray-600 ring-gray-500/20",
};

interface DonationsTableProps {
  title: string;
  description?: string;
  donations: Donation[];
  loading?: boolean;
  highlightIds?: Set<string>;
  actions?: ReactNode;
  /** Extra controls rendered above the table, e.g. status tabs. */
  toolbar?: ReactNode;
  renderRowActions?: (donation: Donation) => ReactNode;
}

export function DonationsTable({
  title,
  description,
  donations,
  loading,
  highlightIds,
  actions,
  toolbar,
  renderRowActions,
}: DonationsTableProps) {
  const [query, setQuery] = useState("");
  const columnCount = renderRowActions ? 6 : 5;

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr-TR");
    if (!q) return donations;
    return donations.filter((d) =>
      [d.title, d.organizationName, d.recipientOrganizationName ?? "", formatCategory(d.category)].some((field) =>
        field.toLocaleLowerCase("tr-TR").includes(q),
      ),
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
              placeholder="Ara..."
              className="w-40 rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-100 sm:w-48"
            />
          </div>
          {actions}
        </div>
      </div>

      {toolbar && <div className="border-b border-gray-100 px-6 py-3">{toolbar}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="whitespace-nowrap bg-gray-50/80 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-4 py-3 first:pl-6 last:pr-6">Bağış</th>
              <th className="px-4 py-3 first:pl-6 last:pr-6">Kategori</th>
              <th className="px-4 py-3 first:pl-6 last:pr-6 text-right">Miktar</th>
              <th className="px-4 py-3 first:pl-6 last:pr-6">Bağışçı → Alıcı</th>
              <th className="px-4 py-3 first:pl-6 last:pr-6">Durum</th>
              {renderRowActions && <th className="px-4 py-3 first:pl-6 last:pr-6 text-right">İşlem</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading &&
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={`skeleton-${i}`}>
                  {Array.from({ length: columnCount }).map((__, j) => (
                    <td key={j} className="px-4 py-4 first:pl-6 last:pr-6">
                      <div className="h-4 animate-pulse rounded bg-gray-100" />
                    </td>
                  ))}
                </tr>
              ))}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={columnCount} className="px-6 py-12 text-center">
                  <EmptyPlate className="mx-auto h-20 w-32" />
                  <p className="mt-3 text-sm font-medium text-gray-500">Gösterilecek bağış bulunamadı</p>
                  <p className="mt-1 text-xs text-gray-400">Filtreyi değiştirin ya da yeni bir bağış ekleyin.</p>
                </td>
              </tr>
            )}

            {!loading &&
              filtered.map((d, index) => {
                const { icon: CategoryIcon, chip } = categoryStyles[d.category];
                const expiry = d.expiresAt && d.status === "Pending" ? formatExpiry(d.expiresAt) : null;
                return (
                  <tr
                    key={d.id}
                    className={`animate-fade-up transition-colors hover:bg-emerald-50/40 ${
                      highlightIds?.has(d.id) ? "animate-flash" : ""
                    }`}
                    style={{ "--delay": `${Math.min(index, 10) * 40}ms` } as CSSProperties}
                  >
                    <td className="min-w-48 py-4 pl-6 pr-4">
                      <p className="font-medium text-gray-900">{d.title}</p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-gray-400">
                        <span className="whitespace-nowrap">{formatDate(d.createdAt)}</span>
                        {expiry && (
                          <span
                            className={`inline-flex items-center gap-1 whitespace-nowrap ${
                              expiry.urgent ? "font-medium text-rose-600" : "text-amber-600"
                            }`}
                          >
                            <ClockIcon className="h-3.5 w-3.5" />
                            {expiry.label}
                          </span>
                        )}
                      </p>
                    </td>
                    <td className="px-4 py-4 first:pl-6 last:pr-6">
                      <span className="inline-flex items-center gap-2 whitespace-nowrap text-gray-700">
                        <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${chip}`}>
                          <CategoryIcon className="h-4 w-4" />
                        </span>
                        {formatCategory(d.category)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right font-semibold tabular-nums text-gray-900">
                      {d.quantity}
                      <span className="ml-1 text-xs font-normal text-gray-400">adet</span>
                    </td>
                    <td className="min-w-40 px-4 py-4">
                      <p className="text-gray-700">{d.organizationName}</p>
                      {d.recipientOrganizationName && (
                        <p className="text-xs text-emerald-700">→ {d.recipientOrganizationName}</p>
                      )}
                    </td>
                    <td className="px-4 py-4 first:pl-6 last:pr-6">
                      <span
                        className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusBadge[d.status]}`}
                      >
                        {formatStatus(d.status)}
                      </span>
                    </td>
                    {renderRowActions && (
                      <td className="whitespace-nowrap py-4 pl-4 pr-6 text-right">{renderRowActions(d)}</td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
