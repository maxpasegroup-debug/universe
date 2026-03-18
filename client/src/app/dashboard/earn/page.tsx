"use client";

import { useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import GoldButton from "@/components/ui/GoldButton";
import { apiFetch } from "@/lib/api";
import { logAnalytics } from "@/lib/analytics";

type EarnInstructions = {
  step1VideoUrl?: string;
  step2Text?: string;
  step3ReferralUrl?: string;
};

export default function EarnPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [instructions, setInstructions] = useState<EarnInstructions>({
    step1VideoUrl: "",
    step2Text: "",
    step3ReferralUrl: "",
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiFetch<{ instructions: EarnInstructions }>(`/earn/instructions`);
        setInstructions(data.instructions || {});
        await logAnalytics("dashboard_earn_view");
      } catch (err: any) {
        setError(err?.message || "Failed to load instructions");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function copyReferral() {
    try {
      const text = instructions.step3ReferralUrl || "";
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-3xl md:text-4xl font-extrabold leading-tight bg-gold-linear bg-clip-text text-transparent">
        Earn
      </div>
      <p className="text-[#B8B8B8] max-w-2xl">
        Follow the step-by-step guidance to start earning using the referral system.
      </p>

      {loading ? (
        <div className="text-white/60">Loading instructions...</div>
      ) : error ? (
        <div className="text-red-300 bg-red-500/10 border border-red-300/20 rounded-xl p-3">{error}</div>
      ) : (
        <div className="space-y-4">
          <GlassCard className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="bg-gold-linear bg-clip-text text-transparent font-bold text-xl">Step 1</div>
                <p className="mt-2 text-[#B8B8B8]">Intro video explaining the opportunity.</p>
              </div>
            </div>
            <div className="mt-5 rounded-[20px] overflow-hidden border border-[#FFD700]/20 bg-black/35">
              {instructions.step1VideoUrl ? (
                <video src={instructions.step1VideoUrl} controls className="w-full bg-black" />
              ) : (
                <div className="p-6 text-white/60">No intro video uploaded yet.</div>
              )}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="bg-gold-linear bg-clip-text text-transparent font-bold text-xl">Step 2</div>
            <p className="mt-2 text-[#B8B8B8]">Instruction section.</p>
            <div className="mt-4 whitespace-pre-wrap text-white/85 leading-relaxed rounded-[16px] border border-white/10 bg-white/5 p-5">
              {instructions.step2Text || "No instructions available."}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="bg-gold-linear bg-clip-text text-transparent font-bold text-xl">Step 3</div>
                <p className="mt-2 text-[#B8B8B8]">Show the main referral link.</p>
              </div>
            </div>

            <div className="mt-5 rounded-[20px] border border-[#FFD700]/35 bg-black/40 p-5">
              <div className="text-white/80 text-sm mb-3">Referral link</div>
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/90 overflow-x-auto">
                  {instructions.step3ReferralUrl || ""}
                </div>
                <GoldButton onClick={copyReferral} className="md:w-44">
                  {copied ? "COPIED" : "COPY"}
                </GoldButton>
              </div>
              <div className="mt-3 text-[#B8B8B8] text-xs">
                Example: https://businesslink.com/referral/ownerlink
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

