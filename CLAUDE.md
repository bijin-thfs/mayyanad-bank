@AGENTS.md

# Mayyanad Regional Co-operative Bank — Customer PWA

## Overview
A bilingual (English + Malayalam) Progressive Web App for **Mayyanad Regional Co-operative Bank (MRCB)**, a cooperative bank in Mayyanad, Kollam, Kerala, India (est. 1954). Customers use this app to open savings accounts, current accounts, FDs, and RDs. The primary users are **elderly and Malayalam-speaking** people.

## Live URLs
- **Production:** https://mayyanad-bank-bijins-projects.vercel.app
- **GitHub:** https://github.com/bijin-thfs/mayyanad-bank
- **Vercel project:** bijins-projects/mayyanad-bank
- **Auto-deploy:** Pushing to `main` triggers production deploy on Vercel.

## Companion App
This PWA shares a **Supabase backend** with the staff CRM:
- **CRM repo:** https://github.com/bijin-thfs/mrcb-crm
- **CRM live:** https://mrcb-crm.vercel.app
- Both apps read/write to the same Supabase database. The PWA writes applications, the CRM processes them.

## Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS 4, Material Symbols Outlined icons
- **Backend:** Supabase (shared with CRM)
- **PWA:** Service worker at `public/sw.js`, manifest at `public/manifest.json`
- **Language:** TypeScript

## Supabase Backend
- **Project URL:** `https://ipydxexifkxyldcgjroo.supabase.co`
- **Client:** `src/lib/supabase.ts` (uses `@supabase/ssr` `createBrowserClient`)
- **Env vars:** `.env.local` (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- **Schema:** Defined in `mrcb-crm/supabase/schema.sql` (the CRM repo is the source of truth for schema)
- **Key tables used by PWA:** `customers`, `applications`, `application_documents`

## Project Structure
```
src/
├── app/
│   ├── page.tsx                          # Login page (OTP-based, uncontrolled input for Android compat)
│   ├── layout.tsx                        # Root layout (Manrope + Inter fonts, Material Symbols, PWA meta)
│   ├── loading.tsx                       # Splash screen with MRCB banner logo
│   ├── globals.css                       # Design system tokens, animations
│   ├── accounts/
│   │   ├── page.tsx                      # Account selection (Savings, Current, FD, RD cards)
│   │   └── savings/
│   │       ├── page.tsx                  # 5-step savings account form (LIVE — submits to Supabase)
│   │       └── success/
│   │           └── page.tsx              # Animated success page (reads ref number from ?ref= param)
│   └── settings/
│       └── page.tsx                      # User settings (language, security, notifications, accessibility)
├── components/
│   ├── Header.tsx                        # Top bar with MRCB logo + translate button
│   ├── BottomNav.tsx                     # Mobile bottom nav (Accounts, History, Settings)
│   └── SideNav.tsx                       # Desktop side rail with tooltip hover labels
├── lib/
│   └── supabase.ts                      # Supabase browser client
public/
├── mrcb-logo.png                        # Circular MRCB logo (used throughout)
├── mrcb-banner.jpg                      # Full banner logo (splash screen)
├── mrcb-hero.jpg                        # Hero image for mobile login
├── manifest.json                        # PWA manifest
├── sw.js                                # Service worker (network-first, caches key pages)
└── icons/                               # PWA icons (16, 32, 180, 192, 512)
```

## Pages & Features

### Login (`/`)
- Phone number input with +91 prefix
- **Uncontrolled input pattern** (`onInput` + ref) to fix Android Chrome IME desync — do NOT switch back to controlled `value` prop
- `inputMode="numeric"`, `maxLength={11}`, `type="text"` — NOT `type="tel"`
- Validation: must start with 6-9, exactly 10 digits
- 6-digit OTP input with auto-focus between boxes (grid layout, responsive)
- Desktop: split layout with heritage anchor section (logo, bank name, Malayalam tagline)
- Mobile: MRCB hero image + bank name at top

### Account Selection (`/accounts`)
- 4 account type cards: Savings, Current, FD, RD
- Each card has bilingual title, description, "Open Now" button
- Savings links to `/accounts/savings`, others to `/accounts/current`, `/accounts/fd`, `/accounts/rd` (placeholder)
- Bilingual hero heading

### Savings Account Form (`/accounts/savings`)
- **5-step multi-step form:**
  1. Personal Details — full name, DOB, gender, father/spouse, mobile, email, occupation, income
  2. Address — line1, line2, city, district, state (default Kerala), pincode
  3. KYC Documents — Aadhaar number, PAN number, photo upload, Aadhaar upload, PAN upload, VKYC section (schedule/complete)
  4. Account Preferences — Regular vs Zero Balance (radio cards), cheque book toggle, initial deposit, nominee
  5. Review & Submit — read-only summary cards with Edit buttons per section, confirmation note
- Progress indicator: CSS grid with circles + connector lines + labels
- Form state persists across steps
- **Submit is LIVE** — inserts into Supabase: `customers` → `applications` → uploads to `kyc-documents` Storage → `application_documents` → `activity_log`
- Generates reference number `MRCB-{timestamp}`, navigates to success page with `?ref=` param

### Success Page (`/accounts/savings/success`)
- Reads reference number from `?ref=` URL param (falls back to generated one)
- Staged animation (5 phases over 2.2s): ring draw → circle scale → checkmark + sparkles → title fade → cards fade
- Reference number, status card, 4-step timeline, Share/Save buttons
- Respects `prefers-reduced-motion`

### Settings (`/settings`)
- Profile display, Language toggle (English/Malayalam first), Security (Change PIN, sessions, logout all devices), Notifications (SMS/transaction toggles), Accessibility (text size selector, dark mode toggle), Help & Support (bank contact, branch, terms, privacy, version), Logout button

## Design System — "Modern Heritage"
Defined in `src/app/globals.css` using `@theme inline` (Tailwind CSS 4 syntax).

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `primary` | #001833 | Text, headers, primary actions |
| `primary-container` | #002D56 | Active states, filled containers |
| `secondary` | #775A19 | Heritage Gold — accents, badges, CTAs |
| `secondary-container` | #FED488 | Tags, highlights |
| `surface` | #F8F9FA | Page background |
| `surface-container-lowest` | #FFFFFF | Card backgrounds |
| `surface-container-high` | #E7E8E9 | Input field fills |
| `error` | #BA1A1A | Errors, destructive actions |

### Typography
- **Headlines:** Manrope (font-headline) — extrabold for titles
- **Body:** Inter (font-body) — medium for content
- **Malayalam:** `.malayalam-text` class — 110% size, 1.6 line-height

### Rules
- No 1px borders — use surface color shifts
- Filled inputs with `surface-container-high`, gold ghost border on focus
- `.heritage-gradient` for primary CTAs (linear-gradient #001833 → #002D56)
- `.glass-effect` for floating nav (80% opacity + 20px blur)
- Ambient navy-tinted shadows: `rgba(0,45,86,0.04-0.06)`
- Minimum 48dp touch targets for elderly users

## Bilingual UI — English + Malayalam
- **English is primary**, Malayalam accompanies every user-facing label
- Pattern: English heading first, Malayalam subtitle below using `.malayalam-text`
- Button labels: English only (exception: some have Malayalam in parentheses)
- Form labels: English label + Malayalam hint
- Error messages: bilingual
- Keep Malayalam natural, not word-for-word transliteration

## Known Technical Decisions
- **Phone input uses uncontrolled pattern** — Android Chrome IME desyncs React controlled inputs. Uses `onInput` + `ref` + direct DOM write-back. See facebook/react#14044.
- **OTP inputs use CSS Grid** (`grid-cols-6`) not fixed `w-14` to prevent overflow on small screens.
- **Service worker** uses network-first strategy with cache fallback.
- **`next.config.ts`** has `allowedDevOrigins: ["192.168.1.11"]` for local mobile testing.
