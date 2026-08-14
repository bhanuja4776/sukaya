# SUKAYA Phase 3A — Foundation Report

**Status: Foundation implemented and verified (lint/typecheck/build/runtime all pass). No homepage, product pages, or checkout built. Awaiting approval before Phase 3B.**

## 1. What was implemented

- Reorganized source material per your instruction: `docs/archive/sukaya-site-archive/` → `reference/sukaya-site-archive/` (git-tracked rename, history preserved), `docs/sukaya-content.pdf` left in place. Nothing in either was modified or deleted.
- Scaffolded a Next.js (App Router) + TypeScript + Tailwind CSS project at the repo root.
- Implemented the full design-token system from `docs/design-system.md` as a Tailwind v4 CSS-first theme (`styles/globals.css`).
- Loaded the two verified brand typefaces (Josefin Sans, Righteous) via `next/font/google`, wired per the Phase 2 approval decision (Josefin Sans primary everywhere, Righteous logo-only).
- Built reusable layout primitives (`Container`, `Section`), motion primitives (`FadeUp`, `ImageReveal`, `RevealGroup` + a central `variants.ts`), and base UI primitives (`Button`, `Badge`, `AwaitingAssetPlaceholder`, `SkipLink`, `VisuallyHidden`).
- Built the content/data layer: `content/products.ts`, `content/site.ts`, `content/navigation.ts`, `content/assets.ts` — structured, verified data, no fabricated fields.
- Copied the 5 unambiguously-usable verified images into `public/images/`; left the 3 flagged existing assets (AI-generation-flagged hero image, 2 Getty stock images) untouched in `reference/`, registered but not wired into any component.
- Added a minimal `app/page.tsx` **foundation preview** page (explicitly not the homepage) to verify tokens/primitives/content render and build together end-to-end.
- Configured `components.json` for future shadcn/ui CLI use — config only, no components installed yet (none of the approved candidate areas are in scope for this phase).
- Fixed a pre-existing gap: `eslint.config.mjs` now excludes `docs/**` and `reference/**` (the linter was otherwise scanning the preserved third-party GoDaddy JS bundles in the archive as if they were our code).

## 2. Dependencies added

Beyond `create-next-app`'s own defaults (`next`, `react`, `react-dom`, Tailwind v4, TypeScript, ESLint — all current stable, project-compatible versions: Next.js 16.3.1, React 19.2.8, TypeScript 5.9.3, Tailwind 4.3.3):

| Package | Version | Why |
|---|---|---|
| `motion` | 13.1.0 | Approved animation library (docs/component-system.md §1) — imported as `motion/react` |
| `clsx` | latest | Class-name composition, used by `lib/utils.ts`'s `cn()` |
| `tailwind-merge` | latest | Conflict-safe Tailwind class merging, same `cn()` helper (standard shadcn/ui convention) |

Nothing else was installed. No UI kit, no icon library, no CMS, no state-management library, no shadcn components — all deferred to the specific feature that needs them.

## 3. Project structure

```
app/
  layout.tsx        Root layout: fonts, MotionConfig (reduced-motion), skip link
  page.tsx           Foundation preview only — NOT the homepage
components/
  ui/                Button, Badge, AwaitingAssetPlaceholder, SkipLink, VisuallyHidden
  layout/            Container, Section
  motion/            FadeUp, ImageReveal, RevealGroup, variants.ts
content/
  products.ts        10 products, verified fields, NEEDS_VERIFICATION sentinel
  site.ts             Verified homepage/contact/subscribe/legal copy
  navigation.ts       Verified nav (Home, Shop)
  assets.ts           Image registry + the 3 flagged-asset records
lib/
  fonts.ts            next/font/google setup (Josefin Sans, Righteous)
  motion.ts           Duration/easing tokens
  utils.ts            cn() helper
public/images/         5 verified images (brand/lifestyle/products subfolders)
styles/globals.css     Design tokens (Tailwind v4 @theme) + base/a11y/reduced-motion CSS
```

`components/sections/`, `components/products/` (beyond the card primitive dependencies already in place), and `hooks/` are not created yet — no content exists for them until Phase 3B builds actual homepage/PDP components. Creating them empty now would just be placeholder scaffolding; they'll appear with their first real file.

## 4. Design tokens

Implemented exactly as specified in `docs/design-system.md`, as Tailwind v4 `@theme` values in `styles/globals.css` — colors, radii, shadows, breakpoints, and a fluid (`clamp()`-based) type scale. `#547D54` (`--color-sage-700`) is the only color sourced from a verified brand fact; every other color is labeled in-file as a design-system derivation. `--color-terracotta-500` is defined (so a future explicitly-approved use has a token to reach for) but is **not referenced by any component in this codebase** — grep-verifiable, not just documented intent.

One implementation note: container widths (`docs/design-system.md` §4.2) are set directly in `components/layout/container.tsx` rather than through a Tailwind `--container-*` theme namespace — I wasn't able to verify that namespace's exact current behavior in this Tailwind version without live access to cross-check against the docs' precise pixel values, so I used a direct, verifiable approach instead of an uncertain one. Functionally equivalent; still one definition, reused everywhere.

## 5. Motion primitives

`components/motion/variants.ts` centralizes every named pattern from `docs/motion-system.md` §3 as Framer Motion `Variants` objects, driven by the tokens in `lib/motion.ts`. `FadeUp`, `ImageReveal`, and `RevealGroup` are working, reusable wrapper components (verified via the foundation preview page). Reduced-motion is handled once, globally, via `MotionConfig reducedMotion="user"` in `app/layout.tsx` — no component needs its own check — backed by a CSS-level `prefers-reduced-motion` fallback in `styles/globals.css` for any non-Motion transitions (e.g. the CSS `hover:` states on `Badge`/links). `product-hover`, `nav-transition`, and `page-entrance` variants are defined and ready but not yet applied anywhere, since the components that use them (ProductCard, Header, Hero) aren't built yet.

## 6. Asset strategy

- **5 verified images copied into `public/images/`**: the brand logo, 2 recovered lifestyle photos (About/Philosophy botanicals, Aromatherapy oil bottle), and the 2 available (low-resolution) product photos (Cleanser Exfoliator Mask – Pink Blush, Geranium Lip Balm) — all traceable to `docs/asset-inventory.md`.
- **8 of 10 products have no image** — `content/products.ts` sets `image: null` for each; `AwaitingAssetPlaceholder` (verified working in the preview page) is the only thing that will ever render in that slot. No stock or AI-generated substitute exists anywhere in the codebase.
- **The 3 flagged existing assets are untouched**, still only in `reference/sukaya-site-archive/assets/images/`, registered (with their exact flag and reason) in `content/assets.ts` but not copied to `public/` and not referenced by any component — so nothing currently renders them, and nothing needs to be un-wired later if you decide against using one.

## 7. Content strategy

Structured local TypeScript data (`content/`), one field per verified fact, no duplication across components — the Product Card (once built) will read `content/products.ts` directly rather than any component hardcoding a name or price.

**Scope decision, stated explicitly:** `content/products.ts` currently holds the fields the Shop grid/Product Card need (name, price, size, category, variants, image) — not yet the long-form PDP copy (full description, ingredients-with-benefits, What It Does, How to Use, Safety Notes). Each product carries a `sourceRef` pointing to its exact section in `docs/content-inventory.md` §2. Reasoning: transcribing ~4,000 words of verbatim ingredient copy into this file wasn't necessary to satisfy this phase's explicit milestones, and building product detail pages is explicitly out of scope for Phase 3A — so that transcription is deferred to whichever phase actually builds the PDP, done then directly against the doc to minimize any risk of drift. Flagging this now so it isn't mistaken for an oversight.

`content/site.ts` holds the full verified homepage/contact/subscribe/legal copy, including the confirmed "coming soon" state of both legal pages (not filled in) and the "Raving Fans" section's open client-decision status (`status: "NEEDS_CLIENT_DECISION"`).

## 8. Accessibility foundation

- Skip-to-content link (`components/ui/skip-link.tsx`), targeting a real `id="main-content"` landmark in the root layout.
- Global `:focus-visible` ring (`styles/globals.css`) — never removed, applies site-wide.
- `Button` maintains a 44×44px minimum touch target and full keyboard operability (native `<button>`/`<a>` elements, not `<div onClick>`).
- `AwaitingAssetPlaceholder` uses `role="img"` with a real, verified-name-based `aria-label` — never a generic "image" label, never fabricated descriptive text.
- Reduced motion respected at both the Framer Motion level (`MotionConfig`) and the CSS level (`@media (prefers-reduced-motion: reduce)`), so nothing depends on JS alone.

## 9. Performance decisions

- Server Components by default; `"use client"` applied only where genuinely needed (`Button` and the three motion wrapper components — the only things using interactive/viewport-driven Framer Motion features). `Container`, `Section`, `Badge`, `AwaitingAssetPlaceholder`, and `app/page.tsx` itself all render server-side.
- `next/image` used for the logo, with real `width`/`height` from the verified asset registry (no layout shift).
- No animation library beyond the one approved dependency; no icon library installed (deferred until a specific shadcn component actually needs one).
- Static prerendering confirmed working (`next build` output: `○ (Static)` for `/`).

## 10. Remaining blockers

Unchanged by this phase, since none of them are foundation-level concerns — carried from `docs/verification-checklist.md` / `docs/phase-2-approval-summary.md`:
- Product photography for 8 of 10 products.
- Cart/checkout architecture and payment processor — still undetermined, nothing in this foundation assumes an answer.
- Body Oils size, Geranium Lip Balm 10ml price, Trial Collection sample sizes, Body Butter variant photo match.
- The 3 flagged existing assets — still awaiting your decision (kept out of `public/` and unwired in the meantime).
- "Raving Fans" — Option A (omit) vs. Option B (minimal placeholder) — still your call; `content/site.ts` reflects the undecided state explicitly rather than defaulting to either.

## Quality control — results

- `npm run lint` — **clean**, 0 errors/warnings (after excluding `docs/`/`reference/` from ESLint's scope and fixing one real `react-hooks/static-components` violation in an early draft of `FadeUp`).
- `npx tsc --noEmit` — **clean**, 0 errors (after fixing a `LayoutProps<"/">` route-typegen gap and a Framer Motion/native-HTML prop type conflict in `Button`).
- `npm run build` — **succeeds**, `/` prerenders statically.
- Runtime smoke test — `npm run dev` + `curl localhost:3000/` → HTTP 200, all primitives present in the rendered output (verified directly, not assumed from the build passing).
- No source documentation was deleted — `docs/archive/` → `reference/` was a tracked rename; `git status` confirms renames, not deletions, and file counts match.
- No fabricated content was added — every string in `content/site.ts`/`content/products.ts` traces to a specific verified source line; every unverified field is `NEEDS_VERIFICATION`, not a guess.
- No unnecessary dependencies — 3 additions beyond the framework defaults (`motion`, `clsx`, `tailwind-merge`), each directly required by the approved stack.

---

Stopping here per your instruction. Awaiting explicit approval before Phase 3B (homepage build).
