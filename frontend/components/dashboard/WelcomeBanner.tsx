import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { FoodShareScene } from "@/components/illustrations/FoodShareScene";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

interface WelcomeBannerProps {
  pendingCount: number;
  pendingUnits: number;
  action: ReactNode;
  badge?: ReactNode;
}

export function WelcomeBanner({ pendingCount, pendingUnits, action, badge }: WelcomeBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/60 to-teal-50 shadow-sm shadow-emerald-100">
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/3 h-56 w-56 rounded-full bg-teal-200/30 blur-3xl" />

      <div className="relative grid items-center gap-6 p-6 sm:p-8 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
              🌱 Sürdürülebilir Gıda · SKA 2 &amp; SKA 12
            </span>
            {badge}
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
            Fazla gıdayı <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">israf etmeyin</span>,
            <br className="hidden sm:block" /> ihtiyaç sahibine ulaştırın.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600">
            Şu anda{" "}
            <strong className="font-semibold text-gray-900">
              <AnimatedNumber value={pendingCount} /> ilan
            </strong>{" "}
            ve{" "}
            <strong className="font-semibold text-gray-900">
              <AnimatedNumber value={pendingUnits} /> adet gıda
            </strong>{" "}
            bir kurumun rezerve etmesini bekliyor. Yeni bağışlar ağdaki herkese anında bildirilir.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {action}
            <Link
              href="/food-listings"
              className="group inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-white/80"
            >
              İlanları incele
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <FoodShareScene className="mx-auto w-full max-w-md" />
      </div>
    </section>
  );
}
