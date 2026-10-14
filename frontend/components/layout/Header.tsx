"use client";

import { useEffect, useRef, useState } from "react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@/components/icons";
import { useRealtime } from "@/components/providers/RealtimeProvider";
import type { ConnectionStatus } from "@/hooks/useSignalR";
import { formatDate } from "@/lib/format";

const statusStyles: Record<ConnectionStatus, { label: string; dot: string; text: string }> = {
  connected: { label: "Live", dot: "bg-emerald-500", text: "text-emerald-700" },
  connecting: { label: "Connecting", dot: "bg-amber-400", text: "text-amber-700" },
  reconnecting: { label: "Reconnecting", dot: "bg-amber-400", text: "text-amber-700" },
  disconnected: { label: "Offline", dot: "bg-gray-400", text: "text-gray-500" },
};

export function Header() {
  const { status, liveDonations, unreadCount, markAllAsRead } = useRealtime();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const statusStyle = statusStyles[status];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const toggleNotifications = () => {
    setOpen((prev) => !prev);
    if (!open) markAllAsRead();
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-gray-100 bg-white/90 px-6 backdrop-blur">
      <div className="relative hidden w-full max-w-sm sm:block">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          placeholder="Search donations, organizations..."
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <span
          className={`hidden items-center gap-1.5 rounded-full border border-gray-100 bg-white px-2.5 py-1 text-xs font-medium sm:inline-flex ${statusStyle.text}`}
          title="Real-time connection status"
        >
          <span className="relative flex h-2 w-2">
            {status === "connected" && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            )}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${statusStyle.dot}`} />
          </span>
          {statusStyle.label}
        </span>

        <div className="relative" ref={panelRef}>
          <button
            type="button"
            onClick={toggleNotifications}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
            aria-label="Notifications"
          >
            <BellIcon className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60">
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">Notifications</p>
              </div>
              {liveDonations.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-gray-400">No new donations yet.</p>
              ) : (
                <ul className="max-h-80 divide-y divide-gray-50 overflow-y-auto">
                  {liveDonations.slice(0, 8).map((d) => (
                    <li key={d.id} className="px-4 py-3 hover:bg-gray-50">
                      <p className="text-sm font-medium text-gray-800">{d.title}</p>
                      <p className="text-xs text-gray-500">
                        {d.quantity} units · {d.organizationName} · {formatDate(d.createdAt)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="mx-1 h-8 w-px bg-gray-100" />

        <button type="button" className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-gray-50">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
            SK
          </span>
          <span className="hidden text-left leading-tight lg:block">
            <span className="block text-sm font-semibold text-gray-800">Selin Kaya</span>
            <span className="block text-xs text-gray-500">Operations Manager</span>
          </span>
          <ChevronDownIcon className="hidden h-4 w-4 text-gray-400 lg:block" />
        </button>
      </div>
    </header>
  );
}
