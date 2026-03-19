"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import StarBackground from "../StarBackground";
import Sidebar, { SidebarItem } from "./Sidebar";
import { clearToken } from "@/lib/authStorage";

export default function DashboardShell({
  title,
  sidebarItems,
  children,
  requireRole,
}: {
  title: string;
  sidebarItems: SidebarItem[];
  children: ReactNode;
  requireRole?: "admin" | "user";
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!requireRole) return;
  }, [router, requireRole]);

  const sidebarPanel = (
    <div className="h-full rounded-[20px] bg-[#080808] border border-[#FFD700]/25 p-4 backdrop-blur-xl">
      <Sidebar items={sidebarItems} onNavigate={() => setSidebarOpen(false)} />
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-royal-100">
      <StarBackground />
      <div className="relative mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center rounded-xl border border-[#FFD700]/20 bg-white/5 px-3 py-2 text-white/80 hover:bg-white/10 transition-colors"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Open menu"
            >
              <span className="block w-5">
                <span className="block h-0.5 bg-[#FFD700] mb-1" />
                <span className="block h-0.5 bg-[#FFD700] mb-1" />
                <span className="block h-0.5 bg-[#FFD700]" />
              </span>
            </button>
            <div>
              <div className="bg-gold-linear bg-clip-text text-transparent font-extrabold text-3xl">
                7Universe
              </div>
              <p className="mt-2 text-[#B8B8B8]">{title}</p>
            </div>
          </div>
          <button
            className="hidden sm:inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 hover:bg-white/10 transition-colors"
            onClick={() => {
              clearToken();
              localStorage.removeItem("isLoggedIn");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="hidden lg:col-span-4 lg:block">{sidebarPanel}</div>
          <div className="lg:col-span-8">{children}</div>
        </div>
      </div>

      <AnimatePresence>
        {sidebarOpen ? (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70"
              onMouseDown={() => setSidebarOpen(false)}
            />
            <motion.div
              className="absolute left-0 top-0 h-full w-[320px] p-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              {sidebarPanel}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

