import type { CSSProperties } from "react";
import { CloudIcon, HandHeartIcon, ScaleIcon, UsersIcon } from "@/components/icons";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { CO2E_PER_KG, KG_PER_UNIT, type ImpactSummary } from "@/lib/impact";
import { formatNumber } from "@/lib/format";

export function ImpactPanel({ impact }: { impact: ImpactSummary }) {
  const metrics = [
    { label: "Kurtarılan porsiyon", value: impact.mealsRescued, unit: "", icon: HandHeartIcon },
    { label: "İsraftan kurtarılan gıda", value: impact.foodKg, unit: "kg", icon: ScaleIcon },
    { label: "Önlenen emisyon", value: impact.co2Kg, unit: "kg CO₂e", icon: CloudIcon },
    { label: "Destek alan kurum", value: impact.recipientsServed, unit: "", icon: UsersIcon },
  ];
  const successPercent = Math.round(impact.successRate * 100);

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 p-6 text-white shadow-lg shadow-emerald-200/60">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 animate-float-slow rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 animate-float rounded-full bg-white/5" />
      <span className="pointer-events-none absolute right-8 top-6 animate-float text-3xl opacity-80" aria-hidden="true">
        🍃
      </span>

      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-100">Sosyal etki</p>
        <h2 className="mt-1 text-xl font-bold">Birlikte israfı ihtiyaca dönüştürüyoruz</h2>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {metrics.map(({ label, value, unit, icon: Icon }, i) => (
            <div
              key={label}
              className="animate-fade-up rounded-xl bg-white/10 p-4 ring-1 ring-inset ring-white/15 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/15"
              style={{ "--delay": `${300 + i * 100}ms` } as CSSProperties}
            >
              <Icon className="h-5 w-5 text-emerald-100" />
              <p className="mt-3 text-2xl font-bold tracking-tight">
                <AnimatedNumber value={value} />
                {unit && <span className="ml-1 text-sm font-semibold text-emerald-50/90">{unit}</span>}
              </p>
              <p className="mt-0.5 text-xs text-emerald-50/90">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-emerald-50">
            <span>Alıcıya ulaşan bağış oranı</span>
            <span className="font-semibold">%{successPercent}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="origin-left-bar h-full animate-grow-x rounded-full bg-white transition-[width] duration-700"
              style={{ width: `${successPercent}%`, "--delay": "500ms" } as CSSProperties}
            />
          </div>
          <p className="mt-3 text-[11px] text-emerald-50/80">
            Tahmini değerler: 1 porsiyon ≈ {formatNumber(KG_PER_UNIT, 1)} kg gıda, 1 kg gıda israfı ≈{" "}
            {formatNumber(CO2E_PER_KG, 1)} kg CO₂e. Rezerve edilip yolda olan: {formatNumber(impact.inTransit)} adet.
          </p>
        </div>
      </div>
    </section>
  );
}
