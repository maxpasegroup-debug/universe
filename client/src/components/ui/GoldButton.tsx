"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function GoldButton({
  children,
  className = "",
  glow = true,
  ...props
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
} & Record<string, any>) {
  return (
    <motion.button
      whileHover={{
        scale: 1.03,
        boxShadow: glow ? "0 0 30px rgba(255,215,0,0.45), 0 0 90px rgba(255,215,0,0.22)" : undefined,
      }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={[
        "inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold",
        "bg-gold-linear text-white",
        "border border-[#FFD700]/55",
        glow ? "shadow-gold-glow" : "",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/60",
        "transition-all duration-200",
        className,
      ].join(" ")}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}

