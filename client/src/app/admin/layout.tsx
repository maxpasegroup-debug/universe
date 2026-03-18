"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { SidebarItem } from "@/components/layout/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const items: SidebarItem[] = [
    { label: "Dashboard", href: "/admin" },
    { label: "Content", href: "/admin/content" },
    { label: "Earn Instructions", href: "/admin/earn" },
  ];

  return (
    <DashboardShell title="Admin Panel" sidebarItems={items} requireRole="admin">
      {children}
    </DashboardShell>
  );
}

