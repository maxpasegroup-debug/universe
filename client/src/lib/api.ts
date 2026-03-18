import { API_URL } from "./apiConfig";
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

function headersWithAuth(token: string | null) {
  const headers: Record<string, string> = {};
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
  const token = options?.token ?? getToken();
  const url = `${API_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
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
      fetchOptions.body = options.body;
    }
  }

  const res = await fetch(url, fetchOptions);
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = data?.message || `Request failed with status ${res.status}`;
    throw new ApiError(res.status, message, data);
  }

  return data as T;
}

