import type { Metadata } from "next";
import { BuildingIcon } from "@/components/icons";
import { organizations } from "@/lib/demo-data";

export const metadata: Metadata = { title: "Organizations · FoodShare B2B" };

export default function OrganizationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Organizations</h1>
        <p className="mt-1 text-sm text-gray-500">Donor businesses and recipient organizations in the network.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {organizations.map((org) => (
          <article
            key={org.id}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm shadow-gray-100 transition hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <BuildingIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h2 className="truncate font-semibold text-gray-900">{org.name}</h2>
                <p className="text-xs text-gray-500">{org.city}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                  org.type === "Donor"
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                    : "bg-gray-100 text-gray-700 ring-gray-500/20"
                }`}
              >
                {org.type}
              </span>
              <span className="truncate text-xs text-gray-400">{org.email}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
