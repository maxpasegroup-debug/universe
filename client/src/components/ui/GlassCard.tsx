"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export default function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 24px rgba(255, 215, 0, 0.30), 0 0 70px rgba(255, 215, 0, 0.18)",
      }}
      animate={
        prefersReducedMotion ? undefined : { y: [0, -6, 0] }
      }
      transition={
        prefersReducedMotion
          ? { type: "spring", stiffness: 260, damping: 18 }
          : {
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
              type: "spring",
              stiffness: 260,
              damping: 18,
            }
      }
      className={[
        "rounded-[20px] border border-[#FFD700]/30 bg-white/5 p-10 backdrop-blur-xl",
        "shadow-[0_0_0_1px_rgba(255,215,0,0.14)]",
        className,
      ].join(" ")}
    >
      {children}
    </motion.div>
  );
}

