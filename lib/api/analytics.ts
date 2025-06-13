// lib/api/analytics.ts

export async function fetchAnalytics() {
  const res = await fetch("https://utilitybay-backend.onrender.com/api/analytics");
  if (!res.ok) {
    throw new Error("Failed to fetch analytics");
  }
  return res.json();
}
