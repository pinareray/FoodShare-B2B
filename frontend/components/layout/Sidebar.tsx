"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BasketIcon, BuildingIcon, DashboardIcon, LeafIcon } from "@/components/icons";
import { Sprout } from "@/components/illustrations/FoodShareScene";

export const navItems = [
  { href: "/", label: "Genel Bakış", icon: DashboardIcon },
  { href: "/food-listings", label: "Gıda İlanları", icon: BasketIcon },
  { href: "/organizations", label: "Kurumlar", icon: BuildingIcon },
];

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-gray-100 bg-white md:flex">
      <div className="flex h-16 items-center gap-2.5 border-b border-gray-100 px-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-sm shadow-emerald-200 transition-transform duration-500 hover:rotate-12">
          <LeafIcon className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-gray-900">FoodShare</p>
          <p className="text-xs font-medium text-emerald-600">B2B Platformu</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Menü</p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActivePath(pathname, href);
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

      <div className="relative m-4 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 p-4">
        <Sprout className="absolute -right-1 -top-1 h-14 w-14 opacity-90" />
        <p className="text-sm font-semibold text-emerald-900">Her öğün değerli</p>
        <p className="mt-1 text-xs leading-relaxed text-emerald-800/80">
          Bugün paylaşılan fazla gıda,
          <br />
          yarın azalan açlık demek.
        </p>
      </div>
    </aside>
  );
}
