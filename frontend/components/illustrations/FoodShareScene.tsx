import type { CSSProperties } from "react";

// CSS animations on SVG groups need their own box as transform origin.
const floating = (delay: string): CSSProperties => ({ transformBox: "fill-box", transformOrigin: "center", animationDelay: delay });

/** Hero illustration: a shop shares a basket of food that travels to a community home. */
export function FoodShareScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 240" className={className} role="img" aria-label="Bir işletmeden topluluğa giden gıda sepeti">
      <defs>
        <linearGradient id="fs-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#d1fae5" />
          <stop offset="1" stopColor="#ecfdf5" />
        </linearGradient>
        <linearGradient id="fs-basket" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>

      <ellipse cx="180" cy="128" rx="172" ry="104" fill="url(#fs-sky)" />
      <circle cx="292" cy="54" r="18" fill="#fde68a" opacity="0.9" />
      <path d="M20 206h320" stroke="#a7f3d0" strokeWidth="3" strokeLinecap="round" />

      {/* Shop */}
      <g>
        <rect x="34" y="122" width="78" height="84" rx="4" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
        <path d="M28 106h90l-4 18H32Z" fill="#10b981" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={36 + i * 16} y="106" width="8" height="18" fill="#ffffff" opacity="0.85" />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={36 + i * 15.6} cy="124" r="7.8" fill={i % 2 ? "#ffffff" : "#10b981"} />
        ))}
        <rect x="46" y="146" width="24" height="20" rx="2" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
        <rect x="80" y="150" width="20" height="56" rx="2" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <circle cx="95" cy="179" r="1.8" fill="#10b981" />
      </g>

      {/* Community home */}
      <g>
        <path d="M252 140l44-36 44 36" fill="#0d9488" />
        <rect x="260" y="138" width="72" height="68" rx="4" fill="#ffffff" stroke="#0d9488" strokeWidth="2.5" />
        <rect x="286" y="168" width="20" height="38" rx="2" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
        <rect x="268" y="150" width="14" height="14" rx="2" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
        <rect x="310" y="150" width="14" height="14" rx="2" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
        <g className="animate-float" style={floating("0.6s")}>
          <path
            d="M296 92c-6-9-20-5-17 6 2 6 10 11 17 16 7-5 15-10 17-16 3-11-11-15-17-6Z"
            fill="#fb7185"
          />
        </g>
      </g>

      {/* Route from shop to home */}
      <path
        d="M114 186C160 232 216 232 258 186"
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 14"
        className="animate-dash"
      />

      {/* Basket of food */}
      <g className="animate-float" style={floating("0s")}>
        <ellipse cx="184" cy="176" rx="34" ry="5" fill="#065f46" opacity="0.12" />
        <ellipse cx="166" cy="116" rx="20" ry="11" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        <path d="M156 112l4 7M165 110l4 7M174 111l4 7" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
        <rect x="186" y="92" width="14" height="34" rx="5" fill="#7dd3fc" stroke="#0284c7" strokeWidth="2" />
        <rect x="189" y="86" width="8" height="8" rx="2" fill="#0284c7" />
        <circle cx="210" cy="118" r="11" fill="#f87171" stroke="#dc2626" strokeWidth="2" />
        <path d="M210 107c1-4 4-6 7-6" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M150 124h68l-8 40a6 6 0 0 1-6 5h-40a6 6 0 0 1-6-5Z" fill="url(#fs-basket)" />
        <path d="M158 138h52M162 152h44" stroke="#92400e" strokeWidth="2" opacity="0.35" />
        <path d="M168 126v40M184 126v42M200 126v40" stroke="#92400e" strokeWidth="2" opacity="0.25" />
        <path d="M146 124h76" stroke="#b45309" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* Leaves */}
      <g className="animate-float-slow" style={floating("1.2s")}>
        <path d="M60 60c10-14 28-14 34-12-4 12-18 24-34 12Z" fill="#34d399" />
        <path d="M62 60c10-4 18-8 30-11" stroke="#047857" strokeWidth="1.5" fill="none" />
      </g>
      <g className="animate-float-slow" style={floating("2.4s")}>
        <path d="M222 44c6-10 18-10 22-8-3 8-12 16-22 8Z" fill="#6ee7b7" />
      </g>
      <g className="animate-float" style={floating("3s")}>
        <circle cx="132" cy="70" r="4" fill="#fbbf24" />
        <circle cx="244" cy="96" r="3" fill="#34d399" />
      </g>
    </svg>
  );
}

/** Small empty-plate illustration for empty lists. */
export function EmptyPlate({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      <ellipse cx="60" cy="44" rx="34" ry="26" fill="#f3f4f6" />
      <ellipse cx="60" cy="44" rx="22" ry="16" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2" />
      <path d="M16 22v14M12 22v8a4 4 0 0 0 8 0v-8M16 36v26" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M104 22c-5 4-5 14 0 16v24" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M54 42c3 3 9 3 12 0" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Sprout used in the sidebar card. */
export function Sprout({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M32 58V30" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
      <g className="animate-float-slow" style={floating("0s")}>
        <path d="M32 34C30 20 18 14 8 16c0 12 10 20 24 18Z" fill="#34d399" />
        <path d="M32 30C34 14 46 8 56 10c0 14-12 22-24 20Z" fill="#10b981" />
      </g>
      <ellipse cx="32" cy="58" rx="16" ry="4" fill="#a7f3d0" />
    </svg>
  );
}
