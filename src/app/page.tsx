"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [phoneDigits, setPhoneDigits] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const phoneRef = useRef<HTMLInputElement | null>(null);

  const formatForDisplay = (digits: string) => {
    if (digits.length > 5) return `${digits.slice(0, 5)} ${digits.slice(5)}`;
    return digits;
  };

  const validatePhone = (raw: string) => {
    if (raw.length === 0) return "";
    if (!/^[6-9]/.test(raw)) return "Number must start with 6, 7, 8 or 9";
    if (raw.length < 10) return `Enter ${10 - raw.length} more digit${10 - raw.length > 1 ? "s" : ""}`;
    return "";
  };

  // Uncontrolled input handler — reads DOM directly, writes back formatted value
  const handlePhoneInput = () => {
    if (!phoneRef.current) return;
    const raw = phoneRef.current.value.replace(/\D/g, "").slice(0, 10);
    const display = formatForDisplay(raw);
    phoneRef.current.value = display; // sync DOM immediately
    setPhoneDigits(raw);
    if (phoneTouched) {
      setPhoneError(validatePhone(raw));
    }
  };

  const isPhoneValid = phoneDigits.length === 10 && /^[6-9]/.test(phoneDigits);
  const hasEnoughDigits = phoneDigits.length === 10;

  const handleSendOtp = () => {
    setPhoneTouched(true);
    const error = validatePhone(phoneDigits);
    setPhoneError(error);
    if (error) return;
    setOtpSent(true);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return;
      const next = [...otp];
      next[index] = value.slice(-1);
      setOtp(next);
      if (value && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    },
    [otp]
  );

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.some((d) => !d)) return;
    setLoading(true);
    setTimeout(() => {
      router.push("/accounts");
    }, 1200);
  };

  return (
    <main className="flex-grow flex flex-col lg:flex-row">
      {/* Heritage Anchor — Desktop Only */}
      <section className="lg:w-1/2 relative overflow-hidden hidden lg:block">
        <div className="absolute inset-0 bg-primary-container">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/80 to-transparent" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end p-16">
          <div className="mb-8">
            <Image
              src="/mrcb-logo.png"
              alt="Mayyanad Regional Co-operative Bank Logo"
              width={96}
              height={96}
              className="mb-6 rounded-2xl shadow-xl border border-secondary/20"
            />
            <h1 className="font-headline font-extrabold text-4xl text-on-primary tracking-tight mb-2">
              Mayyanad Regional <br />
              Co-operative Bank
            </h1>
            <p className="text-on-primary-container text-xl font-medium malayalam-text">
              മയ്യനാട് റീജിയണൽ സർവീസ് സഹകരണ ബാങ്ക്
            </p>
          </div>
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-3">
              <span
                className="material-symbols-outlined text-secondary text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified_user
              </span>
              <p className="text-on-primary-container font-medium">
                Securing generations of local prosperity since 1954.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Login Form */}
      <section className="flex-grow flex flex-col justify-center items-center p-6 lg:p-24 bg-surface lg:bg-surface-container-low">
        <div className="w-full max-w-md space-y-10">
          {/* Mobile Branding */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <Image
              src="/mrcb-logo.png"
              alt="MRCB Logo"
              width={64}
              height={64}
              className="mb-4 rounded-xl"
            />
            <h2 className="font-headline font-bold text-xl text-primary text-center">
              Mayyanad Regional Co-operative Bank
            </h2>
          </div>

          <header className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-4">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                lock
              </span>
              Secure Access
            </div>
            <h2 className="font-headline font-extrabold text-3xl text-primary">
              Welcome Back
            </h2>
            <p className="text-outline malayalam-text">
              ലോഗിൻ ചെയ്യാൻ നിങ്ങളുടെ മൊബൈൽ നമ്പർ നൽകുക.
            </p>
          </header>

          <div className="space-y-6">
            {/* Mobile Number */}
            <div className="space-y-2">
              <label className="flex justify-between items-end">
                <span className="text-sm font-bold text-primary uppercase tracking-wider">
                  Mobile Number
                </span>
                <span className="text-xs text-outline malayalam-text">
                  മൊബൈൽ നമ്പർ
                </span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline group-focus-within:text-secondary transition-colors">
                  <span className="text-sm font-bold border-r border-outline/20 pr-3">
                    +91
                  </span>
                </div>
                <input
                  ref={phoneRef}
                  type="text"
                  inputMode="numeric"
                  maxLength={11}
                  autoComplete="tel-national"
                  defaultValue=""
                  onInput={handlePhoneInput}
                  onBlur={() => {
                    setPhoneTouched(true);
                    setPhoneError(validatePhone(phoneDigits));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !otpSent) handleSendOtp();
                  }}
                  className={`w-full bg-surface-container-high rounded-xl py-4 pl-16 pr-12 text-primary font-headline font-bold text-lg transition-all outline-none border-2 ${
                    phoneError && phoneTouched
                      ? "border-error/40 focus:border-error/60 focus:shadow-[0_0_0_4px_rgba(186,26,26,0.08)]"
                      : isPhoneValid
                      ? "border-secondary/30 focus:border-secondary/50 focus:shadow-[0_0_0_4px_rgba(119,90,25,0.08)]"
                      : "border-transparent focus:border-secondary/20 focus:shadow-[0_0_0_4px_rgba(119,90,25,0.08)]"
                  }`}
                  placeholder="00000 00000"
                />
                {/* Status icon */}
                {phoneTouched && phoneDigits.length > 0 && (
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    {isPhoneValid ? (
                      <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    ) : phoneError ? (
                      <span className="material-symbols-outlined text-error text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        error
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
              {/* Error message */}
              {phoneError && phoneTouched && (
                <div className="flex items-start gap-2 mt-2 animate-[fadeIn_0.2s_ease-out]">
                  <span className="material-symbols-outlined text-error text-sm mt-0.5">warning</span>
                  <div>
                    <p className="text-xs text-error font-medium">{phoneError}</p>
                    <p className="text-[11px] text-error/70 malayalam-text">
                      {phoneDigits.length === 0
                        ? "ദയവായി നിങ്ങളുടെ മൊബൈൽ നമ്പർ നൽകുക"
                        : !/^[6-9]/.test(phoneDigits)
                        ? "നമ്പർ 6, 7, 8 അല്ലെങ്കിൽ 9 ൽ ആരംഭിക്കണം"
                        : "10 അക്കങ്ങൾ ആവശ്യമാണ്"}
                    </p>
                  </div>
                </div>
              )}
              {/* Valid confirmation */}
              {isPhoneValid && phoneTouched && !otpSent && (
                <p className="text-xs text-secondary font-medium mt-2 flex items-center gap-1.5 animate-[fadeIn_0.2s_ease-out]">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  Valid number — tap Send OTP
                  <span className="malayalam-text text-[11px] font-normal ml-1">OTP അയക്കുക</span>
                </p>
              )}
            </div>

            {/* OTP Input */}
            {otpSent && (
              <div className="space-y-2 animate-[fadeIn_0.3s_ease-out]">
                <label className="flex justify-between items-end">
                  <span className="text-sm font-bold text-primary uppercase tracking-wider">
                    Enter OTP
                  </span>
                  <span className="text-xs text-outline malayalam-text">
                    ഒ.ടി.പി നൽകുക
                  </span>
                </label>
                <div className="grid grid-cols-6 gap-2 sm:gap-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        otpRefs.current[i] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-full aspect-square max-h-16 text-center text-xl sm:text-2xl font-bold bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-secondary/20 outline-none"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 space-y-4">
              {!otpSent ? (
                <button
                  onClick={handleSendOtp}
                  disabled={!hasEnoughDigits}
                  className="w-full heritage-gradient text-white py-5 rounded-xl font-headline font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  Send OTP
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </button>
              ) : (
                <button
                  onClick={handleVerify}
                  disabled={otp.some((d) => !d) || loading}
                  className="w-full heritage-gradient text-white py-5 rounded-xl font-headline font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  {loading ? (
                    <span className="material-symbols-outlined animate-spin">
                      progress_activity
                    </span>
                  ) : (
                    <>
                      Verify & Login
                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>
              )}

              {otpSent && (
                <div className="flex justify-center">
                  <button className="text-secondary font-bold text-sm flex items-center gap-2 hover:bg-secondary/5 px-4 py-2 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-sm">
                      refresh
                    </span>
                    Send OTP Again
                    <span className="text-xs malayalam-text font-normal opacity-80">
                      (വീണ്ടും അയക്കുക)
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-4 mt-12 pt-12 border-t border-outline-variant/20">
            <div className="p-4 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10">
              <span
                className="material-symbols-outlined text-secondary mb-2"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shield_person
              </span>
              <p className="text-xs font-bold text-primary uppercase mb-1">
                Encrypted
              </p>
              <p className="text-[10px] text-outline malayalam-text">
                സുരക്ഷിതമായ ഇടപാടുകൾ
              </p>
            </div>
            <div className="p-4 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10">
              <span
                className="material-symbols-outlined text-secondary mb-2"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                support_agent
              </span>
              <p className="text-xs font-bold text-primary uppercase mb-1">
                24/7 Support
              </p>
              <p className="text-[10px] text-outline malayalam-text">
                സഹായത്തിനായി ബന്ധപ്പെടുക
              </p>
            </div>
          </div>

          <footer className="text-center pt-8">
            <p className="text-xs text-outline font-medium tracking-wide">
              By logging in, you agree to our{" "}
              <a
                className="text-secondary underline decoration-secondary/30"
                href="#"
              >
                Terms of Service
              </a>
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}
