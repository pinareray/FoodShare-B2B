import type { FoodCategory } from "./types";

const categoryLabels: Record<FoodCategory, string> = {
  Bakery: "Bakery",
  Produce: "Produce",
  Dairy: "Dairy",
  PreparedMeals: "Prepared Meals",
  Packaged: "Packaged",
  Beverages: "Beverages",
  Other: "Other",
};

export function formatCategory(category: FoodCategory) {
  return categoryLabels[category] ?? category;
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(iso: string) {
  return dateFormatter.format(new Date(iso));
}
