import type { Donation } from "./types";

/**
 * Rough conversion factors used for the social-impact panel.
 * One donated unit is treated as one meal portion of ~0.4 kg; avoided food waste
 * is estimated at ~2.5 kg CO₂e per kg (FAO food-wastage footprint order of magnitude).
 */
export const KG_PER_UNIT = 0.4;
export const CO2E_PER_KG = 2.5;

export interface ImpactSummary {
  mealsRescued: number;
  foodKg: number;
  co2Kg: number;
  /** Units reserved and on their way to a recipient. */
  inTransit: number;
  /** Share of non-cancelled donations that reached a recipient (0–1). */
  successRate: number;
  recipientsServed: number;
}

export function calculateImpact(donations: Donation[]): ImpactSummary {
  const collected = donations.filter((d) => d.status === "Collected");
  const mealsRescued = collected.reduce((sum, d) => sum + d.quantity, 0);
  const foodKg = mealsRescued * KG_PER_UNIT;
  const settled = donations.filter((d) => d.status !== "Cancelled");

  return {
    mealsRescued,
    foodKg,
    co2Kg: foodKg * CO2E_PER_KG,
    inTransit: donations.filter((d) => d.status === "Reserved").reduce((sum, d) => sum + d.quantity, 0),
    successRate: settled.length === 0 ? 0 : collected.length / settled.length,
    recipientsServed: new Set(collected.map((d) => d.recipientOrganizationId)).size,
  };
}
