"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-surface/80 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,45,86,0.05)] sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <Link
            href="/accounts"
            className="flex items-center gap-3"
          >
            <Image
              src="/mrcb-logo.png"
              alt="MRCB Logo"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="font-headline font-extrabold text-lg text-primary-container tracking-tight hidden sm:inline">
              Mayyanad Regional Co-operative Bank
            </span>
            <span className="font-headline font-extrabold text-lg text-primary-container tracking-tight sm:hidden">
              MRCB
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <button className="active:scale-95 transition-transform text-primary-container p-2 hover:bg-surface-container-high rounded-full">
            <span className="material-symbols-outlined">translate</span>
          </button>
        </div>
      </div>
    </header>
  );
}
