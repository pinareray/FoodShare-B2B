"use client";

import { useState, type CSSProperties } from "react";
import { BuildingIcon, HandHeartIcon } from "@/components/icons";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { useOrganizations } from "@/hooks/useOrganizations";
import { organizationTypeLabels } from "@/lib/format";
import type { OrganizationType } from "@/lib/types";

type Filter = "All" | OrganizationType;

export function OrganizationsView() {
  const { organizations, source } = useOrganizations();
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? organizations : organizations.filter((o) => o.type === filter);

  const filterLabels: Record<Filter, string> = { All: "Tümü", Donor: "Bağışçılar", Recipient: "Alıcı Kurumlar" };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kurumlar</h1>
          <p className="mt-1 text-sm text-gray-500">Ağdaki bağışçı işletmeler ve gıda desteği alan kurumlar.</p>
        </div>
        <div className="inline-flex rounded-xl bg-gray-100 p-1">
          {(Object.keys(filterLabels) as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                filter === f ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
      </div>

      {source === "demo" && (
        <p className="text-xs font-medium text-amber-700">API’ye ulaşılamadı — demo veri gösteriliyor.</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {source === "loading" &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-44 animate-pulse rounded-2xl border border-gray-100 bg-white" />
          ))}

        {visible.map((org, i) => {
          const isDonor = org.type === "Donor";
          const Icon = isDonor ? BuildingIcon : HandHeartIcon;
          return (
            <article
              key={`${filter}-${org.id}`}
              className="group relative animate-fade-up overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm shadow-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-100/60"
              style={{ "--delay": `${i * 70}ms` } as CSSProperties}
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                  isDonor ? "from-emerald-400 to-green-400" : "from-sky-400 to-indigo-400"
                } origin-left-bar scale-x-0 transition-transform duration-500 group-hover:scale-x-100`}
              />
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
                    isDonor ? "bg-emerald-50 text-emerald-600" : "bg-sky-50 text-sky-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-semibold text-gray-900">{org.name}</h2>
                  <p className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                    {org.city}
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${
                        isDonor
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                          : "bg-sky-50 text-sky-700 ring-sky-600/20"
                      }`}
                    >
                      {organizationTypeLabels[org.type]}
                    </span>
                  </p>
                </div>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 px-3 py-2.5">
                  <dt className="text-[11px] font-medium text-gray-500">{isDonor ? "Yapılan bağış" : "Alınan bağış"}</dt>
                  <dd className="mt-0.5 text-lg font-bold text-gray-900"><AnimatedNumber value={org.donationCount} /></dd>
                </div>
                <div className="rounded-xl bg-gray-50 px-3 py-2.5">
                  <dt className="text-[11px] font-medium text-gray-500">{isDonor ? "Paylaşılan gıda" : "Ulaşan gıda"}</dt>
                  <dd className="mt-0.5 text-lg font-bold text-gray-900">
                    <AnimatedNumber value={org.totalQuantity} /> <span className="text-xs font-normal text-gray-400">adet</span>
                  </dd>
                </div>
              </dl>

              <p className="mt-4 truncate text-xs text-gray-400">{org.email}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
