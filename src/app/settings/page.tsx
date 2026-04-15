"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import SideNav from "@/components/SideNav";

export default function SettingsPage() {
  const router = useRouter();
  const [languagePref, setLanguagePref] = useState<"en" | "ml">("en");
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [txnNotifications, setTxnNotifications] = useState(true);
  const [textSize, setTextSize] = useState<"small" | "medium" | "large">("medium");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <Header />
      <main className="flex-1 pb-32">
        <div className="max-w-2xl mx-auto px-5 md:px-8 pt-6 md:pt-10 md:ml-24 lg:mx-auto">
          {/* Page Title */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-14 w-14 flex-shrink-0 flex items-center justify-center rounded-2xl heritage-gradient text-white shadow-lg shadow-primary/15">
              <span className="material-symbols-outlined text-3xl">settings</span>
            </div>
            <div>
              <h1 className="font-headline font-extrabold text-2xl md:text-3xl text-primary">
                Settings
              </h1>
              <p className="font-headline font-medium text-secondary text-base malayalam-text">
                ക്രമീകരണങ്ങൾ
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* ─── Profile ─── */}
            <SettingsCard>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full heritage-gradient flex items-center justify-center text-white font-headline font-bold text-xl flex-shrink-0">
                  B
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-headline font-bold text-lg text-primary truncate">Bijin James</p>
                  <p className="text-sm text-outline">+91 88089 76776</p>
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container-high text-primary text-xs font-bold hover:bg-surface-container-highest active:scale-95 transition-all min-h-[44px]">
                  <span className="material-symbols-outlined text-base">edit</span>
                  Edit
                </button>
              </div>
            </SettingsCard>

            {/* ─── Language ─── */}
            <SettingsCard>
              <SectionTitle title="Language" malayalam="ഭാഷ" icon="translate" />
              <div className="mt-5">
                <div className="grid grid-cols-2 gap-3">
                  <RadioCard
                    selected={languagePref === "en"}
                    onSelect={() => setLanguagePref("en")}
                    title="English First"
                    subtitle="ഇംഗ്ലീഷ്"
                  />
                  <RadioCard
                    selected={languagePref === "ml"}
                    onSelect={() => setLanguagePref("ml")}
                    title="Malayalam First"
                    subtitle="മലയാളം"
                  />
                </div>
              </div>
            </SettingsCard>

            {/* ─── Security ─── */}
            <SettingsCard>
              <SectionTitle title="Security" malayalam="സുരക്ഷ" icon="shield" />
              <div className="mt-5 space-y-1">
                <TappableRow
                  icon="pin"
                  label="Change PIN"
                  malayalam="പിൻ മാറ്റുക"
                  onClick={() => {}}
                />
                <TappableRow
                  icon="devices"
                  label="Active Sessions"
                  malayalam="സജീവ സെഷനുകൾ"
                  trailing={
                    <span className="text-xs font-medium text-secondary bg-secondary-container px-2.5 py-1 rounded-full">
                      1 active
                    </span>
                  }
                  onClick={() => {}}
                />
                <div className="pt-3">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-error-container/30 text-on-error-container text-sm font-bold hover:bg-error-container/50 active:scale-[0.98] transition-all min-h-[48px]">
                    <span className="material-symbols-outlined text-lg">logout</span>
                    Logout from All Devices
                    <span className="text-xs font-normal malayalam-text opacity-80 ml-1">
                      എല്ലാ ഉപകരണങ്ങളിൽ നിന്നും ലോഗൗട്ട്
                    </span>
                  </button>
                </div>
              </div>
            </SettingsCard>

            {/* ─── Notifications ─── */}
            <SettingsCard>
              <SectionTitle title="Notifications" malayalam="അറിയിപ്പുകൾ" icon="notifications" />
              <div className="mt-5 space-y-1">
                <ToggleRow
                  icon="sms"
                  label="SMS Alerts"
                  malayalam="SMS അറിയിപ്പുകൾ"
                  enabled={smsAlerts}
                  onToggle={() => setSmsAlerts(!smsAlerts)}
                />
                <ToggleRow
                  icon="receipt_long"
                  label="Transaction Alerts"
                  malayalam="ഇടപാട് അറിയിപ്പുകൾ"
                  enabled={txnNotifications}
                  onToggle={() => setTxnNotifications(!txnNotifications)}
                />
              </div>
            </SettingsCard>

            {/* ─── Accessibility ─── */}
            <SettingsCard>
              <SectionTitle title="Accessibility" malayalam="പ്രവേശനക്ഷമത" icon="accessibility_new" />
              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
                    Text Size <span className="text-outline font-normal normal-case malayalam-text ml-2">അക്ഷര വലുപ്പം</span>
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {([
                      { value: "small" as const, label: "Small", malayalam: "ചെറുത്", sample: "Aa" },
                      { value: "medium" as const, label: "Medium", malayalam: "ഇടത്തരം", sample: "Aa" },
                      { value: "large" as const, label: "Large", malayalam: "വലുത്", sample: "Aa" },
                    ]).map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setTextSize(opt.value)}
                        className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl transition-all duration-200 ${
                          textSize === opt.value
                            ? "bg-primary-container/8 shadow-[inset_0_0_0_2px_var(--color-primary-container)]"
                            : "bg-surface-container-high hover:bg-surface-container-highest"
                        }`}
                      >
                        <span className={`font-headline font-bold text-primary ${
                          opt.value === "small" ? "text-sm" : opt.value === "medium" ? "text-lg" : "text-2xl"
                        }`}>
                          {opt.sample}
                        </span>
                        <span className="text-[11px] font-semibold text-primary">{opt.label}</span>
                        <span className="text-[10px] text-outline malayalam-text">{opt.malayalam}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <ToggleRow
                  icon="dark_mode"
                  label="Dark Mode"
                  malayalam="ഡാർക്ക് മോഡ്"
                  enabled={darkMode}
                  onToggle={() => setDarkMode(!darkMode)}
                />
              </div>
            </SettingsCard>

            {/* ─── Help & Support ─── */}
            <SettingsCard>
              <SectionTitle title="Help & Support" malayalam="സഹായവും പിന്തുണയും" icon="help" />
              <div className="mt-5 space-y-1">
                <TappableRow
                  icon="call"
                  label="Call Us"
                  malayalam="ഞങ്ങളെ വിളിക്കൂ"
                  trailing={
                    <span className="text-xs text-outline">0474-2555265</span>
                  }
                  onClick={() => window.open("tel:04742555265")}
                />
                <TappableRow
                  icon="mail"
                  label="Email Us"
                  malayalam="ഇ-മെയിൽ അയക്കുക"
                  trailing={
                    <span className="text-xs text-outline truncate max-w-[140px]">mrcbmailbox@gmail.com</span>
                  }
                  onClick={() => window.open("mailto:mrcbmailbox@gmail.com")}
                />
                <TappableRow
                  icon="location_on"
                  label="Visit Branch"
                  malayalam="ശാഖ സന്ദർശിക്കുക"
                  trailing={
                    <span className="text-xs text-outline">Mayyanad, Kollam</span>
                  }
                  onClick={() => {}}
                />
                <div className="h-px bg-outline-variant/15 my-2" />
                <TappableRow
                  icon="description"
                  label="Terms of Service"
                  malayalam="സേവന നിബന്ധനകൾ"
                  onClick={() => {}}
                />
                <TappableRow
                  icon="policy"
                  label="Privacy Policy"
                  malayalam="സ്വകാര്യതാ നയം"
                  onClick={() => {}}
                />
              </div>

              <div className="mt-6 pt-4 text-center">
                <p className="text-xs text-outline">
                  Mayyanad Regional Co-operative Bank
                </p>
                <p className="text-[11px] text-outline malayalam-text">
                  മയ്യനാട് റീജിയണൽ സഹകരണ ബാങ്ക്
                </p>
                <p className="text-[11px] text-outline mt-1">
                  Version 1.0.0
                </p>
              </div>
            </SettingsCard>

            {/* ─── Logout ─── */}
            <button
              onClick={() => router.push("/")}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-error/10 text-error font-bold text-base hover:bg-error/15 active:scale-[0.98] transition-all min-h-[56px]"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
              Logout
              <span className="text-sm font-medium malayalam-text opacity-80">ലോഗൗട്ട്</span>
            </button>
          </div>
        </div>
      </main>
      <SideNav />
      <BottomNav />
    </>
  );
}

/* ─── Reusable Components ─── */

function SettingsCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,45,86,0.04)]">
      {children}
    </div>
  );
}

function SectionTitle({ title, malayalam, icon }: { title: string; malayalam: string; icon: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="material-symbols-outlined text-primary-container text-xl">{icon}</span>
      <div>
        <h2 className="font-headline font-bold text-base text-primary">{title}</h2>
        <p className="text-xs text-secondary malayalam-text">{malayalam}</p>
      </div>
    </div>
  );
}

function TappableRow({ icon, label, malayalam, trailing, onClick }: {
  icon: string;
  label: string;
  malayalam: string;
  trailing?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-3 py-3.5 -mx-3 rounded-xl hover:bg-surface-container-high active:scale-[0.99] transition-all min-h-[52px]"
    >
      <span className="material-symbols-outlined text-outline text-xl">{icon}</span>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-sm font-medium text-primary">{label}</p>
        <p className="text-[11px] text-outline malayalam-text">{malayalam}</p>
      </div>
      {trailing || (
        <span className="material-symbols-outlined text-outline-variant text-lg">chevron_right</span>
      )}
    </button>
  );
}

function ToggleRow({ icon, label, malayalam, enabled, onToggle }: {
  icon: string;
  label: string;
  malayalam: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-4 px-3 py-3.5 -mx-3 min-h-[52px]">
      <span className="material-symbols-outlined text-outline text-xl">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-primary">{label}</p>
        <p className="text-[11px] text-outline malayalam-text">{malayalam}</p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors duration-200 flex-shrink-0 ${
          enabled ? "bg-secondary" : "bg-outline-variant"
        }`}
      >
        <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${
          enabled ? "translate-x-6" : "translate-x-0"
        }`} />
      </button>
    </div>
  );
}

function RadioCard({ selected, onSelect, title, subtitle }: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      onClick={onSelect}
      className={`flex flex-col items-center gap-1 p-4 rounded-2xl transition-all duration-200 ${
        selected
          ? "bg-primary-container/8 shadow-[inset_0_0_0_2px_var(--color-primary-container)]"
          : "bg-surface-container-high hover:bg-surface-container-highest"
      }`}
    >
      <div className={`w-5 h-5 rounded-full flex items-center justify-center mb-1 ${
        selected
          ? "bg-primary-container"
          : "bg-surface-container-highest shadow-[inset_0_0_0_2px_var(--color-outline-variant)]"
      }`}>
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
      <p className="text-sm font-bold text-primary">{title}</p>
      <p className="text-xs text-outline malayalam-text">{subtitle}</p>
    </button>
  );
}
