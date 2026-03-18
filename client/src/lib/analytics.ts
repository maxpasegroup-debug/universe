import { apiFetch } from "./api";

export async function logAnalytics(action: string) {
  try {
    await apiFetch(`/analytics/log`, {
      method: "POST",
      body: { action },
    });
  } catch {
    // Analytics should never block UX.
  }
}

