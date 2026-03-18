"use client";

import { type FormEvent, useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import GoldButton from "@/components/ui/GoldButton";
import TextInput from "@/components/ui/TextInput";
import TextArea from "@/components/ui/TextArea";
import { apiFetch } from "@/lib/api";
import { env } from "@/lib/env";

type Instructions = {
  step1VideoUrl: string;
  step2Text: string;
  step3ReferralUrl: string;
};

export default function AdminEarnPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [step1VideoUrl, setStep1VideoUrl] = useState("");
  const [step2Text, setStep2Text] = useState("");
  const [step3ReferralUrl, setStep3ReferralUrl] = useState(env.REFERRAL_LINK);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<{ instructions: Instructions }>(`/earn/instructions`, { method: "GET" });
      const inst = data.instructions;
      setStep1VideoUrl(inst?.step1VideoUrl || "");
      setStep2Text(inst?.step2Text || "");
      setStep3ReferralUrl(inst?.step3ReferralUrl || env.REFERRAL_LINK);
    } catch (err: any) {
      setError(err?.message || "Failed to load Earn instructions");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const body = {
        step1VideoUrl: step1VideoUrl || "",
        step2Text: step2Text || "",
        step3ReferralUrl: step3ReferralUrl || env.REFERRAL_LINK,
      };
      await apiFetch(`/admin/earn/instructions`, {
        method: "PUT",
        body,
      });
    } catch (err: any) {
      setError(err?.message || "Failed to save instructions");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gold-linear bg-clip-text text-transparent font-extrabold text-2xl">
        Edit Earn page instructions
      </div>
      <p className="text-white/70">
        Update step-by-step guidance and the main referral link shown to users.
      </p>

      {error ? <div className="text-red-300 bg-red-500/10 border border-red-300/20 rounded-xl p-3">{error}</div> : null}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <GlassCard>
            <div className="font-bold text-white/90 text-lg">Instruction editor</div>
            <form className="mt-4 space-y-4" onSubmit={onSave}>
              <div>
                <label className="text-white/80 text-sm font-medium">Step 1 Video URL</label>
                <TextInput
                  value={step1VideoUrl}
                  onChange={(e) => setStep1VideoUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium">Step 2 Instructions (text)</label>
                <TextArea
                  value={step2Text}
                  onChange={(e) => setStep2Text(e.target.value)}
                  placeholder="Write your instructions..."
                />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium">Step 3 Referral URL</label>
                <TextInput
                  value={step3ReferralUrl}
                  onChange={(e) => setStep3ReferralUrl(e.target.value)}
                  placeholder="https://businesslink.com/referral/ownerlink"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <GoldButton className="flex-1" type="submit" disabled={saving || loading}>
                  {saving ? "Saving..." : "Save"}
                </GoldButton>
                <button
                  type="button"
                  onClick={() => void load()}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 hover:bg-white/10 transition-colors"
                >
                  Reload
                </button>
              </div>
            </form>
          </GlassCard>
        </div>

        <div className="lg:col-span-7">
          <GlassCard className="p-6">
            <div className="font-bold text-white/90 text-lg">Preview</div>
            <div className="mt-4 space-y-4">
              <div>
                <div className="text-white/60 text-sm">Step 1</div>
                {step1VideoUrl ? (
                  <video src={step1VideoUrl} controls className="w-full rounded-xl bg-black" />
                ) : (
                  <div className="text-white/50 text-sm">No video URL set.</div>
                )}
              </div>
              <div>
                <div className="text-white/60 text-sm">Step 2</div>
                <div className="whitespace-pre-wrap text-white/80 leading-relaxed rounded-xl border border-white/10 bg-white/5 p-4">
                  {step2Text || "No instructions set."}
                </div>
              </div>
              <div>
                <div className="text-white/60 text-sm">Step 3</div>
                <div className="text-white/90 break-all rounded-xl border border-white/10 bg-white/5 p-4">
                  {step3ReferralUrl || env.REFERRAL_LINK}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

