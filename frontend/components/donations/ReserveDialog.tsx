"use client";

import { useState } from "react";
import { Dialog, inputClass, primaryButtonClass, secondaryButtonClass } from "@/components/ui/Dialog";
import { useOrganizations } from "@/hooks/useOrganizations";
import type { Donation } from "@/lib/types";

interface ReserveDialogProps {
  donation: Donation | null;
  busy: boolean;
  onClose: () => void;
  onConfirm: (recipientId: string) => void;
}

export function ReserveDialog({ donation, busy, onClose, onConfirm }: ReserveDialogProps) {
  const { organizations } = useOrganizations();
  const recipients = organizations.filter((o) => o.type === "Recipient");
  const [recipientId, setRecipientId] = useState("");
  const selected = recipientId || recipients[0]?.id || "";

  return (
    <Dialog
      open={donation !== null}
      onClose={onClose}
      title="Bağışı Rezerve Et"
      description={donation ? `${donation.title} · ${donation.quantity} adet · ${donation.organizationName}` : undefined}
    >
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-gray-700">Teslim alacak kurum</span>
        <select value={selected} onChange={(e) => setRecipientId(e.target.value)} className={inputClass}>
          {recipients.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name} · {o.city}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={onClose} className={secondaryButtonClass}>
          Vazgeç
        </button>
        <button
          type="button"
          disabled={busy || !selected}
          onClick={() => onConfirm(selected)}
          className={primaryButtonClass}
        >
          {busy ? "Kaydediliyor..." : "Rezerve Et"}
        </button>
      </div>
    </Dialog>
  );
}
