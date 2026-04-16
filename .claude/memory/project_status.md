---
name: Project status as of 2026-04-16
description: Current state of MRCB app — login page, accounts, settings built; OTP flow is simulated
type: project
originSessionId: 7218690c-2eb3-4e55-ac51-748652255c4d
---
As of 2026-04-16, the app has:
- **Login page** with OTP-based flow (simulated, no real backend). MRCB hero image at top on mobile, desktop has heritage sidebar.
- **Accounts page** with savings account listing
- **Savings account detail** page with transaction success flow
- **Settings page**
- **PWA support** with service worker and manifest
- **Shared components:** BottomNav (mobile), Header, SideNav (desktop)

**What's missing/next:** No real backend or API integration yet. OTP verification is simulated with a timeout redirect. No actual account data or transaction processing.

**Why:** This is the initial UI build phase — getting the look and flow right before connecting to a backend.

**How to apply:** Treat all data as mock/placeholder. Don't assume API endpoints exist.
