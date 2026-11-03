"use client";

import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Dialog, inputClass, primaryButtonClass, secondaryButtonClass } from "@/components/ui/Dialog";
import { donationToastId, useRealtime } from "@/components/providers/RealtimeProvider";
import { useOrganizations } from "@/hooks/useOrganizations";
import { createDonation } from "@/lib/api";
import { categoryLabels } from "@/lib/format";
import type { FoodCategory } from "@/lib/types";

interface NewDonationDialogProps {
  open: boolean;
  onClose: () => void;
}

const categories = Object.entries(categoryLabels) as [FoodCategory, string][];

export function NewDonationDialog({ open, onClose }: NewDonationDialogProps) {
  const { organizations } = useOrganizations();
  const { applyDonation } = useRealtime();
  const donors = organizations.filter((o) => o.type === "Donor");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<FoodCategory>("Bakery");
  const [quantity, setQuantity] = useState("10");
  const [donorId, setDonorId] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const donation = await createDonation({
        title,
        category,
        quantity: Number(quantity),
        organizationId: donorId || donors[0]?.id,
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
      });
      applyDonation(donation);
      toast.success(`"${donation.title}" ilana açıldı`, { id: donationToastId(donation) });
      setTitle("");
      setExpiresAt("");
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Bağış oluşturulamadı");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Yeni Gıda Bağışı"
      description="Fazla gıdanızı ilana açın; ağdaki tüm alıcı kurumlara anında bildirilir."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-gray-700">Ürün adı</span>
          <input
            required
            maxLength={200}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Örn. Günlük ekmek ve simit"
            className={inputClass}
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">Kategori</span>
            <select value={category} onChange={(e) => setCategory(e.target.value as FoodCategory)} className={inputClass}>
              {categories.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">Miktar (adet / porsiyon)</span>
            <input
              required
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-gray-700">Bağışçı işletme</span>
          <select value={donorId || donors[0]?.id || ""} onChange={(e) => setDonorId(e.target.value)} className={inputClass}>
            {donors.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name} · {o.city}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-gray-700">
            Son tüketim zamanı <span className="font-normal text-gray-400">(isteğe bağlı)</span>
          </span>
          <input
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className={inputClass}
          />
        </label>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className={secondaryButtonClass}>
            Vazgeç
          </button>
          <button type="submit" disabled={submitting || donors.length === 0} className={primaryButtonClass}>
            {submitting ? "Kaydediliyor..." : "İlana Aç"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
