# Elevatia Website - AI Context Guide

> Context for Claude sessions in this repo. Companion to the app repo's CLAUDE.md
> (`repos/ElevatiaRN-Production/CLAUDE.md`) and the workspace brief (`Elevatia.md`).

## Overview

Two products in one Next.js app:

1. **Marketing site** (`getelevatia.com`) - public pages, App Store funnel, email capture.
2. **Partners portal** (`/partners`) - gated dashboard where gym and clinic partners
   manage redemption codes, assigned paths, and their member roster.

Deployed on Vercel. Shares the production Firebase project with the mobile app, so
partner data and app user data live in the same Firestore.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 3, `src/app/globals.css` |
| Auth | Firebase Auth (client SDK) |
| Data | Firestore via `firebase-admin` in route handlers |
| Hosting | Vercel (`output: 'standalone'`) |

## Project Structure

```
src/
├── app/
│   ├── page.tsx              Landing page
│   ├── about|contact|join|privacy|terms|stay-in-touch|verify-email/
│   ├── partners/
│   │   ├── page.tsx          Partner marketing page
│   │   ├── login/            Partner sign in
│   │   └── dashboard/[slug]/ Per-organization dashboard
│   ├── admin/partners/       Super admin view
│   └── api/
│       ├── partners/         auth, codes, organizations, paths,
│       │                     path-requests, stats, users
│       └── subscribe/        Email capture
├── components/
│   ├── layout/               Header, Footer, MainNav
│   ├── partners/             Dashboard tabs, LoginForm, StatsCard
│   ├── BackgroundDesign.tsx  Bronze gradient treatment
│   └── Logo.tsx
├── lib/
│   ├── firebase.ts           Client SDK init (NEXT_PUBLIC_* vars)
│   ├── firebase-admin.ts     Admin SDK init (server only)
│   └── auth-context.tsx      AuthProvider, useAuth
├── hooks/useScrollAnimation.ts
└── types/partners.ts         PartnerAdmin, Organization
```

## Auth Model (IMPORTANT)

Authentication and authorization are separate steps, split across client and server.

**Client** (`src/lib/auth-context.tsx`) signs the user in with Firebase Auth. Three
methods are supported: email and password, Apple (`OAuthProvider`), and phone with
`RecaptchaVerifier`. Account linking is handled explicitly, so a user who signs in
with Apple and later with email is merged rather than duplicated.

**Server** (`src/app/api/partners/*`) authorizes. Every partner route expects an
`Authorization: Bearer <idToken>` header, verifies it with `adminAuth.verifyIdToken`,
then resolves the caller:

- `uid === SUPER_ADMIN_UID` grants full access across all organizations.
- Otherwise the route looks up `partnerAdmins` where `id == uid`, then loads the
  linked `organizations` doc.
- No match and not super admin returns 403.

Never trust a slug or organization ID from the request body. Always resolve the
organization from the verified token.

## Firestore Collections

| Collection | Purpose |
|------------|---------|
| `partnerAdmins` | Partner admin records, each linked to one `organizationId` |
| `organizations` | Partner orgs (gyms, clinics), keyed by slug for dashboard routes |

The app repo's collections (`users`, `userPaths`, `paths`, and so on) are the same
Firestore instance. Read them carefully and do not write app-owned documents from
the website without checking the app's service layer first.

## Environment

Copy the values from Zack. `.env.local` is gitignored and must stay that way.

| Variable | Side |
|----------|------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` and the other `NEXT_PUBLIC_FIREBASE_*` vars | Client |
| `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | Server |
| `SUPER_ADMIN_UID` | Server |

## Commands

```bash
npm run dev     # next dev --turbopack, http://localhost:3000
npm run build
npm run start
npm run lint
```

## Common Gotchas

1. **`firebase-admin` initializes silently or not at all.** `src/lib/firebase-admin.ts`
   only calls `initializeApp` when all three server vars are present. Missing one does
   not throw at import time, it fails later at the call site. If every partner API route
   returns an auth error, check the env before debugging the route.
2. **`FIREBASE_PRIVATE_KEY` needs escaped newlines.** The code does
   `.replace(/\\n/g, '\n')`, so store it with literal `\n` sequences, not real breaks.
3. **`NEXT_PUBLIC_` is a build-time prefix.** Changing a client var requires restarting
   the dev server. It is also public in the browser bundle, so nothing secret goes there.
4. **Turbopack is on in dev only.** If a bug reproduces in `build` but not `dev`, that
   difference is the first thing to check.
5. **Favicon caching is deliberate.** Long `Cache-Control` headers are set in both
   `next.config.ts` and `vercel.json`. Changing icon files needs a cache-busting name.

## Conventions

Follow the founder conventions in `Elevatia.md`. The ones that bite most often here:

- **No em dashes in any user-facing copy.** Ever.
- Coach voice: calm, direct, personal. Sow, seed, and harvest metaphors.
- No checklist language, no progress bars, no percentages.
- Never describe Elevatia as "AI-powered". The engine is proprietary, deterministic,
  and explainable, with a language model only at the presentation layer.
- Bronze palette: `#B3835C` bronze, `#E8C49A` light, `#5A3F28` deep, `#0A0A0B` dark
  background. Manrope typeface.
- **This repo's default branch is `main`.** The app repo uses `production`, so do not
  assume one from the other. Branch off `main`, open a PR back to it, and never push
  to it directly.
