const FALLBACK_API_URL = "https://universe-production-74d9.up.railway.app/api";

const resolved =
  process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim().length > 0
    ? process.env.NEXT_PUBLIC_API_URL
    : FALLBACK_API_URL;

export const API_URL = resolved.replace(/\/$/, "");
