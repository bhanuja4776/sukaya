# SUKAYA Phase 2 — Approval Summary

**Status: DRAFT — documentation only. No React components built, no dependencies installed, no pages implemented. This document summarizes the refined Phase 2 documentation (`design-system.md`, `ux-architecture.md`, `motion-system.md`, `component-system.md`) after your review and requested refinements, for final sign-off before Phase 3.**

## 1. Final design direction

"Premium natural skincare with subtle digital craftsmanship." Calm, editorial, tactile, trustworthy — real product photography and verified copy carry the premium feeling; UI stays restrained and recedes. No flashy, futuristic, or gaming-like treatment anywhere in the system.

## 2. Final typography decision

- **Righteous** — SUKAYA logo wordmark only, and no other default UI usage ("extremely limited brand-display moments," per your direction).
- **Josefin Sans** — the primary interface and editorial typeface: navigation, all headings (hero H1 included), body copy, product information, buttons, and CTAs.
- No third typeface introduced. The earlier draft's proposal to use Righteous for the hero headline is withdrawn — "premium editorial" is now achieved through Josefin Sans at elevated scale/weight/tracking (`design-system.md` §3), not a second display face.

## 3. Final colour decision

- **`#547D54` (Sukaya Sage) is the only verified SUKAYA brand color.** Everything else in the palette is a new design-system derivation and is never presented as an existing brand color.
- Dominant palette: sage green + warm cream + warm sand + soft white + warm ink + restrained botanical tones — no orange/green-heavy visual balance.
- `terracotta-500` is explicitly labeled **DESIGN-SYSTEM ACCENT — NOT VERIFIED BRAND COLOUR**, downgraded to optional and **not used anywhere by default**. The Trial Collection sale/discount indicator, which was the only place it was previously proposed, now uses `sage-700`/`sage-200` instead — which also happens to match the green "Sale" ribbon visible in the verified source screenshot, making it the more evidence-grounded choice as well as the more restrained one.
- Full token table: `design-system.md` §2.

## 4. Final motion philosophy

Framer Motion, used for a fixed set of named, purposeful patterns only (fade-up, soft-scale, image-reveal, product-hover, parallax-layer, nav-transition, button-interaction, section-reveal, page-entrance — `motion-system.md` §3). Subtle, slow enough to feel premium, GPU-friendly (`transform`/`opacity` only), one parallax layer maximum per page, every pattern has a defined `prefers-reduced-motion` fallback, and no section is animated by default just because it can be — each pattern states its UX purpose.

## 5. Final 3D/depth philosophy

**Reaffirmed: 3D = depth, not spectacle.** Depth is achieved through layered composition, soft shadow elevation, controlled scale, and one restrained parallax layer — never through Three.js, WebGL, rotating products, tilt effects, particle systems, excessive perspective, floating objects, or flashy lighting. None of those are planned unless a later, separate explicit requirement justifies them. Real product photography stays flat and photographic; its own quality is the "premium" cue, not an effect layered on top.

## 6. Final homepage architecture

Verified section order preserved, no sections added or reordered: Header/Nav → Hero → About Sukaya (Philosophy, Commitment) → Aromatherapy & Skincare → Featured Products → Gallery ("Explore our stunning range...") → Raving Fans → Contact Us → Subscribe → Footer, with the cookie-consent banner as a persistent overlay. Full section-by-section UX treatment in `ux-architecture.md` §2, now including a dedicated conversion-focused review (§13) covering discovery, visibility, pricing clarity, CTAs, friction, navigation, mobile purchase flow, and visual trust — with no new claims or sales copy introduced anywhere in that review.

**"Raving Fans" — still an open client/content decision, not resolved here.** No testimonials, reviews, or trust-signal copy are invented under any circumstance. Two options are documented for your choice (`ux-architecture.md` §4):
- **A.** Omit the section from the redesigned homepage until real content exists.
- **B.** Retain a minimal, honest placeholder (heading + a short non-promotional note that reviews are coming), pending authentic content.

Neither is implemented or defaulted-to — Phase 3 builds whichever you choose.

## 7. Final product-card architecture

Verified fields only: real image (or the explicit `AwaitingAssetPlaceholder`), exact product name, exact price (in its verified format, including "From $X" and the Trial Collection's sale formatting), category tag (from the 9 verified categories, omitted rather than guessed where ambiguous), and an "Add to Cart" CTA. No fabricated ratings, badges, or urgency language. Full spec including states, layout, and accessibility: `component-system.md` §3.

## 8. 21st.dev components proposed

Kept deliberately small (5 candidates, 3 essential / 2 optional), and restricted to interaction-heavy primitives where accessibility plumbing is hard to get right — **not** the brand-visible surfaces (Hero, Product Card, section layouts, Header shell), which are built custom from the design system instead, specifically so the finished site doesn't read as a 21st.dev template:

| # | Candidate | Essential/Optional |
|---|---|---|
| 1 | Mobile navigation drawer (focus-trapped slide-in panel) | Essential |
| 2 | Accessible accordion (for PDP Ingredients/Safety Notes) | Essential |
| 3 | Cookie consent banner (non-blocking bottom bar) | Essential |
| 4 | Minimal touch/keyboard image carousel, no autoplay | Optional |
| 5 | Accessible form input + inline validation pattern | Optional |

**Important caveat, stated plainly:** this session has no live web access to 21st.dev (confirmed blocked, same as `sukaya.com.au`), so none of the above are verified against the current live catalog — each entry specifies the exact category/search target and integration spec so a session with live access can pull a real match and confirm it before Phase 3 adopts it. Full detail, including required modifications and what must never be copied as-is: `component-system.md` §4.

## 9. Remaining content blockers

Unchanged from `docs/verification-checklist.md` (Section B), none resolved by this design phase since none required content verification:
- Body Oils size (ml)
- Geranium Lip Balm — 10 ml tin price
- Trial Collection sample sizes
- Body Butter jar photography / variant match
- Cart behaviour (UI/UX, once architecture is decided — see §11)
- Checkout / payment processor
- Founder's name (usable as "our founder" in the meantime)
- Undocumented product variants, if any

## 10. Remaining asset blockers

- **Product photography for all 10 products** — only 2 (Cleanser Exfoliator Mask – Pink Blush, Geranium Lip Balm) have any standalone photo, and both are low-resolution. The `AwaitingAssetPlaceholder` component (`component-system.md` §5) covers every gap honestly — no stock or AI-generated substitutes anywhere.
- Two homepage images confirmed as **licensed Getty stock photography** — licensing/continuation decision needed (`docs/asset-inventory.md` §4.2–4.3).
- One homepage image (the site's `og:image`) shows AI-generation indicators (filename + garbled label text) — kept unmodified, decision needed on whether to keep, replace with real photography, or redesign (`docs/asset-inventory.md` §4.1).
- Remaining gallery carousel frames (3 of 6 slides recovered) — the rest weren't captured by either source.

## 11. Remaining client decisions

1. **"Raving Fans" — Option A (omit) or Option B (minimal placeholder)?** (§6 above)
2. **Cart/checkout architecture** — link out to the existing live checkout, integrate a hosted commerce provider, or build a full custom cart+payment flow (`docs/content-inventory.md` §7 options, still open — `ux-architecture.md` §8 confirms nothing further can be designed here until this is chosen).
3. **The two Getty stock images and the AI-flagged `og:image`** — keep, replace with real photography once available, or redesign (§10 above).
4. Whether to pursue live verification of the still-open content blockers (§9) directly with you, or attempt it again if this environment's web access changes.

## 12. Technology/dependency plan

Unchanged proposal, still nothing installed:
- **Next.js (App Router) + TypeScript**
- **Tailwind CSS**, configured directly from the `design-system.md` token tables
- **shadcn/ui** as the accessible unstyled primitive base for the 21st.dev-sourced components in §8 (natural fit, since 21st.dev's ecosystem commonly builds on the same primitives)
- **Framer Motion (`motion`)**, implementing exactly the named patterns in `motion-system.md`
- **Product content as structured local TypeScript data**, generated directly from `docs/product-inventory.md` — every field traceable to a verified source
- **`next/image`** for all photography, once real assets are supplied

---

## Next step

Per your instruction, stopping here. Awaiting explicit approval on:
- This summary and the four refined Phase 2 documents, and
- Your decisions on the two open items in §11.1–§11.3 (Raving Fans handling, cart/checkout architecture, and the three flagged images) —

before Phase 3 implementation (React components, dependency installation, actual page-building) begins.
