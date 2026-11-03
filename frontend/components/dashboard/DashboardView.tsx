"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BasketIcon, CheckIcon, PackageIcon, PlusIcon, UsersIcon } from "@/components/icons";
import { NewDonationDialog } from "@/components/donations/NewDonationDialog";
import { useRealtime } from "@/components/providers/RealtimeProvider";
import { primaryButtonClass } from "@/components/ui/Dialog";
import { useDonations } from "@/hooks/useDonations";
import { calculateImpact } from "@/lib/impact";
import { CategoryBreakdown } from "./CategoryBreakdown";
import { DonationsTable } from "./DonationsTable";
import { HowItWorks } from "./HowItWorks";
import { ImpactPanel } from "./ImpactPanel";
import { StatCard } from "./StatCard";
import { WelcomeBanner } from "./WelcomeBanner";

export function DashboardView() {
  const { donations, source } = useDonations();
  const { liveDonations } = useRealtime();
  const [dialogOpen, setDialogOpen] = useState(false);

  const pending = useMemo(() => donations.filter((d) => d.status === "Pending"), [donations]);
  const active = useMemo(() => donations.filter((d) => d.status === "Pending" || d.status === "Reserved"), [donations]);
  const impact = useMemo(() => calculateImpact(donations), [donations]);
  const liveIds = useMemo(() => new Set(liveDonations.map((d) => d.id)), [liveDonations]);

  const stats = useMemo(
    () => ({
      pendingUnits: pending.reduce((sum, d) => sum + d.quantity, 0),
      donors: new Set(active.map((d) => d.organizationId)).size,
      collected: donations.filter((d) => d.status === "Collected").length,
    }),
    [pending, active, donations],
  );

  return (
    <div className="space-y-8">
      <WelcomeBanner
        pendingCount={pending.length}
        pendingUnits={stats.pendingUnits}
        badge={
          source === "demo" && (
            <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
              API’ye ulaşılamadı — demo veri
            </span>
          )
        }
        action={
          <button
            type="button"
            onClick={() => setDialogOpen(true)}
            disabled={source !== "api"}
            title={source !== "api" ? "Bağış eklemek için backend API’yi başlatın" : undefined}
            className={`${primaryButtonClass} transition-transform hover:-translate-y-0.5`}
          >
            <PlusIcon className="h-4 w-4" />
            Yeni Bağış
          </button>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Bekleyen Bağış"
          delay={100}
          value={pending.length}
          hint="Bir kurumun rezerve etmesini bekliyor"
          icon={BasketIcon}
          accent="emerald"
        />
        <StatCard
          label="Dağıtıma Hazır Gıda"
          delay={180}
          value={stats.pendingUnits}
          hint="Bekleyen bağışlardaki toplam adet"
          icon={PackageIcon}
          accent="green"
        />
        <StatCard
          label="Aktif Bağışçı"
          delay={260}
          value={stats.donors}
          hint="Açık bağışı olan işletme"
          icon={UsersIcon}
          accent="teal"
        />
        <StatCard
          label="Tamamlanan Teslimat"
          delay={340}
          value={stats.collected}
          hint="Alıcı kuruma ulaşan bağış"
          icon={CheckIcon}
          accent="gray"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ImpactPanel impact={impact} />
        </div>
        <CategoryBreakdown donations={donations} />
      </div>

      <HowItWorks />

      <DonationsTable
        title="Güncel Bağışlar"
        description="Bekleyen ve rezerve edilen bağışlar, en yeniden eskiye. Canlı gelenler vurgulanır."
        donations={active.slice(0, 6)}
        loading={source === "loading"}
        highlightIds={liveIds}
        actions={
          <Link
            href="/food-listings"
            className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Tümünü gör →
          </Link>
        }
      />

      <NewDonationDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
