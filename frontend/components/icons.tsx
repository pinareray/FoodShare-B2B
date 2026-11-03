import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const DashboardIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </BaseIcon>
);

export const BasketIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M5 10h14l-1.4 9.1a2 2 0 0 1-2 1.9H8.4a2 2 0 0 1-2-1.9L5 10Z" />
    <path d="m9 10 3-6 3 6" />
    <path d="M10 14v3M14 14v3" />
  </BaseIcon>
);

export const BuildingIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
    <path d="M16 9h2a2 2 0 0 1 2 2v10" />
    <path d="M3 21h18M8 7h4M8 11h4M8 15h4" />
  </BaseIcon>
);

export const BellIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </BaseIcon>
);

export const LeafIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z" />
    <path d="M2 21c0-3 1.9-5.4 5.2-6.1 2.5-.5 5-2 6.8-3.9" />
  </BaseIcon>
);

export const PackageIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="m7.5 4.3 9 5.1" />
    <path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z" />
    <path d="M3.3 7 12 12l8.7-5M12 22V12" />
  </BaseIcon>
);

export const UsersIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
  </BaseIcon>
);

export const ActivityIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </BaseIcon>
);

export const SearchIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </BaseIcon>
);

export const PlusIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M12 5v14M5 12h14" />
  </BaseIcon>
);

export const ChevronDownIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="m6 9 6 6 6-6" />
  </BaseIcon>
);

export const XIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M18 6 6 18M6 6l12 12" />
  </BaseIcon>
);

export const CheckIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M20 6 9 17l-5-5" />
  </BaseIcon>
);

export const HandHeartIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
    <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
    <path d="m2 15 6 6" />
    <path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z" />
  </BaseIcon>
);

export const CloudIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </BaseIcon>
);

export const ClockIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </BaseIcon>
);

export const ScaleIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M12 3v18M7 21h10M3 7h18" />
    <path d="m6 7-3 7a3 3 0 0 0 6 0L6 7ZM18 7l-3 7a3 3 0 0 0 6 0l-3-7Z" />
  </BaseIcon>
);

export const BreadIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M5 11a4 4 0 0 1-1-7.5C5.5 2.5 8.5 2 12 2s6.5.5 8 1.5a4 4 0 0 1-1 7.5v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z" />
    <path d="M9 8v3M15 8v3" />
  </BaseIcon>
);

export const AppleIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M12 7c-1.5-1-5-1.5-6.5 1.5S5 16 7 19c1.2 1.8 3 2.5 5 1.5 2 1 3.8.3 5-1.5 2-3 2.5-7.5 1.5-10.5S13.5 6 12 7Z" />
    <path d="M12 7c0-2 1-3.5 3-4" />
  </BaseIcon>
);

export const MilkIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M8 2h8M9 2v3L6 9v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9l-3-4V2" />
    <path d="M6 13h12" />
  </BaseIcon>
);

export const BowlIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M3 11h18a9 9 0 0 1-18 0Z" />
    <path d="M8 7c0-1.5 1-1.5 1-3M12 7c0-1.5 1-1.5 1-3M16 7c0-1.5 1-1.5 1-3" />
  </BaseIcon>
);

export const CupIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M6 3h12l-1.5 17a2 2 0 0 1-2 1.8h-5a2 2 0 0 1-2-1.8Z" />
    <path d="M6.5 9h11" />
  </BaseIcon>
);

export const StoreIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M3 9 4.5 4h15L21 9" />
    <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
    <path d="M5 11v9h14v-9M10 20v-5h4v5" />
  </BaseIcon>
);

export const ArrowRightIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </BaseIcon>
);
