import Link from "next/link";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import SideNav from "@/components/SideNav";

const accounts = [
  {
    title: "Savings Account",
    malayalam: "സേവിംഗ്സ് അക്കൗണ്ട്",
    description:
      "Secure your wealth with flexible withdrawals and competitive interest rates for your daily needs.",
    icon: "account_balance_wallet",
    iconBg: "bg-primary-container text-on-primary",
    buttonStyle: "heritage-gradient text-on-primary shadow-lg shadow-primary/20",
    cardBg: "bg-surface-container-lowest",
    hasAccent: true,
    href: "/accounts/savings",
  },
  {
    title: "Current Account",
    malayalam: "കറന്റ് അക്കൗണ്ട്",
    description:
      "Designed for entrepreneurs and businesses with unlimited transactions and overdraft facilities.",
    icon: "business_center",
    iconBg: "bg-secondary-container text-secondary",
    buttonStyle:
      "bg-surface-container-highest text-primary hover:bg-outline-variant/30",
    cardBg: "bg-surface-container-low",
    hasAccent: false,
    href: "/accounts/current",
  },
  {
    title: "Fixed Deposit (FD)",
    malayalam: "സ്ഥിര നിക്ഷേപം",
    description:
      "Maximize your earnings with high-yield returns and guaranteed safety for your lump sum investments.",
    icon: "lock",
    iconBg: "bg-primary text-on-primary",
    iconFilled: true,
    buttonStyle: "heritage-gradient text-on-primary shadow-lg shadow-primary/20",
    cardBg: "bg-surface-container-lowest",
    hasAccent: true,
    href: "/accounts/fd",
  },
  {
    title: "Recurring Deposit (RD)",
    malayalam: "ആവർത്തന നിക്ഷേപം",
    description:
      "Build your savings habit monthly and watch your wealth grow with disciplined small contributions.",
    icon: "calendar_month",
    iconBg: "bg-secondary text-on-secondary",
    buttonStyle:
      "bg-surface-container-highest text-primary hover:bg-outline-variant/30",
    cardBg: "bg-surface-container-low",
    hasAccent: false,
    href: "/accounts/rd",
  },
];

export default function AccountSelectionPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-32 md:pl-24">
        {/* Hero */}
        <div className="mb-16">
          <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-primary tracking-tight mb-2">
            Open an Account
          </h1>
          <p className="font-headline font-medium text-secondary text-xl malayalam-text mb-4">
            അക്കൗണ്ട് തുറക്കുക
          </p>
          <p className="font-body text-outline text-lg max-w-2xl leading-relaxed">
            Select the type of account you would like to open with Mayyanad
            Regional Co-operative Bank.
          </p>
          <p className="font-body text-outline text-base max-w-2xl malayalam-text">
            മയ്യനാട് റീജിയണൽ സഹകരണ ബാങ്കിൽ നിങ്ങൾക്ക് ആവശ്യമുള്ള അക്കൗണ്ട് തിരഞ്ഞെടുക്കുക.
          </p>
        </div>

        {/* Account Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accounts.map((account) => (
            <div
              key={account.title}
              className={`group relative flex flex-col ${account.cardBg} rounded-xl p-8 shadow-[0_4px_24px_rgba(0,45,86,0.04)] hover:shadow-[0_8px_32px_rgba(0,45,86,0.08)] transition-all duration-300 ${
                account.hasAccent
                  ? "border border-transparent hover:border-secondary/20"
                  : ""
              } overflow-hidden`}
            >
              {/* Decorative accent */}
              {account.hasAccent && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-500" />
              )}

              {/* Icon */}
              <div
                className={`mb-6 h-12 w-12 flex items-center justify-center rounded-xl ${account.iconBg}`}
              >
                <span
                  className="material-symbols-outlined text-2xl"
                  style={
                    account.iconFilled
                      ? { fontVariationSettings: "'FILL' 1" }
                      : undefined
                  }
                >
                  {account.icon}
                </span>
              </div>

              {/* Content */}
              <div className="mb-8">
                <h2 className="font-headline font-bold text-xl text-primary">
                  {account.title}
                </h2>
                <h3 className="malayalam-text font-headline font-medium text-secondary mt-1">
                  {account.malayalam}
                </h3>
                <p className="mt-4 font-body text-outline text-sm leading-relaxed">
                  {account.description}
                </p>
              </div>

              {/* CTA */}
              <div className="mt-auto relative z-10">
                <Link
                  href={account.href}
                  className={`w-full block text-center px-6 py-4 rounded-xl font-bold text-sm tracking-wide active:scale-95 transition-all ${account.buttonStyle}`}
                >
                  Open Now
                </Link>
              </div>
            </div>
          ))}
        </div>

      </main>
      <SideNav />
      <BottomNav />
    </>
  );
}
