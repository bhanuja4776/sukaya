# SUKAYA Phase 9 — Visual Polish + Conversion Optimisation Audit

**Status: Presentation-only changes implemented and verified (lint/typecheck/build/runtime all pass). No content, prices, sizes, copy, URLs, or product data was created or modified. No new functionality was added.**

This document records a real before/after visual audit (screenshots, not assumptions) across the homepage, Shop, PDPs, and cart, and the specific, individually-justified changes made as a result. Consistent with Part 19 of the brief, most of what was audited was found to already be in good shape and was deliberately left alone — see §12.

## 1. Current visual issues (before)

Found by building the site and reviewing real screenshots at desktop (1440px), tablet (768px), and mobile (390px), plus a real incremental scroll-through (not full-page jump screenshots — see §15 for why that distinction matters):

1. **Header logo reads as a floating white card.** The logo source photo has a plain white backdrop; against the cream-50 page background this showed as a hard-edged rectangle, the single most "template-like" thing on the site.
2. **`AwaitingAssetPlaceholder`'s label text** (shown on 8 of 10 products — every PDP and card without real photography) used plain body copy, reading as a leftover system message rather than a considered design moment, despite appearing extremely often.
3. **Righteous webfont was being loaded on every page but rendered nowhere.** Confirmed by exhaustive search: `brand.name` is only ever used in `alt`/`<title>` attributes (never as visible text), and the `font-brand`/`text-display-brand` CSS tokens that reference Righteous have zero class usages anywhere in `components/` or `app/`. The SUKAYA wordmark is only ever the existing photographed logo image. This is a real, measurable performance cost (an extra webfont fetched and never painted) with zero visual trade-off to removing it.
4. **A `fullPage: true` Playwright screenshot of `/shop` on mobile appeared to show only one product card followed by a large blank void.** Investigated per the brief's explicit warning about this exact failure mode — confirmed as the same `whileInView`-timing artifact documented in Phase 3B/4 (a single-jump full-page capture doesn't give `IntersectionObserver` time to fire before the screenshot is taken), not a real rendering bug. Re-verified with real incremental scrolling: all content renders correctly. Recorded here so it isn't rediscovered as a false alarm later.

Everything else audited — motion timing, 3D/depth usage, section rhythm, color usage, typography scale, product card composition, PDP layout, cart drawer — was already in good shape; see §12 for the full list of things deliberately left unchanged and why.

## 2. Changes made

Four targeted changes, each tied to a specific, verifiable issue above:

1. `components/layout/header.tsx` — added `mix-blend-multiply` to the logo `<Image>`. This optically drops the photo's white backdrop out against the cream page background without altering the image file itself. Verified in both header states (transparent-at-top and scrolled `bg-cream-50/95`).
2. `components/ui/awaiting-asset-placeholder.tsx` — changed the caption from `text-body-sm` to the same `text-label uppercase tracking-wide` treatment already used by `Badge` and every product CTA, so it reads as an intentional element of the design system rather than default text.
3. `lib/fonts.ts` / `app/layout.tsx` / `styles/globals.css` — removed the unused `Righteous` font load and the `--font-brand`/`--text-display-brand` tokens that referenced it. Documented clearly in `lib/fonts.ts` why, and that this doesn't reverse the Phase 2 typography decision (the logo image still carries the Righteous wordmark exactly as before) — it only stops paying for a font that was never painted.
4. No fourth code change — the remaining audit areas (§5–§11) were reviewed and found compliant already; nothing else met the bar for "clear purpose" (Part 19).

## 3. Homepage improvements

Logo fix (header, present on every page) and the placeholder-caption typography fix (shown in Featured Products for products without photography) are the two homepage-visible changes. Section-by-section audit (Part 1) otherwise found: clear hierarchy throughout, appropriate breathing room (the existing `py-16 desktop:py-24 desktop-lg:py-32` rhythm), and a reasonable background-alternation pattern (cream → cream → sage-100 Aromatherapy → cream → cream → sage-900 Newsletter) that already gives the page visual rhythm without needing a new section or divider element.

## 4. Product-card improvements

The placeholder typography fix applies here too (cards for the 8 products without photography). Reviewed card composition (image prominence, price/name hierarchy, CTA weight, hover state) against Part 6's checklist directly — found already compliant: square image at full card width, name/price using the established heading/body scale, a restrained ghost-style text CTA (not a heavy button, not a fake discount badge, not a rating), and a subtle `scale-[1.02]` hover on the image only under `motion-safe`. No changes made here beyond the placeholder fix — anything more would have been decoration without a clear defect to fix.

## 5. PDP improvements

Same placeholder fix (product image column, for products without real photography). Reviewed the Phase 8 handoff CTA and Phase 6 local-cart purchase panel against Part 7's checklist — both already show image/name/price/variant/description/ingredients/how-to-use/safety-notes in that priority order, and the purchase action honesty (real disabled buttons, real verified links, no `href="#"`) was re-verified end to end in this phase's QC (§ QC results) rather than assumed unchanged.

## 6. Motion changes

None. Audited every `motion/` component (`FadeUp`, `ImageReveal`, `RevealGroup`, cart/nav drawer transitions, `Button`'s hover/tap) against Part 4's "why is this moving?" test — each answers it: page-entrance/section-reveal for content arriving in view once, image-reveal for hero/section photography, a small hover lift/tap-scale for buttons, drawer slide-in for the cart and mobile nav. No loops, no bounce/spring physics, no scroll-jacking, stagger capped at 0.08s. Nothing met the bar for removal.

## 7. 3D/depth changes

None needed. Searched the codebase for `parallax`, `perspective`, `rotateX/Y/Z`, `useScroll`/`useTransform`, Three.js/WebGL — zero matches anywhere. Depth is already handled exactly as Part 3 prescribes: layered image + text compositions (Hero, Aromatherapy), soft shadows (`shadow-rest`/`shadow-hover`/`shadow-float` tokens), and image-hover scale — no spectacle-driven 3D exists to strip out.

## 8. Mobile improvements

Beyond the two universal fixes (logo, placeholder), mobile was audited independently at 390px across all 14 routes (home, shop, both legal pages, all 10 PDPs) with real incremental scrolling — see QC results. No mobile-specific defect was found that met the bar for a targeted fix; the category-filter-pill row on `/shop` wraps to two rows on narrow viewports, which is functional and not a regression, so it was left as-is rather than restructured into a horizontal-scroll pattern that Part 19 would flag as unnecessary invention.

## 9. Accessibility improvements

No accessibility-specific code change was needed this phase (Phase 6's focus-trap fix already covered the one real defect found in this project's history). This phase re-verified, rather than assumed, that accessibility held after the visual changes: focus trap still cycles correctly inside the cart drawer, keyboard focus still lands correctly, reduced-motion still renders every route without error, and touch targets/labels are unchanged since no interactive markup was touched (the two component changes were an `<img>` class and a `<p>` class, neither carrying interactive semantics).

## 10. Performance improvements

Removing the unused Righteous font load (§1 item 3, §2 item 3) is a real, measurable win: one fewer webfont file fetched on every single page load, for a typeface that was never rendered. No other performance changes were made — Part 15's other audit points (client-component footprint, image lazy-loading, layout shift) were reviewed and found already handled: Product Card and most sections are Server Components, only the interactive leaves (`Button`, cart, filters, accordion) are client components; product images already use `loading="lazy"` off the LCP path and `unoptimized` only where documented as necessary; no new layout-shift risk was introduced since no image dimensions changed.

## 11. Conversion observations (Part 18, without inventing copy)

- **Discovery**: category filters and the Shop grid make browsing straightforward; no changes made here.
- **Clarity**: product name/category/price are visually prioritized in that order on both card and PDP — unchanged, already clear.
- **Visibility**: price is never hidden; the verified GoDaddy handoff CTA ("Continue to Shop") and the local "Add to Cart" are both visually primary actions on their respective PDPs.
- **Friction**: the biggest real friction point is structural, not visual — 8 of 10 products have no photography and 6 of 10 have no verified purchase path yet (Phase 8). No visual treatment can resolve this; see §14.
- **Trust**: the honest pending/disabled states (introduced Phases 6–8) read as considered rather than broken, especially after the placeholder typography refinement — this phase reinforced that impression rather than needing to invent trust signals.
- **No fake urgency, discounts, reviews, or trust badges were added or considered** — Trial Collection's existing sale badge is verified source content (Phase 3A), not new.

## 12. What was deliberately NOT changed

- **Product Card CTA styling** — reviewed closely; it's already a restrained ghost-style text link consistent with the design system, not the "weak default link" it first appeared to be in a cropped screenshot. Changing it further would have been decoration without a clear defect.
- **`shadow-float`/`shadow-rest` design tokens** — considered softening the PDP image container's edge treatment, but that token is shared across many components (Hero, Aromatherapy, both drawers, PDP image); changing its value to chase one component's minor edge feel risked broader unintended visual drift for a marginal gain. Left untouched.
- **`components/layout/section.tsx`** — discovered this component is never actually used; every homepage section hardcodes its own `<section className="py-16 desktop:py-24...">` instead. The values are identical to what `<Section spacing="default">` would produce, so wiring it in would be a zero-pixel refactor — real code-hygiene value, but zero visual value, and this phase is scoped to presentation. Left as a documented observation, not changed.
- **`id="contact"` / `id="about-sukaya"`** — confirmed unused by any link/anchor anywhere in the codebase. Harmless; left in place rather than removed or wired up to new in-page navigation (the latter would be new functionality, out of scope).
- **Mobile category-filter pill layout** — wraps to two rows at narrow widths; functional, not restructured (see §8).
- **Newsletter section's shorter vertical padding** (`py-16 desktop:py-20` vs. the `py-16 desktop:py-24 desktop-lg:py-32` used elsewhere) — read as an intentional "closing band" choice, not an inconsistency to fix.

## 13. Remaining visual limitations caused by missing assets

Unchanged from Phase 3A/4/8: 8 of 10 products have no verified original photography and continue to use `AwaitingAssetPlaceholder` (now with the refined caption treatment, §2). No stock or AI-generated imagery was substituted, per standing instruction. The three flagged existing live-site assets (AI-generated hero/OG image, two Getty stock photos) remain un-adopted, exactly as documented since Phase 1.6.

## 14. Remaining conversion limitations caused by missing commerce data

Unchanged from Phase 8: only 3 of 10 products (4 configurations) have a verified GoDaddy purchase URL. The other 6 products (and Calming Body Butter / Geranium 10 ML) remain on the honest "not yet available"/local-cart-only treatment. No amount of visual polish changes this — it's a data-verification gap, not a presentation one, and resolving it requires the client-supplied URLs described in `docs/phase-8-godaddy-product-handoff.md` §3.

## 15. Screenshots / preview information

Before/after comparisons were captured directly (not assumed) at 1440px and 390px for the homepage, Shop grid, and two representative PDPs (one with real photography, one without). The mobile Shop "blank page" false alarm (§1 item 4) was specifically re-captured with real incremental scrolling to confirm it was a screenshot-methodology artifact, per the brief's explicit instruction not to rely on full-page screenshots alone. Screenshots were used for this audit's own verification process and are not included as files in the commit (consistent with every prior phase in this project) — the QC section below records what was actually checked in the running app.

---

## QC results

- **`npm run lint`** — clean, 0 errors/warnings.
- **`npx tsc --noEmit`** — clean, 0 errors.
- **`npm run build`** — succeeds; all 17 routes generated, unchanged from Phase 8.
- **Browser QC** (Playwright, pre-installed Chromium, transient install removed afterward) — full sweep of all 14 routes (home, shop, both legal pages, all 10 PDPs) at desktop (1440px) and mobile (390px), plus tablet (768px) on the homepage, using real incremental scrolling throughout (not full-page jump screenshots, per the brief's explicit instruction and the false-positive documented in §1): **zero broken images, zero horizontal overflow, zero `href="#"`, zero page/runtime errors across every route/viewport combination.**
- **GoDaddy handoff regression** — re-verified byte-for-byte that all 4 verified URLs (Body Oil CBO/UBO, Original Body Butter, Geranium Lip Balm) are unchanged and exact after this phase's changes.
- **Cart regression** — open/close (including Escape), quantity, and the honestly-disabled checkout CTA all re-verified working exactly as Phase 6/7/8 left them.
- **Keyboard navigation** — cart drawer focus trap re-verified intact (the Phase 6 fix for Motion's disabled-button `tabindex` issue was not affected by this phase's changes, since no button markup was touched).
- **Reduced motion** — re-verified error-free on `/`, `/shop`, and a PDP under `prefers-reduced-motion: reduce`.
- **Font removal sanity check** — confirmed zero console errors after removing the Righteous font load (no broken `var()` reference, no missing-font warning).

---

Stopping here per your instruction. Not proceeding to SEO or deployment. Waiting for approval.
