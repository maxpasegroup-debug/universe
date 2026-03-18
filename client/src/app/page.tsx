"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarBackground from "@/components/StarBackground";
import GlassCard from "@/components/ui/GlassCard";
import GoldButton from "@/components/ui/GoldButton";

export default function Home() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-hidden bg-royal-100">
      <StarBackground />
      <div className="relative mx-auto max-w-6xl px-4 py-12">
        <div className="text-center">
          <motion.div
            className="inline-flex items-center justify-center rounded-full border border-[#FFD700]/30 bg-white/5 px-8 py-3 shadow-[0_0_0_1px_rgba(255,215,0,0.18)]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="bg-gold-linear bg-clip-text text-transparent font-extrabold tracking-widest text-lg">
              7Universe
            </span>
          </motion.div>

          <motion.h1
            className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <span className="bg-gold-linear bg-clip-text text-transparent">Welcome to 7Universe</span>
          </motion.h1>

          <motion.p
            className="mt-4 text-[#B8B8B8] max-w-2xl mx-auto text-lg md:text-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            Explore a universe of opportunities and start building your income stream.
          </motion.p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Learn",
                desc: "Watch videos, listen to audios and read documents to understand the business.",
              },
              {
                title: "Earn",
                desc: "Follow the step-by-step guide to start earning using the referral system.",
              },
              {
                title: "Talk to an Expert",
                desc: "Connect directly with the owner to get guidance and support.",
              },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.14 + idx * 0.06 }}
              >
                <GlassCard className="h-full">
                  <div className="bg-gold-linear bg-clip-text text-transparent font-bold text-xl">
                    {card.title}
                  </div>
                  <p className="mt-3 text-[#B8B8B8] leading-relaxed">{card.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
          >
            <GoldButton
              onClick={() => router.push("/auth/login")}
              glow
              className="px-12 py-5 text-lg font-semibold"
            >
              CONNECT ACCOUNT
            </GoldButton>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
