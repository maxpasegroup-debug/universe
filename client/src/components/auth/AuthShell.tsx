"use client";

import StarBackground from "@/components/StarBackground";
import GlassCard from "@/components/ui/GlassCard";
import { ReactNode } from "react";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-royal-100">
      <StarBackground />
      <div className="relative mx-auto max-w-xl px-4 py-14">
        <div className="text-center mb-6">
          <div className="bg-gold-linear bg-clip-text text-transparent font-extrabold text-3xl">
            7Universe
          </div>
          {subtitle ? <p className="mt-2 text-[#B8B8B8]">{subtitle}</p> : null}
        </div>

        <GlassCard>{children}</GlassCard>

        <p className="mt-6 text-center text-white/50 text-sm">
          Private portal. Protected by JWT.
        </p>
      </div>
    </div>
  );
}

