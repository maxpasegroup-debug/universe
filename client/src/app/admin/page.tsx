"use client";

import { useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import GoldButton from "@/components/ui/GoldButton";
import { apiFetch } from "@/lib/api";

type Summary = {
  totalUsers: number;
  totalActions: number;
  dailyRegistrations: { date: string; count: number }[];
};

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<Summary>(`/admin/analytics/summary`, { method: "GET" });
      setSummary(data);
    } catch (err: any) {
      setError(err?.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="bg-gold-linear bg-clip-text text-transparent font-extrabold text-2xl">
            Dashboard analytics
          </div>
          <p className="mt-2 text-white/70">Track total users, daily registrations, and activity.</p>
        </div>
        <div>
          <GoldButton onClick={() => void load()}>Refresh</GoldButton>
        </div>
      </div>

      {loading ? (
        <div className="text-white/60">Loading analytics...</div>
      ) : error ? (
        <div className="text-red-300 bg-red-500/10 border border-red-300/20 rounded-xl p-3">{error}</div>
      ) : summary ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <GlassCard>
              <div className="text-white/60 text-sm">Total Users</div>
              <div className="bg-gold-linear bg-clip-text text-transparent font-extrabold text-3xl mt-2">
                {summary.totalUsers}
              </div>
            </GlassCard>
            <GlassCard>
              <div className="text-white/60 text-sm">Total Actions</div>
              <div className="bg-gold-linear bg-clip-text text-transparent font-extrabold text-3xl mt-2">
                {summary.totalActions}
              </div>
            </GlassCard>
            <GlassCard>
              <div className="text-white/60 text-sm">Time Window</div>
              <div className="bg-gold-linear bg-clip-text text-transparent font-extrabold text-3xl mt-2">
                {summary.dailyRegistrations.length} days
              </div>
            </GlassCard>
          </div>

          <GlassCard>
            <div className="text-white/90 font-bold text-lg">Daily registrations</div>
            <div className="mt-4 space-y-3">
              {summary.dailyRegistrations.map((d) => (
                <div key={d.date} className="flex items-center gap-3">
                  <div className="w-32 text-white/70 text-sm">{d.date}</div>
                  <div className="flex-1 rounded-full border border-white/10 bg-white/5 overflow-hidden">
                    <div
                      className="h-3 bg-gold-linear"
                      style={{
                        width: `${summary.dailyRegistrations.length > 0 ? (d.count / Math.max(...summary.dailyRegistrations.map((x) => x.count), 1)) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <div className="w-12 text-right text-white/80 font-medium">{d.count}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      ) : null}
    </div>
  );
}

