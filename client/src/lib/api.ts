import { API_URL } from "@/config/api";
import { getToken } from "./authStorage";

export class ApiError extends Error {
  status: number;
  details?: unknown;
  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

function resolveApiBase(): string {
  let base = (API_URL || "").replace(/\/$/, "");
  if (
    typeof window !== "undefined" &&
    process.env.NODE_ENV === "production" &&
    base.startsWith("http://") &&
    !/localhost|127\.0\.0\.1/i.test(base)
  ) {
    base = `https://${base.slice("http://".length)}`;
  }
  return base;
}

function headersWithAuth(token: string | null) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export async function apiFetch<T = unknown>(
  endpoint: string,
  options?: {
    method?: string;
    body?: any;
    token?: string | null;
    headers?: Record<string, string>;
  }
): Promise<T> {
  console.log("API:", API_URL);

  const token = options?.token ?? getToken();
  const base = resolveApiBase();
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${base}${path}`;

  const headers: Record<string, string> = {
    ...headersWithAuth(token),
    ...(options?.headers || {}),
  };

  const fetchOptions: RequestInit = {
    method: options?.method || "GET",
    headers,
  };

  if (options?.body !== undefined) {
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
      fetchOptions.body = JSON.stringify(options.body);
    } else {
      delete headers["Content-Type"];
      fetchOptions.body = options.body;
    }
  }

  let res: Response;
  try {
    res = await fetch(url, fetchOptions);
  } catch (err) {
    console.error(err);
    throw err;
  }

  let text: string;
  try {
    text = await res.text();
  } catch (err) {
    console.error(err);
    throw err;
  }

  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (err) {
    console.error(err);
    throw err;
  }

  if (!res.ok) {
    const message =
      (data as { message?: string } | null)?.message ||
      `Request failed with status ${res.status}`;
    throw new ApiError(res.status, message, data);
  }

  return data as T;
}
