"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BasketIcon, BuildingIcon, DashboardIcon, LeafIcon } from "@/components/icons";

const navItems = [
  { href: "/", label: "Dashboard", icon: DashboardIcon },
  { href: "/food-listings", label: "Food Listings", icon: BasketIcon },
  { href: "/organizations", label: "Organizations", icon: BuildingIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-gray-100 bg-white md:flex">
      <div className="flex h-16 items-center gap-2.5 border-b border-gray-100 px-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm shadow-emerald-200">
          <LeafIcon className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-gray-900">FoodShare</p>
          <p className="text-xs font-medium text-emerald-600">B2B Platform</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Menu</p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${active ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="m-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 p-4">
        <p className="text-sm font-semibold text-emerald-900">Every meal counts</p>
        <p className="mt-1 text-xs leading-relaxed text-emerald-800/80">
          Surplus food shared today is hunger reduced tomorrow.
        </p>
      </div>
    </aside>
  );
}
