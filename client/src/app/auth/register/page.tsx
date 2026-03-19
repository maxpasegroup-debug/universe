"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import AuthShell from "@/components/auth/AuthShell";
import TextInput from "@/components/ui/TextInput";
import GoldButton from "@/components/ui/GoldButton";
import { API_URL } from "@/config/api";
import { setToken } from "@/lib/authStorage";

export default function RegisterPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = { mobile, password };
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Server not reachable");
      }
      const json = (await response.json()) as { token: string };
      setToken(json.token);

      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "Server not reachable") {
        setError("Server not reachable");
      } else {
        console.error(err);
        setError("Server not reachable");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Create Account"
      subtitle="Start your journey inside 7Universe."
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
          <div className="relative">
            <TextInput
              type={showPassword ? "text" : "password"}
              placeholder="Choose a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              className="pr-28"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border border-gold-300/30 bg-white/5 px-3 py-2 text-white/80 hover:bg-white/10 transition-colors text-xs"
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>

        {error ? <div className="text-red-300 bg-red-500/10 border border-red-300/20 rounded-xl p-3">{error}</div> : null}

        <GoldButton className="w-full" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </GoldButton>

        <button
          type="button"
          onClick={() => router.push("/auth/login")}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 hover:bg-white/10 transition-colors"
        >
          Back to login
        </button>
      </form>
    </AuthShell>
  );
}
