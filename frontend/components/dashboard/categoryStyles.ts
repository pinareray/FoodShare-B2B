import type { ComponentType, SVGProps } from "react";
import { AppleIcon, BasketIcon, BowlIcon, BreadIcon, CupIcon, MilkIcon, PackageIcon } from "@/components/icons";
import type { FoodCategory } from "@/lib/types";

interface CategoryStyle {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Solid colour for dots and bars. */
  bar: string;
  /** Soft background + text colour for icon chips. */
  chip: string;
}

export const categoryStyles: Record<FoodCategory, CategoryStyle> = {
  Bakery: { icon: BreadIcon, bar: "bg-amber-400", chip: "bg-amber-50 text-amber-600" },
  Produce: { icon: AppleIcon, bar: "bg-green-500", chip: "bg-green-50 text-green-600" },
  Dairy: { icon: MilkIcon, bar: "bg-sky-400", chip: "bg-sky-50 text-sky-600" },
  PreparedMeals: { icon: BowlIcon, bar: "bg-orange-400", chip: "bg-orange-50 text-orange-600" },
  Packaged: { icon: PackageIcon, bar: "bg-violet-400", chip: "bg-violet-50 text-violet-600" },
  Beverages: { icon: CupIcon, bar: "bg-cyan-400", chip: "bg-cyan-50 text-cyan-600" },
  Other: { icon: BasketIcon, bar: "bg-gray-400", chip: "bg-gray-100 text-gray-600" },
};
