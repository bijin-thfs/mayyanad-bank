---
name: Commit and push workflow preference
description: User prefers immediate commit-and-push after each change, no batching
type: feedback
originSessionId: 7218690c-2eb3-4e55-ac51-748652255c4d
---
User consistently asks to commit and push after each individual change rather than batching multiple changes.

**Why:** Keeps the Vercel auto-deploy in sync with each incremental change, making it easy to review live.

**How to apply:** After making a change, ask if the user wants to commit and push (or just do it if they say "commit and push" in their request). Keep commits atomic — one change per commit.
