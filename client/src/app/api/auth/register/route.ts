import { NextResponse } from "next/server";

const BACKEND_API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://universe-production-74d9.up.railway.app/api"
).replace(/\/$/, "");

export async function POST(request: Request) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const body = await request.text();
    const upstream = await fetch(`${BACKEND_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
      cache: "no-store",
      signal: controller.signal,
    });

    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "application/json",
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server not reachable" }, { status: 503 });
  } finally {
    clearTimeout(timeout);
  }
}
