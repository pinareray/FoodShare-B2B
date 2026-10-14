"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSignalR, type ConnectionStatus } from "@/hooks/useSignalR";
import { DONATION_HUB_URL } from "@/lib/config";
import { formatCategory } from "@/lib/format";
import type { Donation } from "@/lib/types";

interface RealtimeContextValue {
  status: ConnectionStatus;
  /** Donations pushed by the hub during this session, newest first. */
  liveDonations: Donation[];
  unreadCount: number;
  markAllAsRead: () => void;
}

const RealtimeContext = createContext<RealtimeContextValue | null>(null);

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const [liveDonations, setLiveDonations] = useState<Donation[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const status = useSignalR(DONATION_HUB_URL, {
    ReceiveNewDonation: (donation: Donation) => {
      setLiveDonations((prev) => [donation, ...prev.filter((d) => d.id !== donation.id)]);
      setUnreadCount((count) => count + 1);

      toast.success(
        <div className="text-sm">
          <p className="font-semibold text-gray-900">New donation received</p>
          <p className="text-gray-600">
            {donation.title} · {donation.quantity} units ({formatCategory(donation.category)})
          </p>
          <p className="text-xs text-gray-400">from {donation.organizationName}</p>
        </div>,
        { id: donation.id },
      );
    },
  });

  const markAllAsRead = useCallback(() => setUnreadCount(0), []);

  const value = useMemo(
    () => ({ status, liveDonations, unreadCount, markAllAsRead }),
    [status, liveDonations, unreadCount, markAllAsRead],
  );

  return (
    <RealtimeContext.Provider value={value}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            borderRadius: "0.75rem",
            border: "1px solid #d1fae5",
            boxShadow: "0 10px 25px -5px rgb(16 185 129 / 0.15)",
          },
          success: { iconTheme: { primary: "#10b981", secondary: "#ffffff" } },
        }}
      />
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  const context = useContext(RealtimeContext);
  if (!context) throw new Error("useRealtime must be used within a RealtimeProvider");
  return context;
}
