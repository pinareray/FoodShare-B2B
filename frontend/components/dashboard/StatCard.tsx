import type { ComponentType, SVGProps } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  hint: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  accent?: "emerald" | "green" | "teal" | "gray";
}

const accents = {
  emerald: "bg-emerald-50 text-emerald-600",
  green: "bg-green-50 text-green-600",
  teal: "bg-teal-50 text-teal-600",
  gray: "bg-gray-100 text-gray-600",
};

export function StatCard({ label, value, hint, icon: Icon, accent = "emerald" }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm shadow-gray-100 transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">{value}</p>
        </div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${accents[accent]}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-xs text-gray-400">{hint}</p>
    </div>
  );
}
