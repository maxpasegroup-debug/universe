"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type SidebarItem = {
  label: string;
  href: string;
};

export default function Sidebar({
  items,
  onNavigate,
}: {
  items: SidebarItem[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="w-full">
      <ul className="space-y-2">
        {items.map((it) => {
          const active = pathname === it.href || pathname.startsWith(it.href + "/");
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className={[
                  "relative block rounded-[16px] border py-3 pl-5 pr-4 transition-all",
                  active
                    ? "border-[#FFD700]/45 bg-white/8 shadow-[0_0_0_1px_rgba(255,215,0,0.22)]"
                    : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#FFD700]/25",
                ].join(" ")}
                onClick={() => onNavigate?.()}
              >
                {active ? (
                  <span
                    className="absolute left-0 top-0 bottom-0 w-[4px] rounded-l-[16px] bg-gold-linear"
                    aria-hidden
                  />
                ) : null}
                <span className={active ? "text-white font-semibold" : "text-[#B8B8B8] font-medium"}>
                  {it.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

