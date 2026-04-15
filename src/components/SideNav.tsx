"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const sideItems = [
  { href: "/accounts", icon: "home", label: "Accounts" },
  { href: "/history", icon: "history", label: "History" },
  { href: "/settings", icon: "settings", label: "Settings" },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className="hidden md:block fixed left-6 top-1/2 -translate-y-1/2 z-40">
      <div className="flex flex-col gap-4 p-2 bg-surface-container-low rounded-full shadow-lg border border-outline-variant/10">
        {sideItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative group w-12 h-12 flex items-center justify-center rounded-full transition-colors ${
                isActive
                  ? "bg-primary text-on-primary"
                  : "text-primary hover:bg-secondary-container"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold whitespace-nowrap opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 shadow-lg">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
