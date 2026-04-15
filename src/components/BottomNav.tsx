"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/accounts", icon: "account_balance_wallet", label: "Accounts" },
  { href: "/history", icon: "history", label: "History" },
  { href: "/settings", icon: "settings", label: "Settings" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden glass-effect fixed bottom-0 w-full rounded-t-2xl z-50 border-t border-primary-container/10 shadow-[0_-4px_24px_rgba(0,45,86,0.06)] px-4 pb-6 pt-3 flex justify-around items-center">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl active:scale-90 transition-all duration-200 ${
              isActive
                ? "bg-primary-container text-white"
                : "text-primary-container/60 hover:text-secondary"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={
                isActive
                  ? { fontVariationSettings: "'FILL' 1" }
                  : undefined
              }
            >
              {item.icon}
            </span>
            <span className="font-label text-[11px] font-semibold uppercase tracking-wider mt-1">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
