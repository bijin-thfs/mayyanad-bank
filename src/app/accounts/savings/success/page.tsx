"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const refNumber = searchParams.get("ref") || `MRCB-${Date.now().toString().slice(-8)}`;
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 100),   // circle draws
      setTimeout(() => setStage(2), 700),   // checkmark appears
      setTimeout(() => setStage(3), 1200),  // title fades in
      setTimeout(() => setStage(4), 1700),  // details card fades in
      setTimeout(() => setStage(5), 2200),  // actions fade in
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 py-12 bg-surface relative overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/[0.03] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[400px] h-[400px] rounded-full bg-primary-container/[0.04] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Animated Success Circle */}
        <div className="relative w-32 h-32 mb-8">
          {/* Outer ring animation */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 128 128">
            <circle
              cx="64"
              cy="64"
              r="58"
              fill="none"
              stroke="var(--color-secondary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="364.4"
              strokeDashoffset={stage >= 1 ? "0" : "364.4"}
              className="transition-[stroke-dashoffset] duration-700 ease-out"
              style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
            />
          </svg>

          {/* Inner filled circle */}
          <div
            className={`absolute inset-3 rounded-full heritage-gradient flex items-center justify-center transition-all duration-500 ${
              stage >= 1 ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            {/* Checkmark */}
            <svg
              viewBox="0 0 24 24"
              className={`w-14 h-14 transition-all duration-400 ${
                stage >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <path
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                fill="white"
                className={stage >= 2 ? "animate-[checkDraw_0.4s_ease-out_forwards]" : ""}
              />
            </svg>
          </div>

          {/* Sparkle particles */}
          {stage >= 2 && (
            <>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <div
                  key={angle}
                  className="absolute w-2 h-2 rounded-full bg-secondary animate-[sparkle_0.8s_ease-out_forwards]"
                  style={{
                    top: "50%",
                    left: "50%",
                    animationDelay: `${i * 50}ms`,
                    transform: `rotate(${angle}deg) translateY(-70px)`,
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Title */}
        <div
          className={`text-center mb-8 transition-all duration-600 ${
            stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="font-headline font-extrabold text-3xl md:text-4xl text-primary mb-2">
            Application Submitted!
          </h1>
          <p className="font-headline font-medium text-secondary text-lg malayalam-text">
            അപേക്ഷ സമർപ്പിച്ചു!
          </p>
        </div>

        {/* Details Card */}
        <div
          className={`w-full bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-[0_4px_24px_rgba(0,45,86,0.06)] mb-8 transition-all duration-600 ${
            stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Reference number */}
          <div className="flex items-center justify-between mb-5 pb-5" style={{ borderBottom: "1px solid rgba(195,198,208,0.2)" }}>
            <div>
              <p className="text-xs text-outline uppercase tracking-wider font-bold">Reference No.</p>
              <p className="text-xs text-outline malayalam-text">റഫറൻസ് നമ്പർ</p>
            </div>
            <p className="font-headline font-extrabold text-lg text-primary tracking-wide">
              {refNumber}
            </p>
          </div>

          {/* Account info */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-container/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary-container text-xl">account_balance_wallet</span>
              </div>
              <div>
                <p className="text-sm font-bold text-primary">Savings Account</p>
                <p className="text-xs text-outline malayalam-text">സേവിംഗ്സ് അക്കൗണ്ട്</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary-container/30 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
              </div>
              <div>
                <p className="text-sm font-bold text-primary">Under Review</p>
                <p className="text-xs text-outline malayalam-text">അവലോകനത്തിലാണ്</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-container/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary-container text-xl">notifications_active</span>
              </div>
              <div>
                <p className="text-sm text-primary">
                  We will notify you once your account is activated.
                </p>
                <p className="text-xs text-outline malayalam-text">
                  അക്കൗണ്ട് ആക്ടിവേറ്റ് ചെയ്തുകഴിഞ്ഞാൽ ഞങ്ങൾ നിങ്ങളെ അറിയിക്കും.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div
          className={`w-full bg-surface-container-lowest rounded-2xl p-6 mb-8 shadow-[0_4px_24px_rgba(0,45,86,0.06)] transition-all duration-600 ${
            stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">What happens next?</p>
          <p className="text-[11px] text-outline malayalam-text mb-5">ഇനി എന്ത് സംഭവിക്കും?</p>

          <div className="space-y-0">
            {[
              { icon: "task_alt", label: "Application received", malayalam: "അപേക്ഷ ലഭിച്ചു", done: true },
              { icon: "verified_user", label: "KYC verification", malayalam: "KYC പരിശോധന", done: false },
              { icon: "account_balance", label: "Account activation", malayalam: "അക്കൗണ്ട് ആക്ടിവേഷൻ", done: false },
              { icon: "celebration", label: "Start banking!", malayalam: "ബാങ്കിംഗ് ആരംഭിക്കുക!", done: false },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex gap-4">
                {/* Vertical line + dot */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.done ? "bg-secondary" : "bg-surface-container-high"
                  }`}>
                    <span
                      className={`material-symbols-outlined text-base ${step.done ? "text-white" : "text-outline"}`}
                      style={step.done ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {step.icon}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={`w-0.5 h-8 ${step.done ? "bg-secondary/40" : "bg-surface-container-high"}`} />
                  )}
                </div>
                {/* Label */}
                <div className="pt-1 pb-4">
                  <p className={`text-sm font-medium ${step.done ? "text-primary" : "text-outline"}`}>{step.label}</p>
                  <p className="text-[11px] text-outline malayalam-text">{step.malayalam}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div
          className={`w-full space-y-3 transition-all duration-600 ${
            stage >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="/accounts"
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl heritage-gradient text-white font-bold text-base shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all min-h-[56px]"
          >
            <span className="material-symbols-outlined text-xl">home</span>
            Back to Accounts
            <span className="text-sm font-normal malayalam-text opacity-80">അക്കൗണ്ടുകൾ</span>
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: "MRCB Account Application", text: "I just applied for a Savings Account at Mayyanad Regional Co-operative Bank!" });
                }
              }}
              className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-surface-container-lowest text-primary font-bold text-sm shadow-[0_2px_8px_rgba(0,45,86,0.06)] hover:bg-surface-container-high active:scale-95 transition-all min-h-[48px]"
            >
              <span className="material-symbols-outlined text-lg">share</span>
              Share
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-surface-container-lowest text-primary font-bold text-sm shadow-[0_2px_8px_rgba(0,45,86,0.06)] hover:bg-surface-container-high active:scale-95 transition-all min-h-[48px]"
            >
              <span className="material-symbols-outlined text-lg">download</span>
              Save
            </button>
          </div>
        </div>

        {/* Bank footer */}
        <div
          className={`mt-10 flex flex-col items-center gap-3 transition-all duration-600 ${
            stage >= 5 ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <Image
            src="/mrcb-logo.png"
            alt="MRCB"
            width={40}
            height={40}
            className="rounded-full opacity-60"
          />
          <div className="text-center">
            <p className="text-xs text-outline font-medium">
              Mayyanad Regional Co-operative Bank
            </p>
            <p className="text-[11px] text-outline malayalam-text">
              മയ്യനാട് റീജിയണൽ സഹകരണ ബാങ്ക്
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
