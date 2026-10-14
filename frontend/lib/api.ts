import { API_BASE_URL } from "./config";
import type { CreateDonationRequest, Donation } from "./types";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!response.ok) {
    const problem = await response.json().catch(() => null);
    throw new Error(problem?.detail ?? problem?.title ?? `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getPendingDonations(signal?: AbortSignal) {
  return request<Donation[]>("/api/donations/pending", { signal });
}

export function createDonation(body: CreateDonationRequest) {
  return request<Donation>("/api/donations", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
