import type { CSSProperties } from "react";
import { BellIcon, HandHeartIcon, StoreIcon } from "@/components/icons";

const steps = [
  {
    icon: StoreIcon,
    title: "İşletme ilan açar",
    text: "Fırın, market veya restoran gün sonunda kalan gıdayı miktar ve son tüketim zamanıyla paylaşır.",
    accent: "from-emerald-500 to-green-500",
  },
  {
    icon: BellIcon,
    title: "Kurum anında haberdar olur",
    text: "SignalR ile tüm alıcı kurumlara gerçek zamanlı bildirim gider; ilk uygun kurum bağışı rezerve eder.",
    accent: "from-teal-500 to-cyan-500",
  },
  {
    icon: HandHeartIcon,
    title: "Gıda sahibine ulaşır",
    text: "Teslim alındığında kurtarılan porsiyon, önlenen israf ve CO₂ etkisi panelde otomatik güncellenir.",
    accent: "from-sky-500 to-indigo-500",
  },
];

export function HowItWorks() {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Nasıl çalışır?</h2>
          <p className="mt-0.5 text-sm text-gray-500">Üç adımda israftan ihtiyaca.</p>
        </div>
      </div>

      <ol className="relative mt-6 grid gap-6 md:grid-cols-3">
        <svg
          className="pointer-events-none absolute left-[16%] right-[16%] top-7 hidden h-2 w-[68%] md:block"
          preserveAspectRatio="none"
          viewBox="0 0 100 2"
          aria-hidden="true"
        >
          <line
            x1="0"
            y1="1"
            x2="100"
            y2="1"
            stroke="#a7f3d0"
            strokeWidth="2"
            strokeDasharray="2 6"
            vectorEffect="non-scaling-stroke"
            className="animate-dash"
          />
        </svg>

        {steps.map(({ icon: Icon, title, text, accent }, i) => (
          <li
            key={title}
            className="group relative flex flex-col items-center text-center animate-fade-up"
            style={{ "--delay": `${200 + i * 150}ms` } as CSSProperties}
          >
            <span
              className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg shadow-emerald-200/60 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3`}
            >
              <Icon className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-gray-700 shadow ring-1 ring-gray-100">
                {i + 1}
              </span>
            </span>
            <h3 className="mt-4 text-sm font-semibold text-gray-900">{title}</h3>
            <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-gray-500">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
