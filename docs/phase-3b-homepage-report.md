# SUKAYA Phase 3B — Homepage Implementation Report

**Status: Homepage implemented and verified (lint/typecheck/build/runtime all pass). Product pages, checkout, and payment integration are NOT built. Awaiting review before Phase 4.**

## 1. Sections implemented

Per the verified homepage structure (`docs/website-architecture.md`, `docs/ux-architecture.md`), in order:

1. **Header** — sticky, transparent-over-hero → solid on scroll, logo + Home/Shop nav, accessible mobile drawer.
2. **Hero** — verified headline/subheadline/CTA, unmodified.
3–5. **About Sukaya** (Our Philosophy + Our Commitment) — verified copy, two-column editorial layout, pull-quote callout.
6. **Aromatherapy & Skincare** — verified copy, paired with its documented section image.
7. **Featured Products** — 6-product grid using the real Product Card component.
9. **Contact** — verified copy/address/email, live Google Maps embed.
10. **Newsletter** (Subscribe) — verified copy, functional frontend form state.
11. **Footer** — verified copyright, nav recap, legal links.
Plus the **cookie consent banner** (persistent, not a numbered section).

### Deliberately not built this phase — stated explicitly, not silently dropped

- **"Raving Fans" (item 8) — omitted.** Per `docs/ux-architecture.md` §4, Option A. The section heading is verified real; its content is confirmed empty (`docs/source-of-truth.md` §A.11), and no testimonial content is invented to fill it. `content/site.ts`'s `ravingFans.status: "NEEDS_CLIENT_DECISION"` is left as-is — swapping to Option B (a minimal honest placeholder) is a small, contained addition whenever you decide.
- **The image gallery ("Explore our stunning range of natural beauty")** — verified to exist (`docs/source-of-truth.md`) but wasn't in this phase's explicit 11-item section list, and both of its only-recovered frames are the same two lifestyle photos already placed in Philosophy/Aromatherapy — a distinct Gallery section right now would either duplicate imagery already on the page or need real, additional photography first. Flagged here rather than built badly or silently skipped.

## 2. Components created

| Component | Type | Notes |
|---|---|---|
| `components/layout/header.tsx` | Client | Scroll-aware sticky bar, logo, desktop nav |
| `components/layout/mobile-nav-drawer.tsx` | Client | Slide-in drawer, `AnimatePresence` |
| `components/layout/footer.tsx` | Server | Verified copyright + nav |
| `components/sections/hero.tsx` | Server (+ motion children) | |
| `components/sections/about-sukaya.tsx` | Server (+ motion children) | Philosophy + Commitment |
| `components/sections/aromatherapy.tsx` | Server (+ motion children) | |
| `components/sections/featured-products.tsx` | Server (+ motion children) | |
| `components/sections/contact.tsx` | Server (+ motion children) | Live map embed |
| `components/sections/newsletter.tsx` | Client | Form state only, no real provider |
| `components/products/product-card.tsx` | Server | See §6 for the CTA decision |
| `components/ui/pull-quote.tsx` | Server | |
| `components/ui/cookie-banner.tsx` | Client | `localStorage`-persisted dismissal |
| `hooks/use-focus-trap.ts` | Client hook | Hand-rolled — see §9 |

`app/layout.tsx` updated to wire Header/Footer/CookieBanner globally. `app/page.tsx` replaced the Phase 3A foundation-preview content with the real section composition.

## 3. Assets used

| Asset | Used in | Note |
|---|---|---|
| Brand logo | Header | `docs/asset-inventory.md` §1 |
| "Our Philosophy" botanicals photo | Hero **and** Philosophy section | See below — deliberate reuse, not accidental duplication |
| Aromatherapy oil-bottle photo | Aromatherapy section | Its documented placement |
| Cleanser Exfoliator Mask – Pink Blush photo | Philosophy teaser strip **and** Featured Products card | Same product photo in two natural contexts (teaser + catalog), same as any real e-commerce site |
| Geranium Lip Balm photo | Not used on the homepage this phase (not in the first 6 featured products) | Available for Featured Products reordering or the Shop page later |

**Hero image decision, stated explicitly:** the only image scraped from the live site that occupied the literal hero banner slot is the AI-generation-flagged asset (`docs/asset-inventory.md` §4.1) — excluded per your instruction. No other authentic hero-specific banner photo exists. In its place, the Hero reuses the verified, unflagged "Our Philosophy" lifestyle photo as its visual — an authentic recovered asset, not a fabricated one, and it also appears (once) further down the page in its originally-documented Philosophy section. This is a substitution made in the absence of an approved dedicated hero photo, flagged here rather than presented as if it were the verified hero-specific image.

**None** of the three flagged existing assets (AI-flagged hero image, 2 Getty stock photos) were used anywhere. No stock photography, no AI-generated imagery, no random internet images.

## 4. Assets still missing

8 of 10 products have no photography and render `AwaitingAssetPlaceholder` in the Featured Products grid: Super Fruits Face Elixir, Berry Light Soothe Serum, Body Oils, Body Butters, Patchouli Face Cleansing Oil (shown in this phase's first 6), plus All in One Lavender Balm, Trial Collection, Rosewood Spoon (not shown yet, reserved for the Shop page). The placeholder is a static, clearly-labeled non-photographic panel (leaf glyph + "Product photography coming soon") — verified visually in QC (§13), never resembles a real product photo.

## 5. Motion implemented

Using the existing primitives from `docs/motion-system.md` / Phase 3A, applied purposefully rather than everywhere:

- **`page-entrance`** — implicit via `FadeUp` on the Hero's text block on mount.
- **`image-reveal`** — Hero and Aromatherapy section images.
- **`fade-up` / `section-reveal`** — every major section's heading/content, several via `RevealGroup` for coordinated staggered reveal (About Sukaya, Featured Products grid).
- **`product-hover`** — Product Card image scale + CTA opacity, implemented in **plain CSS** (`group`/`group-hover`) rather than Framer Motion, since a static hover doesn't need JS/IntersectionObserver — keeps the card a Server Component and the CTA unconditionally visible on touch (`motion-safe:` variants handle the reduced-motion fallback automatically).
- **`nav-transition`** — Header's scroll-based background crossfade (CSS transition), mobile drawer slide-in (Framer Motion `AnimatePresence`).
- **`button-interaction`** — hover lift + press scale, built into the shared `Button` primitive from Phase 3A.
- **Cookie banner** — slide-up/fade entrance and exit via `AnimatePresence`.

Reduced motion: verified via `MotionConfig reducedMotion="user"` (global) plus the CSS-level fallback from Phase 3A; nothing in this phase adds a new reduced-motion gap.

## 6. 3D/depth techniques

No 3D library, no WebGL, no shaders, no particles, no rotating/tilting elements — none installed, none used. Depth achieved entirely through:
- Layered composition (Hero/Aromatherapy image-and-text side-by-side panels).
- Soft shadow elevation (`shadow-rest` → `shadow-hover` on cards, `shadow-float` on hero/section imagery).
- Controlled scale (1.02× on product-card image hover only).
- Background/foreground separation (Aromatherapy section's sage-tinted background band vs. the cream page background elsewhere).

## 7. Responsive behaviour

Verified with Playwright across four real viewports (390×844 mobile, 820×1180 tablet, 1440×900 desktop, 1920×1080 desktop-lg): **`document.documentElement.scrollWidth === clientWidth` at every breakpoint — zero horizontal overflow.** Mobile composition checked directly: Hero image-first/text-second stacking, mobile nav drawer opens correctly with backdrop and touch-sized targets, sections reflow to single-column without any custom per-breakpoint hacks beyond what `Container`/`Section`/Tailwind's grid utilities already provide.

## 8. Accessibility

- Skip-to-content link (from Phase 3A) functions against the real page now that there's real content to skip to.
- Header: `aria-expanded`/`aria-controls` on the mobile menu toggle; drawer is `role="dialog" aria-modal="true"` with a hand-rolled focus trap (Tab/Shift+Tab cycling, Escape to close, focus returns to the trigger button, body scroll locked while open) — verified interactively (see §13).
- Product Card CTA is a real `disabled` `<button>` with an honest `aria-label` ("Add [product] to cart — coming soon") rather than a fake/dead link — see §9 for why.
- Contact map has a descriptive `title`; address rendered in a semantic `<address>` element.
- Newsletter form: visible `<label>` (not placeholder-only), `aria-describedby` status region, `aria-invalid` on validation error.
- Cookie banner: non-blocking region, real Accept/Decline buttons, keyboard-operable.
- Heading hierarchy: one H1 (Hero), H2 per major section, H3 for sub-sections/card titles — matches the verified content structure.

## 9. Performance

- Most components are **Server Components** by default; `"use client"` used only where genuinely needed: `Header` (scroll state + menu toggle), `MobileNavDrawer`, `Newsletter` (form state), `CookieBanner` (localStorage), and the three motion wrapper primitives from Phase 3A. `Footer`, `AboutSukaya`, `Aromatherapy`, `FeaturedProducts`, `Contact`, and `ProductCard` are all Server Components.
- Product Card's hover interaction is plain CSS, not Framer Motion — zero extra JS for that interaction.
- `next/image` used throughout; `unoptimized` applied specifically to the two low-resolution product photos (see §13) rather than left broken or force-upscaled.
- No new dependencies added this phase — everything is built from the Phase 3A primitives plus native React/Next APIs.

## 10. Remaining blockers

Unchanged, none resolved by this phase (none required content/commerce decisions):
- Product photography for 8 of 10 products.
- Cart/checkout architecture and payment processor — still undetermined; Product Card's CTA is honestly non-functional rather than wired to invented commerce logic (§9 below explains the specific choice).
- Body Oils size, Geranium Lip Balm 10ml price, Trial Collection sample sizes, Body Butter variant photo match.
- The 3 flagged existing assets — still untouched, still awaiting your decision.
- "Raving Fans" A/B decision — still open.
- 21st.dev MCP server — still shows "Needs authentication"; not touched this phase per your instruction. No component in this build depends on it (the mobile nav drawer, the one approved-candidate area actually needed this phase, was hand-rolled instead — see §13).

## 11. Known placeholders / deliberate non-functional states

- **`AwaitingAssetPlaceholder`** on 5 of 6 shown Featured Products.
- **Product Card "Add to Cart"** — a properly `disabled` button, not a fake link. Shop/PDP/cart routes don't exist yet in this phase; linking a card to a non-existent product page would misrepresent functionality that isn't there. This is a deliberate, honest choice over the component-system.md spec's "whole card is a link" pattern (written before this specific scope boundary existed) — trivial to swap to a real `<Link>` once PDPs are built.
- **Newsletter form** — accepts input and shows success/error state locally; no email provider is connected (none is verified to exist — `docs/verification-checklist.md`). Marked with a `TODO(integration)` comment in the code.
- **Contact map** — a real, functional Google Maps iframe embed (no API key required, no invented address — geocodes the verified "SUKAYA, Melbourne VIC, Australia"). It could not load in this sandboxed test environment specifically (blocked outbound network access to google.com, the same restriction documented throughout this project for `sukaya.com.au` and `21st.dev`) — verified via screenshot that it renders as an empty gray box with a broken-image icon here, but the markup/URL is correct and will render normally for real users with normal internet access.
- **Header Search/Cart icons** — not built. The verified live site shows both, but Shop routing and cart state don't exist yet this phase; adding a decorative-only cart badge risked implying commerce functionality that isn't there, so both are deferred to when Shop/commerce is actually built.
- **Footer's Privacy Policy / Terms and Conditions links** — real `<Link>`s to routes that don't exist yet (will 404 until a later phase). Expected, not a bug.

## 12. Screenshots / preview information

Captured via a real Chromium browser (Playwright, the pre-installed instance at `/opt/pw-browsers`) — not committed to the repository (transient QC artifacts, not project source material) but delivered to you directly alongside this report. Covered: full-page desktop (1440px) after a real incremental scroll-through, a scrolled mid-page viewport shot (confirms the sticky header stays correctly pinned during normal use), mobile hero, mobile nav drawer open, and mobile mid-scroll.

## 13. QC results

- **`npm run lint`** — clean, 0 errors/warnings.
- **`npx tsc --noEmit`** — clean, 0 errors.
- **`npm run build`** — succeeds, `/` prerenders statically.
- **Runtime verification (real browser, not just build success):**
  - No horizontal overflow at any of 4 tested viewports (390/820/1440/1920px).
  - **One real bug found and fixed:** `next/image` was requesting a 1200px-wide 2×/retina variant of two product photos that are only ~200–350px natively — an extreme upscale the optimizer was failing on, causing a 404 and a broken image. Root-caused (not just patched around) and fixed by serving those two specific low-resolution source photos `unoptimized` — the honest choice, since asking an optimizer to invent detail a low-res source doesn't have isn't the right fix either.
  - **One initial false alarm, investigated and ruled out:** a full-page screenshot initially showed most of the page as blank and the header floating mid-content. Root-caused to a Playwright/Chromium `position: sticky` + full-page-screenshot-stitching interaction, and to `whileInView` reveals not yet having fired when the screenshot's viewport-resize happened faster than a real user's scroll. Verified against a **real incremental scroll-through** (matching how an actual visitor scrolls) that every section's computed opacity reaches `1` and everything renders correctly; also confirmed via a normal (non-full-page) screenshot at a scrolled position that the header stays correctly pinned. Documented here so this specific screenshot artifact isn't mistaken for a real defect in a future review.
  - Remaining console 404: `/shop?_rsc=...` — Next.js's automatic `<Link>` prefetch for the Shop route, which doesn't exist yet by design this phase. Expected, will resolve when Shop is built.
  - No React `pageerror`/runtime exceptions at any tested viewport.
  - No fabricated content, verified against `content/site.ts`/`content/products.ts` — same data layer as Phase 3A, unchanged.

---

Stopping here per your instruction. Not proceeding to product pages, checkout, or Phase 4 until the homepage has been reviewed and approved.
