"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import GoldButton from "@/components/ui/GoldButton";
import { logAnalytics } from "@/lib/analytics";
import { useRouter } from "next/navigation";

export default function DashboardHomePage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        router.push("/auth/login");
        return;
      }
    }
    void logAnalytics("dashboard_home_view");
  }, [router]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <GlassCard className="p-6">
          <div className="bg-gold-linear bg-clip-text text-transparent font-extrabold text-2xl">
            Ready to start?
          </div>
          <p className="mt-3 text-[#B8B8B8] leading-relaxed">
            Explore learn resources, follow the earning steps, and reach out to the owner for guidance.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GoldButton onClick={() => router.push("/dashboard/learn")}>Go to Learn</GoldButton>
            <GoldButton onClick={() => router.push("/dashboard/earn")} glow>
              Go to Earn
            </GoldButton>
          </div>
        </GlassCard>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Learn", value: "Videos + Audios + Docs", href: "/dashboard/learn" },
          { label: "Earn", value: "Step-by-step guidance", href: "/dashboard/earn" },
          { label: "Talk", value: "WhatsApp support", href: "/dashboard/talk" },
        ].map((c) => (
          <motion.div key={c.label} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 250 }}>
            <GlassCard>
              <div className="bg-gold-linear bg-clip-text text-transparent font-bold">{c.label}</div>
              <div className="mt-2 text-[#B8B8B8]">{c.value}</div>
              <div className="mt-4">
                <button
                  onClick={() => router.push(c.href)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/90 hover:bg-white/10 transition-colors w-full"
                >
                  Open
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => {
          if (typeof window !== "undefined") {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/auth/login";
          }
        }}
        className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/90 hover:bg-white/10 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
