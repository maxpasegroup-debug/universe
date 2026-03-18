export type DecodedJwt = {
  userId: string;
  mobile: string;
  role: "user" | "admin";
  exp?: number;
};

function base64UrlDecode(input: string) {
  // JWT uses base64url encoding.
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4 === 0 ? "" : "=".repeat(4 - (base64.length % 4));
  const decoded = atob(base64 + pad);
  return decoded;
}

export function decodeJwt(token: string): DecodedJwt | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = base64UrlDecode(parts[1]);
    const obj = JSON.parse(payload);
    if (!obj?.userId || !obj?.role) return null;
    return obj as DecodedJwt;
  } catch {
    return null;
  }
}

