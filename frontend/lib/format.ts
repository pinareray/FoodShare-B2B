import type { DonationStatus, FoodCategory, OrganizationType } from "./types";

export const categoryLabels: Record<FoodCategory, string> = {
  Bakery: "Fırın Ürünleri",
  Produce: "Meyve & Sebze",
  Dairy: "Süt Ürünleri",
  PreparedMeals: "Hazır Yemek",
  Packaged: "Paketli Gıda",
  Beverages: "İçecek",
  Other: "Diğer",
};

export function formatCategory(category: FoodCategory) {
  return categoryLabels[category] ?? category;
}

export const statusLabels: Record<DonationStatus, string> = {
  Pending: "Bekliyor",
  Reserved: "Rezerve",
  Collected: "Teslim Alındı",
  Cancelled: "İptal",
};

export function formatStatus(status: DonationStatus) {
  return statusLabels[status] ?? status;
}

export const organizationTypeLabels: Record<OrganizationType, string> = {
  Donor: "Bağışçı",
  Recipient: "Alıcı Kurum",
};

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(iso: string) {
  return dateFormatter.format(new Date(iso));
}

export function formatNumber(value: number, maximumFractionDigits = 0) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

/** Human-readable time left until expiry, e.g. "5 saat kaldı". */
export function formatExpiry(iso: string, now = Date.now()) {
  const ms = new Date(iso).getTime() - now;
  if (ms <= 0) return { label: "Süresi doldu", urgent: true };

  const hours = Math.floor(ms / 3_600_000);
  if (hours < 1) return { label: `${Math.max(1, Math.floor(ms / 60_000))} dk kaldı`, urgent: true };
  if (hours < 24) return { label: `${hours} saat kaldı`, urgent: hours < 6 };
  return { label: `${Math.floor(hours / 24)} gün kaldı`, urgent: false };
}
