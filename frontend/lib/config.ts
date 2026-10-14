export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5038").replace(/\/$/, "");

export const DONATION_HUB_URL = `${API_BASE_URL}/hubs/donations`;
