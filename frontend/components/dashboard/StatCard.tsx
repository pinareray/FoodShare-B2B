import type { ComponentType, CSSProperties, SVGProps } from "react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

interface StatCardProps {
  label: string;
  value: number;
  hint: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  accent?: "emerald" | "green" | "teal" | "gray";
  /** Entrance animation delay in ms, for staggering a row of cards. */
  delay?: number;
}

const accents = {
  emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500",
  green: "bg-green-50 text-green-600 group-hover:bg-green-500",
  teal: "bg-teal-50 text-teal-600 group-hover:bg-teal-500",
  gray: "bg-gray-100 text-gray-600 group-hover:bg-gray-700",
};

export function StatCard({ label, value, hint, icon: Icon, accent = "emerald", delay = 0 }: StatCardProps) {
  return (
    <div
      className="group animate-fade-up rounded-2xl border border-gray-100 bg-white p-5 shadow-sm shadow-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-100/60"
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            <AnimatedNumber value={value} />
          </p>
        </div>
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 group-hover:text-white ${accents[accent]}`}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-xs text-gray-400">{hint}</p>
    </div>
  );
}
