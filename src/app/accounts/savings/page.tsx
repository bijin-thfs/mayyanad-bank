"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import SideNav from "@/components/SideNav";

const steps = [
  { id: 1, label: "Personal", fullLabel: "Personal Details", malayalam: "വ്യക്തിഗത വിവരങ്ങൾ" },
  { id: 2, label: "Address", fullLabel: "Address", malayalam: "വിലാസം" },
  { id: 3, label: "Documents", fullLabel: "KYC Documents", malayalam: "രേഖകൾ" },
  { id: 4, label: "Preferences", fullLabel: "Account Preferences", malayalam: "മുൻഗണനകൾ" },
  { id: 5, label: "Review", fullLabel: "Review & Submit", malayalam: "അവലോകനം" },
];

export default function SavingsAccountForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    fatherOrSpouseName: "",
    mobileNumber: "",
    email: "",
    occupation: "",
    annualIncome: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    state: "Kerala",
    pincode: "",
    aadhaarNumber: "",
    panNumber: "",
    photo: null as File | null,
    aadhaarFile: null as File | null,
    panFile: null as File | null,
    vkycStatus: "" as "" | "scheduled" | "completed",
    accountVariant: "regular",
    chequeBook: false,
    initialDeposit: "",
    nomineeFullName: "",
    nomineeRelationship: "",
  });

  const updateField = (field: string, value: string | boolean | File | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));
  const handleSubmit = () => {
    router.push("/accounts/savings/success");
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <>
      <Header />
      <main className="flex-1 pb-32">
        {/* Progress bar — full width, sticky below header */}
        <div className="sticky top-[65px] z-40 bg-surface">
          <div className="h-1 bg-surface-container-high">
            <div
              className="h-full bg-secondary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-5 md:px-8 pt-6 md:pt-10 md:ml-24 lg:mx-auto">
          {/* Back */}
          <button
            onClick={() => router.push("/accounts")}
            className="flex items-center gap-2 text-outline hover:text-primary transition-colors mb-8 -ml-1 min-h-[48px]"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            <span className="text-sm font-medium">Back</span>
            <span className="text-xs text-outline malayalam-text ml-1">മടങ്ങുക</span>
          </button>

          {/* Title Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 mb-8 shadow-[0_2px_16px_rgba(0,45,86,0.04)]">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-14 w-14 flex-shrink-0 flex items-center justify-center rounded-2xl heritage-gradient text-white shadow-lg shadow-primary/15">
                <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
              </div>
              <div>
                <h1 className="font-headline font-extrabold text-2xl md:text-3xl text-primary leading-tight">
                  Savings Account
                </h1>
                <p className="font-headline font-medium text-secondary text-base malayalam-text mt-0.5">
                  സേവിംഗ്സ് അക്കൗണ്ട് തുറക്കുക
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-outline">
                <span className="material-symbols-outlined text-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                Min. Rs. 100 to open
              </div>
              <div className="flex items-center gap-1.5 text-outline">
                <span className="material-symbols-outlined text-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
                Rs. 1,000 for cheque book
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="relative mb-10">
            {/* Connector lines — absolute behind circles */}
            <div className="absolute top-5 left-0 right-0 flex px-[calc(50%/5)]" style={{ paddingLeft: `calc(100% / ${steps.length} / 2)`, paddingRight: `calc(100% / ${steps.length} / 2)` }}>
              {steps.slice(0, -1).map((step) => (
                <div key={step.id} className="flex-1 flex items-center">
                  <div className={`w-full h-0.5 rounded-full transition-colors duration-300 ${
                    step.id < currentStep ? "bg-secondary" : "bg-surface-container-high"
                  }`} />
                </div>
              ))}
            </div>
            {/* Steps grid — circles + labels */}
            <div className="relative grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
              {steps.map((step) => {
                const isCompleted = step.id < currentStep;
                const isCurrent = step.id === currentStep;
                return (
                  <button
                    key={step.id}
                    onClick={() => { if (isCompleted) setCurrentStep(step.id); }}
                    className={`flex flex-col items-center gap-2 ${isCompleted ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      isCurrent
                        ? "heritage-gradient text-white shadow-lg shadow-primary/25 ring-4 ring-primary/10"
                        : isCompleted
                        ? "bg-secondary text-on-secondary"
                        : "bg-surface-container-high text-outline"
                    }`}>
                      {isCompleted ? (
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                      ) : (
                        step.id
                      )}
                    </div>
                    <span className={`text-[10px] sm:text-[11px] font-semibold text-center leading-tight ${
                      isCurrent ? "text-primary" : isCompleted ? "text-secondary" : "text-outline"
                    }`}>
                      <span className="hidden sm:inline">{step.fullLabel}</span>
                      <span className="sm:hidden">{step.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-10 shadow-[0_2px_16px_rgba(0,45,86,0.04)]">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="animate-[fadeIn_0.3s_ease-out]">
                <SectionHeader title="Personal Details" malayalam="വ്യക്തിഗത വിവരങ്ങൾ" />

                <div className="space-y-7 mt-8">
                  <Field label="Full Name (as per Aadhaar)" malayalam="പൂർണ്ണ നാമം (ആധാർ പ്രകാരം)" required>
                    <Input value={form.fullName} onChange={(v) => updateField("fullName", v)} placeholder="Enter your full name" />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <Field label="Date of Birth" malayalam="ജനന തീയതി" required>
                      <Input type="date" value={form.dateOfBirth} onChange={(v) => updateField("dateOfBirth", v)} />
                    </Field>
                    <Field label="Gender" malayalam="ലിംഗം" required>
                      <Select value={form.gender} onChange={(v) => updateField("gender", v)} options={[
                        { value: "", label: "Select / തിരഞ്ഞെടുക്കുക" },
                        { value: "male", label: "Male / പുരുഷൻ" },
                        { value: "female", label: "Female / സ്ത്രീ" },
                        { value: "other", label: "Other / മറ്റുള്ളവ" },
                      ]} />
                    </Field>
                  </div>

                  <Field label="Father's / Spouse's Name" malayalam="പിതാവിന്റെ / ഭാര്യ/ഭർത്താവിന്റെ പേര്" required>
                    <Input value={form.fatherOrSpouseName} onChange={(v) => updateField("fatherOrSpouseName", v)} placeholder="Enter name" />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <Field label="Mobile Number" malayalam="മൊബൈൽ നമ്പർ" required>
                      <Input type="tel" value={form.mobileNumber} onChange={(v) => updateField("mobileNumber", v)} placeholder="+91 00000 00000" />
                    </Field>
                    <Field label="Email Address" malayalam="ഇ-മെയിൽ">
                      <Input type="email" value={form.email} onChange={(v) => updateField("email", v)} placeholder="email@example.com" />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <Field label="Occupation" malayalam="തൊഴിൽ" required>
                      <Select value={form.occupation} onChange={(v) => updateField("occupation", v)} options={[
                        { value: "", label: "Select / തിരഞ്ഞെടുക്കുക" },
                        { value: "salaried", label: "Salaried / ശമ്പളക്കാരൻ" },
                        { value: "self-employed", label: "Self Employed / സ്വയം തൊഴിൽ" },
                        { value: "business", label: "Business / ബിസിനസ്സ്" },
                        { value: "student", label: "Student / വിദ്യാർത്ഥി" },
                        { value: "retired", label: "Retired / വിരമിച്ചു" },
                        { value: "homemaker", label: "Homemaker / ഗൃഹനാഥ" },
                        { value: "agriculture", label: "Agriculture / കൃഷി" },
                        { value: "other", label: "Other / മറ്റുള്ളവ" },
                      ]} />
                    </Field>
                    <Field label="Annual Income" malayalam="വാർഷിക വരുമാനം">
                      <Select value={form.annualIncome} onChange={(v) => updateField("annualIncome", v)} options={[
                        { value: "", label: "Select / തിരഞ്ഞെടുക്കുക" },
                        { value: "below-1l", label: "Below 1 Lakh" },
                        { value: "1l-5l", label: "1 - 5 Lakhs" },
                        { value: "5l-10l", label: "5 - 10 Lakhs" },
                        { value: "above-10l", label: "Above 10 Lakhs" },
                      ]} />
                    </Field>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Address */}
            {currentStep === 2 && (
              <div className="animate-[fadeIn_0.3s_ease-out]">
                <SectionHeader title="Residential Address" malayalam="താമസ വിലാസം" />

                <div className="space-y-7 mt-8">
                  <Field label="Address Line 1" malayalam="വിലാസം - വരി 1" required>
                    <Input value={form.addressLine1} onChange={(v) => updateField("addressLine1", v)} placeholder="House name / number, street" />
                  </Field>

                  <Field label="Address Line 2" malayalam="വിലാസം - വരി 2">
                    <Input value={form.addressLine2} onChange={(v) => updateField("addressLine2", v)} placeholder="Locality, landmark" />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <Field label="City / Town / Village" malayalam="നഗരം / ഗ്രാമം" required>
                      <Input value={form.city} onChange={(v) => updateField("city", v)} placeholder="e.g. Mayyanad" />
                    </Field>
                    <Field label="District" malayalam="ജില്ല" required>
                      <Input value={form.district} onChange={(v) => updateField("district", v)} placeholder="e.g. Kollam" />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <Field label="State" malayalam="സംസ്ഥാനം" required>
                      <Input value={form.state} onChange={(v) => updateField("state", v)} />
                    </Field>
                    <Field label="PIN Code" malayalam="പിൻ കോഡ്" required>
                      <Input
                        inputMode="numeric"
                        maxLength={6}
                        value={form.pincode}
                        onChange={(v) => updateField("pincode", v.replace(/\D/g, "").slice(0, 6))}
                        placeholder="6-digit PIN"
                      />
                    </Field>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {currentStep === 3 && (
              <div className="animate-[fadeIn_0.3s_ease-out]">
                <SectionHeader title="KYC Documents" malayalam="കെ.വൈ.സി രേഖകൾ" />

                <div className="flex items-start gap-3 mt-6 mb-8 p-5 bg-secondary-container/20 rounded-2xl">
                  <span className="material-symbols-outlined text-secondary text-xl mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                  <div>
                    <p className="text-sm text-primary font-medium">
                      Please keep your Aadhaar, PAN card, and a passport-size photo ready.
                    </p>
                    <p className="text-xs text-outline malayalam-text mt-1">
                      ആധാർ, പാൻ കാർഡ്, പാസ്‌പോർട്ട് സൈസ് ഫോട്ടോ എന്നിവ തയ്യാറാക്കുക.
                    </p>
                  </div>
                </div>

                <div className="space-y-7">
                  <Field label="Aadhaar Number" malayalam="ആധാർ നമ്പർ" required>
                    <Input
                      inputMode="numeric"
                      maxLength={14}
                      value={form.aadhaarNumber}
                      onChange={(v) => {
                        const digits = v.replace(/\D/g, "").slice(0, 12);
                        updateField("aadhaarNumber", digits.replace(/(\d{4})(?=\d)/g, "$1 "));
                      }}
                      placeholder="0000 0000 0000"
                    />
                  </Field>

                  <Field label="PAN Number" malayalam="പാൻ നമ്പർ" required>
                    <Input
                      maxLength={10}
                      value={form.panNumber}
                      onChange={(v) => updateField("panNumber", v.toUpperCase())}
                      placeholder="ABCDE1234F"
                      className="uppercase"
                    />
                  </Field>

                  <Field label="Passport Size Photo" malayalam="പാസ്‌പോർട്ട് സൈസ് ഫോട്ടോ" required>
                    <FileUpload file={form.photo} onFileChange={(f) => updateField("photo", f)} accept="image/*" />
                  </Field>

                  <Field label="Aadhaar Card (Front & Back)" malayalam="ആധാർ കാർഡ് (മുൻ‌വശവും പിൻ‌വശവും)" required>
                    <FileUpload file={form.aadhaarFile} onFileChange={(f) => updateField("aadhaarFile", f)} accept="image/*,.pdf" />
                  </Field>

                  <Field label="PAN Card" malayalam="പാൻ കാർഡ്" required>
                    <FileUpload file={form.panFile} onFileChange={(f) => updateField("panFile", f)} accept="image/*,.pdf" />
                  </Field>
                </div>

                {/* VKYC Section */}
                <div className="mt-8 pt-6">
                  <SectionHeader title="Video KYC (VKYC)" malayalam="വീഡിയോ കെ.വൈ.സി" />
                  <p className="text-xs text-outline mt-1 mb-5">
                    Complete your identity verification via a short video call.
                    <br />
                    <span className="malayalam-text">
                      ഒരു ചെറിയ വീഡിയോ കോൾ വഴി നിങ്ങളുടെ ഐഡന്റിറ്റി സ്ഥിരീകരണം പൂർത്തിയാക്കുക.
                    </span>
                  </p>

                  <div className={`rounded-2xl p-5 transition-all duration-200 ${
                    form.vkycStatus === "completed"
                      ? "bg-secondary-container/15 shadow-[inset_0_0_0_2px_var(--color-secondary)]"
                      : form.vkycStatus === "scheduled"
                      ? "bg-primary-container/8 shadow-[inset_0_0_0_2px_var(--color-primary-container)]"
                      : "bg-surface-container-high"
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        form.vkycStatus === "completed"
                          ? "bg-secondary/15"
                          : form.vkycStatus === "scheduled"
                          ? "bg-primary-container/20"
                          : "bg-surface-container-highest"
                      }`}>
                        <span
                          className={`material-symbols-outlined text-2xl ${
                            form.vkycStatus === "completed"
                              ? "text-secondary"
                              : form.vkycStatus === "scheduled"
                              ? "text-primary-container"
                              : "text-outline"
                          }`}
                          style={form.vkycStatus === "completed" ? { fontVariationSettings: "'FILL' 1" } : undefined}
                        >
                          {form.vkycStatus === "completed"
                            ? "verified_user"
                            : form.vkycStatus === "scheduled"
                            ? "schedule"
                            : "videocam"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        {form.vkycStatus === "completed" ? (
                          <>
                            <p className="text-sm font-bold text-primary">VKYC Completed</p>
                            <p className="text-xs text-secondary malayalam-text">വീഡിയോ KYC പൂർത്തിയായി</p>
                          </>
                        ) : form.vkycStatus === "scheduled" ? (
                          <>
                            <p className="text-sm font-bold text-primary">VKYC Scheduled</p>
                            <p className="text-xs text-outline malayalam-text">വീഡിയോ KYC ഷെഡ്യൂൾ ചെയ്തു</p>
                            <p className="text-xs text-outline mt-1">A bank representative will call you shortly.</p>
                            <p className="text-[11px] text-outline malayalam-text">ബാങ്ക് പ്രതിനിധി ഉടൻ നിങ്ങളെ വിളിക്കും.</p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-bold text-primary">Start Video KYC</p>
                            <p className="text-xs text-outline malayalam-text">വീഡിയോ KYC ആരംഭിക്കുക</p>
                            <p className="text-xs text-outline mt-1">A bank representative will verify your identity via video call.</p>
                            <p className="text-[11px] text-outline malayalam-text">ബാങ്ക് പ്രതിനിധി വീഡിയോ കോൾ വഴി നിങ്ങളുടെ ഐഡന്റിറ്റി പരിശോധിക്കും.</p>
                          </>
                        )}
                      </div>
                    </div>

                    {form.vkycStatus !== "completed" && (
                      <button
                        onClick={() => updateField("vkycStatus", form.vkycStatus === "scheduled" ? "completed" : "scheduled")}
                        className={`w-full mt-4 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm active:scale-[0.98] transition-all min-h-[48px] ${
                          form.vkycStatus === "scheduled"
                            ? "bg-surface-container-highest text-primary hover:bg-outline-variant/30"
                            : "heritage-gradient text-white shadow-lg shadow-primary/15"
                        }`}
                      >
                        <span className="material-symbols-outlined text-lg">
                          {form.vkycStatus === "scheduled" ? "check" : "videocam"}
                        </span>
                        {form.vkycStatus === "scheduled" ? (
                          <>Mark as Completed <span className="text-xs font-normal malayalam-text opacity-80 ml-1">പൂർത്തിയായി</span></>
                        ) : (
                          <>Schedule VKYC <span className="text-xs font-normal malayalam-text opacity-80 ml-1">ഷെഡ്യൂൾ ചെയ്യുക</span></>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Account Preferences */}
            {currentStep === 4 && (
              <div className="animate-[fadeIn_0.3s_ease-out]">
                <SectionHeader title="Account Preferences" malayalam="അക്കൗണ്ട് മുൻഗണനകൾ" />

                <div className="space-y-7 mt-8">
                  <Field label="Account Type" malayalam="അക്കൗണ്ട് തരം" required>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { value: "regular", title: "Regular Savings", malayalam: "സാധാരണ സേവിംഗ്സ്", desc: "Min. balance Rs. 100" },
                        { value: "zero-balance", title: "Zero Balance", malayalam: "സീറോ ബാലൻസ്", desc: "No minimum balance" },
                      ].map((opt) => (
                        <label
                          key={opt.value}
                          className={`flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-200 ${
                            form.accountVariant === opt.value
                              ? "bg-primary-container/8 shadow-[inset_0_0_0_2px_var(--color-primary-container)]"
                              : "bg-surface-container-high hover:bg-surface-container-highest"
                          }`}
                        >
                          <div className={`w-5 h-5 mt-0.5 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${
                            form.accountVariant === opt.value
                              ? "bg-primary-container"
                              : "bg-surface-container-highest shadow-[inset_0_0_0_2px_var(--color-outline-variant)]"
                          }`}>
                            {form.accountVariant === opt.value && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <input type="radio" name="accountVariant" value={opt.value} checked={form.accountVariant === opt.value} onChange={() => updateField("accountVariant", opt.value)} className="sr-only" />
                          <div>
                            <p className="font-bold text-sm text-primary">{opt.title}</p>
                            <p className="text-xs text-secondary malayalam-text">{opt.malayalam}</p>
                            <p className="text-xs text-outline mt-1">{opt.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </Field>

                  <Field label="Cheque Book Required?" malayalam="ചെക്ക് ബുക്ക് ആവശ്യമുണ്ടോ?">
                    <button
                      type="button"
                      onClick={() => updateField("chequeBook", !form.chequeBook)}
                      className="flex items-center gap-4 min-h-[48px]"
                    >
                      <div className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors duration-200 ${
                        form.chequeBook ? "bg-secondary" : "bg-outline-variant"
                      }`}>
                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${
                          form.chequeBook ? "translate-x-6" : "translate-x-0"
                        }`} />
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {form.chequeBook ? "Yes / അതെ" : "No / ഇല്ല"}
                      </span>
                    </button>
                    {form.chequeBook && (
                      <p className="text-xs text-outline mt-3 pl-[74px]">
                        Minimum balance of Rs. 1,000 required.
                        <br />
                        <span className="malayalam-text">കുറഞ്ഞ ബാലൻസ് 1,000 രൂപ ആവശ്യമാണ്.</span>
                      </p>
                    )}
                  </Field>

                  <Field label="Initial Deposit Amount (Rs.)" malayalam="ആദ്യ നിക്ഷേപ തുക (രൂപ)">
                    <Input
                      inputMode="numeric"
                      value={form.initialDeposit}
                      onChange={(v) => updateField("initialDeposit", v.replace(/\D/g, ""))}
                      placeholder="e.g. 1000"
                    />
                  </Field>

                  {/* Nominee Section */}
                  <div className="pt-4">
                    <SectionHeader title="Nominee Details" malayalam="നോമിനി വിവരങ്ങൾ" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mt-6">
                      <Field label="Nominee Full Name" malayalam="നോമിനിയുടെ പേര്">
                        <Input value={form.nomineeFullName} onChange={(v) => updateField("nomineeFullName", v)} placeholder="Enter nominee name" />
                      </Field>
                      <Field label="Relationship" malayalam="ബന്ധം">
                        <Select value={form.nomineeRelationship} onChange={(v) => updateField("nomineeRelationship", v)} options={[
                          { value: "", label: "Select / തിരഞ്ഞെടുക്കുക" },
                          { value: "spouse", label: "Spouse / ഭാര്യ/ഭർത്താവ്" },
                          { value: "parent", label: "Parent / മാതാപിതാക്കൾ" },
                          { value: "child", label: "Child / കുട്ടി" },
                          { value: "sibling", label: "Sibling / സഹോദരൻ/സഹോദരി" },
                          { value: "other", label: "Other / മറ്റുള്ളവ" },
                        ]} />
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <div className="animate-[fadeIn_0.3s_ease-out]">
                <SectionHeader title="Review Your Application" malayalam="നിങ്ങളുടെ അപേക്ഷ അവലോകനം ചെയ്യുക" />
                <p className="text-sm text-outline mt-2 mb-8">
                  Please verify all details before submitting.
                  <br />
                  <span className="malayalam-text text-xs">സമർപ്പിക്കുന്നതിന് മുമ്പ് എല്ലാ വിവരങ്ങളും പരിശോധിക്കുക.</span>
                </p>

                <div className="space-y-5">
                  {/* Personal Details */}
                  <ReviewCard title="Personal Details" malayalam="വ്യക്തിഗത വിവരങ്ങൾ" onEdit={() => setCurrentStep(1)}>
                    <ReviewRow label="Full Name" malayalam="പൂർണ്ണ നാമം" value={form.fullName} />
                    <ReviewRow label="Date of Birth" malayalam="ജനന തീയതി" value={form.dateOfBirth ? new Date(form.dateOfBirth).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : ""} />
                    <ReviewRow label="Gender" malayalam="ലിംഗം" value={genderLabels[form.gender] || ""} />
                    <ReviewRow label="Father's / Spouse's Name" malayalam="പിതാവിന്റെ / ഭാര്യ/ഭർത്താവിന്റെ പേര്" value={form.fatherOrSpouseName} />
                    <ReviewRow label="Mobile Number" malayalam="മൊബൈൽ നമ്പർ" value={form.mobileNumber} />
                    <ReviewRow label="Email" malayalam="ഇ-മെയിൽ" value={form.email} />
                    <ReviewRow label="Occupation" malayalam="തൊഴിൽ" value={occupationLabels[form.occupation] || ""} />
                    <ReviewRow label="Annual Income" malayalam="വാർഷിക വരുമാനം" value={incomeLabels[form.annualIncome] || ""} />
                  </ReviewCard>

                  {/* Address */}
                  <ReviewCard title="Address" malayalam="വിലാസം" onEdit={() => setCurrentStep(2)}>
                    <div className="py-2.5">
                      <p className="text-sm font-medium text-primary leading-relaxed">
                        {[form.addressLine1, form.addressLine2, form.city, form.district].filter(Boolean).join(", ")}
                        {form.state && <><br />{form.state}{form.pincode ? ` - ${form.pincode}` : ""}</>}
                      </p>
                      {!form.addressLine1 && <p className="text-sm text-outline">—</p>}
                    </div>
                  </ReviewCard>

                  {/* KYC Documents */}
                  <ReviewCard title="KYC Documents" malayalam="കെ.വൈ.സി രേഖകൾ" onEdit={() => setCurrentStep(3)}>
                    <ReviewRow label="Aadhaar Number" malayalam="ആധാർ നമ്പർ" value={form.aadhaarNumber} />
                    <ReviewRow label="PAN Number" malayalam="പാൻ നമ്പർ" value={form.panNumber} />
                    <ReviewFileRow label="Photo" malayalam="ഫോട്ടോ" file={form.photo} />
                    <ReviewFileRow label="Aadhaar Card" malayalam="ആധാർ കാർഡ്" file={form.aadhaarFile} />
                    <ReviewFileRow label="PAN Card" malayalam="പാൻ കാർഡ്" file={form.panFile} />
                    <div className="flex justify-between items-center py-2.5">
                      <div>
                        <p className="text-xs text-outline uppercase tracking-wider">VKYC Status</p>
                        <p className="text-[11px] text-outline malayalam-text">വീഡിയോ KYC</p>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        form.vkycStatus === "completed"
                          ? "bg-secondary-container text-on-secondary-container"
                          : form.vkycStatus === "scheduled"
                          ? "bg-primary-container/15 text-primary-container"
                          : "bg-surface-container-high text-outline"
                      }`}>
                        {form.vkycStatus === "completed" ? "Completed" : form.vkycStatus === "scheduled" ? "Scheduled" : "Not Started"}
                      </span>
                    </div>
                  </ReviewCard>

                  {/* Account Preferences */}
                  <ReviewCard title="Account Preferences" malayalam="അക്കൗണ്ട് മുൻഗണനകൾ" onEdit={() => setCurrentStep(4)}>
                    <ReviewRow label="Account Type" malayalam="അക്കൗണ്ട് തരം" value={form.accountVariant === "zero-balance" ? "Zero Balance" : "Regular Savings"} />
                    <ReviewRow label="Cheque Book" malayalam="ചെക്ക് ബുക്ക്" value={form.chequeBook ? "Yes" : "No"} />
                    <ReviewRow label="Initial Deposit" malayalam="ആദ്യ നിക്ഷേപം" value={form.initialDeposit ? `Rs. ${Number(form.initialDeposit).toLocaleString("en-IN")}` : ""} />
                    <ReviewRow label="Nominee" malayalam="നോമിനി" value={form.nomineeFullName ? `${form.nomineeFullName} (${relationshipLabels[form.nomineeRelationship] || form.nomineeRelationship})` : ""} />
                  </ReviewCard>
                </div>

                {/* Confirmation note */}
                <div className="flex items-start gap-3 mt-8 p-5 bg-secondary-container/20 rounded-2xl">
                  <span className="material-symbols-outlined text-secondary text-xl mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  <div>
                    <p className="text-sm text-primary font-medium">
                      By submitting, you confirm that all details are accurate.
                    </p>
                    <p className="text-xs text-outline malayalam-text mt-1">
                      സമർപ്പിക്കുന്നതിലൂടെ, എല്ലാ വിവരങ്ങളും കൃത്യമാണെന്ന് നിങ്ങൾ സ്ഥിരീകരിക്കുന്നു.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 gap-4">
            {currentStep > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-4 rounded-xl text-primary font-bold text-sm bg-surface-container-lowest hover:bg-surface-container-high active:scale-95 transition-all shadow-[0_2px_8px_rgba(0,45,86,0.06)] min-h-[52px]"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Previous
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-10 py-4 rounded-xl heritage-gradient text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all min-h-[52px]"
              >
                {currentStep === 4 ? "Review" : "Next"}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-10 py-4 rounded-xl bg-secondary text-on-secondary font-bold text-sm shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all min-h-[52px]"
              >
                Submit Application
                <span className="material-symbols-outlined text-lg">check</span>
              </button>
            )}
          </div>

          {/* Step info */}
          <p className="text-center text-xs text-outline mt-4">
            Step {currentStep} of {steps.length} — {steps[currentStep - 1].fullLabel}
            <span className="malayalam-text ml-2">{steps[currentStep - 1].malayalam}</span>
          </p>
        </div>
      </main>
      <SideNav />
      <BottomNav />
    </>
  );
}

/* ─── Design-System Components ─── */

function SectionHeader({ title, malayalam }: { title: string; malayalam: string }) {
  return (
    <div>
      <h2 className="font-headline font-bold text-xl text-primary">{title}</h2>
      <p className="text-sm text-secondary malayalam-text mt-0.5">{malayalam}</p>
    </div>
  );
}

function Field({ label, malayalam, required, children }: {
  label: string;
  malayalam: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <span className="text-xs font-bold text-primary uppercase tracking-wider leading-tight">
          {label}
          {required && <span className="text-error ml-0.5">*</span>}
        </span>
        <p className="text-[11px] text-outline malayalam-text leading-snug mt-0.5">
          {malayalam}
        </p>
      </div>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text", className = "", inputMode, maxLength }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  inputMode?: "numeric" | "tel" | "email" | "text";
  maxLength?: number;
}) {
  return (
    <input
      type={type}
      inputMode={inputMode}
      maxLength={maxLength}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-surface-container-high rounded-xl py-4 px-5 text-primary font-medium text-[15px] border-2 border-transparent outline-none transition-all duration-200 focus:border-secondary/20 focus:shadow-[0_0_0_4px_rgba(119,90,25,0.08)] placeholder:text-outline/60 placeholder:font-normal min-h-[52px] ${className}`}
    />
  );
}

function Select({ value, onChange, options }: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-surface-container-high rounded-xl py-4 px-5 text-primary font-medium text-[15px] border-2 border-transparent outline-none transition-all duration-200 focus:border-secondary/20 focus:shadow-[0_0_0_4px_rgba(119,90,25,0.08)] min-h-[52px] appearance-none"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2373777f' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", backgroundSize: "18px" }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

function FileUpload({ file, onFileChange, accept }: {
  file: File | null;
  onFileChange: (f: File | null) => void;
  accept: string;
}) {
  return (
    <div className={`relative flex items-center gap-4 p-5 rounded-2xl transition-all duration-200 min-h-[72px] ${
      file
        ? "bg-secondary-container/15 shadow-[inset_0_0_0_2px_var(--color-secondary)]"
        : "bg-surface-container-high shadow-[inset_0_0_0_2px_transparent] hover:shadow-[inset_0_0_0_2px_rgba(119,90,25,0.15)]"
    }`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
        file ? "bg-secondary/15" : "bg-surface-container-highest"
      }`}>
        <span className={`material-symbols-outlined text-2xl ${file ? "text-secondary" : "text-outline"}`}
          style={file ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          {file ? "check_circle" : "cloud_upload"}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        {file ? (
          <p className="text-sm text-primary font-medium truncate">{file.name}</p>
        ) : (
          <>
            <p className="text-sm text-primary font-medium">Tap to upload</p>
            <p className="text-xs text-outline malayalam-text">അപ്‌ലോഡ് ചെയ്യുക</p>
          </>
        )}
      </div>
      {file && (
        <button
          onClick={(e) => { e.stopPropagation(); onFileChange(null); }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-outline hover:text-error hover:bg-error-container/30 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      )}
      {!file && (
        <input
          type="file"
          accept={accept}
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      )}
    </div>
  );
}

/* ─── Label Maps ─── */

const genderLabels: Record<string, string> = { male: "Male / പുരുഷൻ", female: "Female / സ്ത്രീ", other: "Other / മറ്റുള്ളവ" };
const occupationLabels: Record<string, string> = {
  salaried: "Salaried", "self-employed": "Self Employed", business: "Business",
  student: "Student", retired: "Retired", homemaker: "Homemaker", agriculture: "Agriculture", other: "Other",
};
const incomeLabels: Record<string, string> = {
  "below-1l": "Below 1 Lakh", "1l-5l": "1 - 5 Lakhs", "5l-10l": "5 - 10 Lakhs", "above-10l": "Above 10 Lakhs",
};
const relationshipLabels: Record<string, string> = {
  spouse: "Spouse", parent: "Parent", child: "Child", sibling: "Sibling", other: "Other",
};

/* ─── Review Components ─── */

function ReviewCard({ title, malayalam, onEdit, children }: {
  title: string;
  malayalam: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-container-low rounded-2xl p-5 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-headline font-bold text-sm text-primary">{title}</h3>
          <p className="text-[11px] text-secondary malayalam-text">{malayalam}</p>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-secondary text-xs font-bold hover:bg-secondary-container/30 active:scale-95 transition-all min-h-[40px]"
        >
          <span className="material-symbols-outlined text-base">edit</span>
          Edit
        </button>
      </div>
      <div className="divide-y divide-outline-variant/15">
        {children}
      </div>
    </div>
  );
}

function ReviewRow({ label, malayalam, value }: {
  label: string;
  malayalam: string;
  value: string;
}) {
  return (
    <div className="py-3">
      <p className="text-[11px] text-outline uppercase tracking-wider font-medium">{label}</p>
      <p className="text-[10px] text-outline malayalam-text leading-snug">{malayalam}</p>
      <p className={`text-sm mt-1 break-words ${value ? "font-medium text-primary" : "text-outline"}`}>
        {value || "—"}
      </p>
    </div>
  );
}

function ReviewFileRow({ label, malayalam, file }: {
  label: string;
  malayalam: string;
  file: File | null;
}) {
  return (
    <div className="flex justify-between items-center gap-4 py-3">
      <div>
        <p className="text-xs text-outline uppercase tracking-wider font-medium">{label}</p>
        <p className="text-[11px] text-outline malayalam-text leading-snug">{malayalam}</p>
      </div>
      {file ? (
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <span className="text-xs font-medium text-primary truncate max-w-[120px]">{file.name}</span>
        </div>
      ) : (
        <span className="text-xs text-outline">Not uploaded</span>
      )}
    </div>
  );
}
