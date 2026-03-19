"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { SidebarItem } from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const items: SidebarItem[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Learn", href: "/dashboard/learn" },
    { label: "Earn", href: "/dashboard/earn" },
    { label: "Talk to Expert", href: "/dashboard/talk" },
  ];

  return (
    <DashboardShell title="Dashboard" sidebarItems={items}>
      {children}
    </DashboardShell>
  );
}

