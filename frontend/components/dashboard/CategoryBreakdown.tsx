import type { CSSProperties } from "react";
import { formatCategory, formatNumber } from "@/lib/format";
import type { Donation, FoodCategory } from "@/lib/types";
import { categoryStyles } from "./categoryStyles";

export function CategoryBreakdown({ donations }: { donations: Donation[] }) {
  const totals = new Map<FoodCategory, number>();
  for (const d of donations) {
    if (d.status === "Cancelled") continue;
    totals.set(d.category, (totals.get(d.category) ?? 0) + d.quantity);
  }
  const rows = [...totals.entries()].sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...rows.map(([, v]) => v));
  const total = rows.reduce((sum, [, v]) => sum + v, 0);

  return (
    <section className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
      <h2 className="text-base font-semibold text-gray-900">Kategori dağılımı</h2>
      <p className="mt-0.5 text-sm text-gray-500">Toplam {formatNumber(total)} adet bağışlanan gıda</p>

      <ul className="mt-5 space-y-3">
        {rows.map(([category, value], i) => {
          const { icon: Icon, bar, chip } = categoryStyles[category];
          return (
            <li key={category} className="flex items-center gap-3">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${chip}`}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate text-gray-700">{formatCategory(category)}</span>
                  <span className="font-semibold tabular-nums text-gray-900">{formatNumber(value)}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`origin-left-bar h-full animate-grow-x rounded-full ${bar}`}
                    style={{ width: `${(value / max) * 100}%`, "--delay": `${200 + i * 90}ms` } as CSSProperties}
                  />
                </div>
              </div>
            </li>
          );
        })}
        {rows.length === 0 && <li className="py-6 text-center text-sm text-gray-400">Henüz veri yok.</li>}
      </ul>
    </section>
  );
}
