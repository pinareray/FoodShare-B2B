import type { Donation, Organization } from "./types";

// Shown when the API is unreachable. IDs match the seed data in the backend EF configurations.
export const demoOrganizations: Organization[] = [
  { id: "3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a01", name: "Yeşil Yaprak Fırını", type: "Donor", email: "iletisim@yesilyaprak.example", city: "İstanbul", donationCount: 2, totalQuantity: 85 },
  { id: "3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a02", name: "TazePazar Market", type: "Donor", email: "sosyal@tazepazar.example", city: "Ankara", donationCount: 3, totalQuantity: 205 },
  { id: "3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a04", name: "Lezzet Durağı Restoran", type: "Donor", email: "info@lezzetduragi.example", city: "İzmir", donationCount: 1, totalQuantity: 30 },
  { id: "3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a03", name: "Umut Gıda Bankası", type: "Recipient", email: "merhaba@umutgidabankasi.example", city: "İstanbul", donationCount: 2, totalQuantity: 180 },
  { id: "3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a05", name: "Kardeşlik Aşevi", type: "Recipient", email: "destek@kardeslikasevi.example", city: "Ankara", donationCount: 1, totalQuantity: 30 },
  { id: "3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a06", name: "Gülümse Çocuk Derneği", type: "Recipient", email: "bilgi@gulumsedernegi.example", city: "İzmir", donationCount: 1, totalQuantity: 45 },
];

const org = (id: string) => demoOrganizations.find((o) => o.id.endsWith(id))!;

function demo(
  n: number,
  title: string,
  category: Donation["category"],
  quantity: number,
  donor: string,
  status: Donation["status"] = "Pending",
  recipient?: string,
): Donation {
  const createdAt = new Date(Date.UTC(2026, 0, 1, 9 + n)).toISOString();
  return {
    id: `demo-${n}`,
    title,
    category,
    quantity,
    status,
    organizationId: org(donor).id,
    organizationName: org(donor).name,
    createdAt,
    expiresAt: null,
    recipientOrganizationId: recipient ? org(recipient).id : null,
    recipientOrganizationName: recipient ? org(recipient).name : null,
    reservedAt: recipient ? createdAt : null,
    collectedAt: status === "Collected" ? createdAt : null,
  };
}

export const demoDonations: Donation[] = [
  demo(7, "Meyve suyu kolileri", "Beverages", 80, "02"),
  demo(6, "Mevsim sebzeleri kasası", "Produce", 25, "02"),
  demo(5, "Taze ekşi maya ekmek", "Bakery", 40, "01"),
  demo(4, "Yoğurt ve peynir çeşitleri", "Dairy", 60, "02", "Reserved", "03"),
  demo(3, "Simit ve poğaça", "Bakery", 45, "01", "Collected", "06"),
  demo(2, "Hazır öğle yemeği paketleri", "PreparedMeals", 30, "04", "Collected", "05"),
  demo(1, "Paketli makarna ve pirinç", "Packaged", 120, "02", "Collected", "03"),
];
