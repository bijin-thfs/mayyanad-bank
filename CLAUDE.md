@AGENTS.md

# Mayyanad Regional Co-operative Bank — Mobile Banking App

## Overview
A bilingual (English + Malayalam) mobile banking web app for **Mayyanad Regional Co-operative Bank (MRCB)**. Built with Next.js 16, React 19, Tailwind CSS 4, and configured as a PWA.

## Deployment
- **Live site:** https://mayyanad-bank-bijins-projects.vercel.app
- **GitHub repo:** https://github.com/bijin-thfs/mayyanad-bank
- **Vercel project:** bijins-projects/mayyanad-bank
- **Auto-deploy:** Pushing to `main` triggers a production deploy on Vercel.

## Tech Stack
- **Framework:** Next.js 16.2.3 (Turbopack)
- **UI:** React 19.2.4, Tailwind CSS 4, Material Symbols icons
- **PWA:** next-pwa, service worker at `public/sw.js`, manifest at `public/manifest.json`
- **Language:** TypeScript

## Project Structure
- `src/app/page.tsx` — Login page (OTP-based authentication flow)
- `src/app/accounts/` — Account listing and savings account pages
- `src/app/accounts/savings/` — Savings account details
- `src/app/accounts/savings/success/` — Transaction success page
- `src/app/settings/` — Settings page
- `src/app/loading.tsx` — Loading spinner
- `src/components/BottomNav.tsx` — Mobile bottom navigation
- `src/components/Header.tsx` — App header
- `src/components/SideNav.tsx` — Desktop side navigation
- `public/mrcb-hero.jpg` — Hero image for mobile login
- `public/mrcb-logo.png` — Bank logo

## Bilingual UI — English + Malayalam

This app serves Mayyanad Regional Co-operative Bank. The primary users are elderly and Malayalam-speaking people.

- **English is the primary language**, but every user-facing label, heading, description, and call-to-action must include a Malayalam translation alongside it.
- Follow the pattern already established: English heading first, Malayalam subtitle below (using the `malayalam-text` class for proper scaling at 110% and 1.6 line-height).
- Button labels, form labels, feature descriptions, error messages, and footer text should all be bilingual.
- Keep Malayalam text accurate and natural — not a word-for-word transliteration.

## Design System
- Heritage-inspired color palette using CSS custom properties (primary, secondary, surface variants)
- `heritage-gradient` class for primary action buttons
- `malayalam-text` class for Malayalam text (110% scale, 1.6 line-height)
- `font-headline` for headings
- Material Symbols Outlined for icons (with filled variants via `fontVariationSettings`)
- Mobile-first responsive design with desktop sidebar layout
