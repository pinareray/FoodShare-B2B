"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSignalR, type ConnectionStatus } from "@/hooks/useSignalR";
import { DONATION_HUB_URL } from "@/lib/config";
import { formatCategory, formatStatus } from "@/lib/format";
import type { Donation } from "@/lib/types";

interface RealtimeContextValue {
  status: ConnectionStatus;
  /** Donations created during this session (pushed by the hub), newest first. */
  liveDonations: Donation[];
  /** Latest known state of every donation changed during this session, by id. */
  donationUpdates: Record<string, Donation>;
  /** Applies a donation returned by the API immediately, without waiting for the hub. */
  applyDonation: (donation: Donation) => void;
  unreadCount: number;
  markAllAsRead: () => void;
}

const RealtimeContext = createContext<RealtimeContextValue | null>(null);

/** Toast id per donation state, so a local API result and its hub echo show a single toast. */
export const donationToastId = (donation: Donation) => `${donation.id}:${donation.status}`;

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const [liveDonations, setLiveDonations] = useState<Donation[]>([]);
  const [donationUpdates, setDonationUpdates] = useState<Record<string, Donation>>({});
  const [unreadCount, setUnreadCount] = useState(0);

  const applyDonation = useCallback((donation: Donation) => {
    setDonationUpdates((prev) => ({ ...prev, [donation.id]: donation }));
  }, []);

  const status = useSignalR(DONATION_HUB_URL, {
    ReceiveNewDonation: (donation: Donation) => {
      setLiveDonations((prev) => [donation, ...prev.filter((d) => d.id !== donation.id)]);
      setUnreadCount((count) => count + 1);

      toast.success(
        <div className="text-sm">
          <p className="font-semibold text-gray-900">Yeni bağış geldi</p>
          <p className="text-gray-600">
            {donation.title} · {donation.quantity} adet ({formatCategory(donation.category)})
          </p>
          <p className="text-xs text-gray-400">{donation.organizationName}</p>
        </div>,
        { id: donationToastId(donation) },
      );
    },
    ReceiveDonationUpdated: (donation: Donation) => {
      applyDonation(donation);
      toast(
        <div className="text-sm">
          <p className="font-semibold text-gray-900">Bağış durumu: {formatStatus(donation.status)}</p>
          <p className="text-gray-600">
            {donation.title}
            {donation.recipientOrganizationName && ` → ${donation.recipientOrganizationName}`}
          </p>
        </div>,
        { id: donationToastId(donation), icon: "🔄" },
      );
    },
  });

  const markAllAsRead = useCallback(() => setUnreadCount(0), []);

  const value = useMemo(
    () => ({ status, liveDonations, donationUpdates, applyDonation, unreadCount, markAllAsRead }),
    [status, liveDonations, donationUpdates, applyDonation, unreadCount, markAllAsRead],
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
