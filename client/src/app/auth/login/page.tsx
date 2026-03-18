"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import AuthShell from "@/components/auth/AuthShell";
import TextInput from "@/components/ui/TextInput";
import GoldButton from "@/components/ui/GoldButton";
import { apiFetch } from "@/lib/api";
import { setToken } from "@/lib/authStorage";
import { decodeJwt } from "@/lib/jwt";

export default function LoginPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<{ token: string }>(`/auth/login`, {
        method: "POST",
        body: { mobile, password },
      });
      setToken(data.token);

      const decoded = decodeJwt(data.token);
      router.push(decoded?.role === "admin" ? "/admin" : "/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Login"
      subtitle="Sign in with mobile number and password."
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="text-white/80 text-sm font-medium">Mobile Number</label>
          <TextInput
            inputMode="tel"
            placeholder="e.g. 917591929909"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label className="text-white/80 text-sm font-medium">Password</label>
          <TextInput
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {error ? <div className="text-red-300 bg-red-500/10 border border-red-300/20 rounded-xl p-3">{error}</div> : null}

        <GoldButton className="w-full" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </GoldButton>

        <button
          type="button"
          onClick={() => router.push("/auth/register")}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 hover:bg-white/10 transition-colors"
        >
          Create account
        </button>
      </form>
    </AuthShell>
  );
}

