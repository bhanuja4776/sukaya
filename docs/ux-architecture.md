# SUKAYA UX Architecture — Phase 2

**Status: DRAFT — documentation only. No pages, layouts, or components have been implemented.**

This document defines the experience architecture: how a visitor moves through the site, what each section is for, and how the confirmed content (`docs/source-of-truth.md`, `docs/product-inventory.md`, `docs/website-architecture.md`) maps onto it. It does not alter, add, or remove any verified copy — where a design decision is needed, it's marked **[SYSTEM]**, and anywhere content is still missing, it's marked from `docs/verification-checklist.md` rather than filled in.

## 1. Conversion funnel mapping

Per your brief's funnel — Attention → Brand/Product Understanding → Desire → Trust → Discovery → Purchase — mapped onto the **existing, verified** homepage section order (`docs/website-architecture.md` §"Homepage sections"), not a reordering:

| Funnel stage | Homepage section(s) | Why |
|---|---|---|
| Attention | Hero | Verified headline "Pure & Natural Skin Care Solutions" + subhead, real product imagery, single clear CTA |
| Brand/Product Understanding | About Sukaya (Philosophy, Commitment) | Explains what makes the products different (0% water, no harsh preservatives — verified claims already in the copy) |
| Desire | Aromatherapy & Skincare, gallery ("Explore our stunning range...") | Sensory, editorial imagery-led sections |
| Trust | Raving Fans *(currently empty — see §4)*, ingredient transparency baked into product copy | Social proof + formulation transparency |
| Discovery | Featured Products | Bridges into the full Shop |
| Purchase | Shop → Product Detail Page → Cart → Checkout | See §6–8 |
| (Retention) | Subscribe (newsletter) | Captures visitors not ready to buy yet |

This is the existing structure read through a conversion lens — no sections are being added or removed beyond what the brief explicitly asks about (Raving Fans, §4).

## 2. Homepage architecture, section by section

### 2.1 Header/Navigation
**Verified:** Home + Shop only, search field, cart icon (`docs/source-of-truth.md` §A.4).
**UX treatment [SYSTEM]:** Sticky on scroll (see `design-system.md` §6.4). Logo click returns home. Cart icon shows a live item-count badge once cart functionality exists (currently blocked, §8). Search expands inline rather than navigating to a separate page, to keep discovery frictionless.

### 2.2 Hero
**Verified:** H1 "Pure & Natural Skin Care Solutions", subhead "Discover natural, minimalistic skincare for radiant skin.", CTA "Shop Now" (`docs/source-of-truth.md` §A.1–A.3). **Copy is not being rewritten**, per your instruction.
**UX treatment [SYSTEM]:**
- Full-viewport-height (desktop) hero with the verified product-range imagery as the dominant visual (once a usable high-res version exists — currently only the AI-flagged/low-res assets exist, see Blockers §11).
- Headline in `display-hero` (Righteous, per `design-system.md` §3.2), left-aligned over/beside the image rather than centered-on-top-of-a-full-bleed-photo — keeps text legible without a dark overlay scrim degrading the product photography.
- Single primary CTA ("Shop Now") scrolling/navigating to Shop — no secondary competing CTA in the hero.
- Mobile: image and text stack vertically, image first (product recognition before reading), headline drops to `display-hero` mobile size (34–40px).
- Entrance motion: see `motion-system.md` "page-entrance" pattern — one gentle staged reveal, not a cinematic sequence.

### 2.3 About Sukaya (Our Philosophy + Our Commitment)
**Verified:** Full paragraph copy for both, cross-confirmed by PDF and archive (`docs/source-of-truth.md` §B). Two accompanying images now recovered at high resolution (`docs/asset-inventory.md`).
**UX treatment [SYSTEM]:** Editorial two-column layout alternating image/text sides between the two sub-sections (Philosophy: image-left/text-right; Commitment: text-left/image-right) — creates visual rhythm without new copy or invented structure. Text column capped at `container-narrow` (720px) for readability (`design-system.md` §4.2). Pull-quote treatment for the single strongest line already in the verified copy ("Most skincare products are 80% water but ours is 0%") as a large-type callout — this is highlighting existing verified text, not writing new copy.

### 2.4 Aromatherapy & Skincare
**Verified:** Full paragraph (founder's aromatherapy credential, essential-oil-concentration safety detail).
**UX treatment [SYSTEM]:** Single asymmetric image/text panel (recovered high-res lavender-oil photo, `docs/asset-inventory.md`), similar rhythm to §2.3 but visually distinct enough not to feel repetitive — larger image proportion here since aromatherapy is a sensory topic best carried by imagery.

### 2.5 Featured Products
**Verified:** Section exists; the PDF shows a subset of the 10 products featured here (not all 10 — full catalog lives in Shop).
**UX treatment [SYSTEM]:** Uses the Product Card component (`component-system.md`). Recommend featuring a mix that doesn't rely solely on the 2 products with any real photography — see Blockers §11 for how this interacts with the missing-image problem. A horizontally-scrollable row on mobile (not a cramped grid) keeps cards large enough to read price/name clearly.

### 2.6 Gallery — "Explore our stunning range of natural beauty"
**Verified:** Heading + carousel exists; some frames recovered (PDF + archive), others still missing (`docs/asset-inventory.md`).
**UX treatment [SYSTEM]:** Editorial image carousel/masonry, not a generic slider with heavy chrome — large images, minimal UI (small dot indicators, swipe on mobile). This section is where the "depth as craftsmanship" layered-imagery principle (`design-system.md` §7) is most appropriate, since it's purely visual/atmospheric.

### 2.7 Raving Fans
**Verified: section heading exists, contents confirmed empty** (`docs/source-of-truth.md` §A.11). See §4 below for the dedicated proposal — this is not being filled with invented testimonials under any circumstance.

### 2.8 Contact Us
**Verified:** Full copy, address, email, "Get directions" (`docs/source-of-truth.md` §B).
**UX treatment [SYSTEM]:** Two-column: contact copy/details left, live embedded map right (matching the verified existing pattern), rather than the flat screenshot preserved in the archive. Email is a `mailto:` link (verified pattern from `data/navigation.json`).

### 2.9 Subscribe (Newsletter)
**Verified:** "Get 10% off your first purchase..." copy, email field, Sign Up button.
**UX treatment [SYSTEM]:** Inline horizontal form on desktop, stacked on mobile. Success/error states use the palette's muted `success`/`error` tokens (`design-system.md` §2.2), not a jarring alert color. **Note:** the 10%-off incentive is verified existing copy, not a new promotion we're introducing — carried forward as-is, no new discount logic implied here (discount code delivery mechanism is outside this document's scope and untouched).

### 2.10 Footer
**Verified:** Copyright, "Powered by" (GoDaddy — a fact about the *current* site's platform, not necessarily carried into the rebuild's own footer unless you want it preserved), Privacy Policy / Terms and Conditions links.
**UX treatment [SYSTEM]:** Standard footer with nav recap, legal links, and (recommend) the same Contact/social info as §2.8 for pages deep in the Shop where the full Contact section isn't visible. Since Privacy Policy and Terms currently read "coming soon" on the live site (verified, `docs/source-of-truth.md` §A.6–A.7), the footer links should point to pages that **preserve that "coming soon" state** rather than an empty or broken page — see §9.

### 2.11 Cookie consent banner
**Verified copy** (`docs/source-of-truth.md` §A.12). Not a homepage "section" but a persistent overlay — first-load only, dismissible, stored preference respected on return visits. Positioned as a bottom bar (not a full-screen blocking modal) to minimize disruption to the hero's first impression.

## 3. Product-card architecture

(Cross-referenced in full in `component-system.md`; UX rationale here.)

Every product card must show only verified fields: exact name, exact price, category (where confirmed, `docs/product-inventory.md`), and a CTA. **No card invents a size, rating, or badge that isn't verified.** Where a product's price has an open question (Geranium Lip Balm's 10ml tier, `docs/verification-checklist.md` item 4), the card shows the verified base price ("From $5.99") exactly as sourced — never a guessed second price.

Hover interaction (desktop): subtle image scale (1.02×) + CTA fade-in, no card rotation/tilt (keeps with the "depth not spectacle" rule). Tap interaction (mobile): whole card is the tap target, no separate tiny "view" link needed.

## 4. "Raving Fans" — CLIENT/CONTENT DECISION REQUIRED

The section heading is real and confirmed to exist on the live site; the content behind it is confirmed empty (no reviews exist, `data/reviews.json` is `[]`).

**PRIMARY RECOMMENDATION: do not populate this section with fabricated content.** No testimonials, review counts, star ratings, or "trust signal" copy are invented for this slot under any circumstance — including facts that are technically verified elsewhere (e.g. formulation claims), since repurposing them under a "Raving Fans"/social-proof heading would misrepresent them as customer sentiment they are not. That approach, considered in an earlier draft of this document, has been withdrawn.

Two implementation options, exactly as framed for your decision:

**A. Omit the section from the redesigned homepage.** "Raving Fans" is not built/rendered until real testimonial content exists. Cleanest presentation; no visible placeholder or empty state on a premium page.

**B. Retain a minimal placeholder, pending authentic content.** The heading position is preserved in the layout with an honest, minimal empty-state treatment (e.g. plain heading + a short, non-promotional note that reviews are coming) — no fabricated quotes, ratings, or counts. Keeps the section's identity/slot intact for when real reviews are supplied.

**This is explicitly your decision, not one made in this documentation.** Neither option is implemented, previewed, or defaulted-to until you choose — Phase 3 will build whichever you select, using only content you supply for it.

## 5. Shop (product listing) page

**Verified:** 10 products across 9 named categories (`docs/website-architecture.md`).
**UX treatment [SYSTEM]:** Grid of Product Cards, filterable by the verified category names. Category filter uses only the confirmed 9 categories — no invented category groupings. Since category *pages themselves* are unverified (all 404'd during the archive crawl), filtering should be implemented as client-side/in-page filtering of the known 10-product catalog rather than assuming distinct category page templates exist to be preserved.

## 6. Product Detail Page (PDP)

**Verified pattern** (`docs/website-architecture.md` §"Shop / commerce structure"): price → quantity → Buy Now/Add to Cart/Share → headline → description → What It Does/Key Benefits → Ingredients → Skin Type → Aroma & Texture → How to Use → Safety Notes.
**UX treatment [SYSTEM]:** Sticky product image + purchase panel on desktop (left, or right — recommend left given standard AU/Western reading pattern, image-first), with the informational content (description → ingredients → usage → safety) as a scrolling column beside it, using expandable sections (accordion) for Ingredients/How to Use/Safety Notes on mobile to avoid an overwhelming single long scroll — all text remains the verified verbatim copy, only its progressive-disclosure presentation is new.

## 7. Navigation & wayfinding

Breadcrumbs on PDP (Shop / [Category] / [Product Name]) using verified category+product names only. "Back to Shop" persistent affordance. Search (verified to exist as a field, `data/content.json` forms) should search only the confirmed 10-product catalog — not a placeholder that returns nothing or fabricated results.

## 8. Cart & checkout — architecture status

**Blocked**, per `docs/source-of-truth.md` §G. Neither source could establish cart behavior or the checkout/payment processor. This document does **not** design a specific cart drawer/page or checkout flow, because doing so would require assuming an architecture (link out to the existing live checkout vs. a new hosted-commerce integration vs. full custom build — the three options in `docs/content-inventory.md` §7) that hasn't been decided. **What can be documented now:** the Add to Cart / Buy Now / Quantity controls at the card and PDP level (verified UI pattern, §3/§6 above) — everything past "click Add to Cart" is out of scope until the architecture decision is made.

## 9. Legal pages (Privacy Policy, Terms and Conditions)

**Verified:** both currently say "coming soon" on the live site, with Terms additionally showing an empty "Return and Refund Policy" heading (`docs/source-of-truth.md` §A.6–A.7).
**UX treatment [SYSTEM]:** Build the page templates now (heading, breadcrumb, body-copy container) but populate them with the **actual verified "coming soon" state**, not placeholder Lorem ipsum and not fabricated policy text. This is a real, honest reproduction of the current site state, matching your instruction to preserve "coming soon" as a fact rather than treat it as our own content gap.

## 10. Responsive strategy

| Breakpoint | Header | Hero | About/Philosophy sections | Product grid | PDP |
|---|---|---|---|---|---|
| Mobile (0–767px) | Hamburger + logo + cart icon | Stacked, image first | Stacked, image above text | 1 column (or horiz. scroll for Featured) | Stacked: image, then accordion-based info |
| Tablet (768–1023px) | Full nav visible if it fits, else hamburger | Side-by-side, smaller image proportion | Side-by-side begins | 2 columns | Image + info, still mostly stacked info |
| Desktop (1024–1439px) | Full nav | Side-by-side | Side-by-side, `container-narrow` text | 3 columns | Sticky image left, scroll info right |
| Large desktop (1440px+) | Full nav, wider gutters | Side-by-side, larger image | Side-by-side, generous whitespace | 3–4 columns | Same as desktop, wider gutters |

Mobile is designed as its own layout at every section above (per-breakpoint stacking/column decisions), not a shrink of the desktop grid — per the brief's explicit requirement.

## 11. Accessibility strategy

Extends `design-system.md` §9 with page-level rules:
- **Skip-to-content link** on every page (keyboard users shouldn't have to tab through the full nav every time).
- **Heading hierarchy** enforced per page: one H1 (page title/hero headline), H2 for major sections, H3 for sub-sections/card titles — matches the verified heading structure already found in the archive's `data/content.json`.
- **Form accessibility:** newsletter and (future) cart/checkout forms use visible labels, inline error messaging tied to fields via `aria-describedby`, not color-alone error indication.
- **Image alt text:** product images use the verified product name + a short verified descriptor (e.g. from the "What It Does" copy) — never generic or fabricated.
- **Reduced motion:** every pattern in `motion-system.md` has a defined static fallback; this is a hard requirreturn, not optional polish.
- **Keyboard navigation:** cookie banner, mobile drawer, and (future) cart drawer must all be fully keyboard-operable and trap focus appropriately while open.

## 12. UI/UX heuristic self-check

Applying the requested evaluation lens (hierarchy, contrast, whitespace, rhythm, consistency, accessibility, responsive behavior, conversion UX, interaction design) against this architecture:

- **Hierarchy:** funnel mapping (§1) ensures each section has one clear job; product cards surface only price+name+CTA, not competing information.
- **Contrast:** palette contrast ratios defined and checked in `design-system.md` §2.2.
- **Whitespace/rhythm:** spacing scale and section-level vertical rhythm defined in `design-system.md` §4.1, applied consistently rather than per-section ad-hoc.
- **Consistency:** one card component, one button system, one type scale reused everywhere — no page-specific one-off styles.
- **Conversion UX:** single-CTA-per-section rule (§2.10/`design-system.md` §6.5), progressive disclosure on PDP to avoid overwhelming detail before purchase intent, breadcrumbs/search for low-friction discovery.
- **Interaction design:** every interactive element's states (rest/hover/active/disabled/focus) defined in `design-system.md` §6, not left implicit.

## 13. Conversion-focused review (Phase 2 refinement)

A dedicated pass over this architecture against e-commerce conversion priorities, per your request. No new sales copy, claims, or urgency/scarcity messaging is introduced anywhere below — this section evaluates structure and interaction only.

**Product discovery:**
- Shop (§5) is reachable from the header on every page (verified nav, one click from anywhere).
- Featured Products on the homepage (§2.5) surfaces a subset before a visitor ever reaches Shop — shortens the path to a product for a hero-driven visitor.
- Category filtering (§5) uses only the 9 verified category names — real discovery paths, not invented ones.
- Search (§7) covers the full 10-product catalog, not a partial or placeholder index.
- **Adjustment:** breadcrumbs (§7) and a persistent "Back to Shop" affordance on every PDP reduce dead-ends — a visitor who lands directly on a product page (e.g. from search) always has an obvious next step.

**Product visibility:**
- Product Card (§3) shows image, name, and price with no extraneous information competing for attention — nothing buried behind an extra click to see the price.
- Awaiting-asset products (`component-system.md` §5) remain fully visible and purchasable in the grid rather than hidden — a missing photo doesn't remove a product from discovery, it only affects its imagery.

**Clear pricing:**
- `PriceDisplay` (`component-system.md` §2) renders only verified price data, in the verified format — "From $X" stays "From $X" rather than being smoothed into a single misleading number. Where a price has an open question (Geranium Lip Balm 10ml tier), the card/PDP shows what's verified and nothing invented — a visitor is never shown a wrong price, only an honestly incomplete one until verification lands.

**Strong but tasteful CTAs:**
- One primary CTA per section (`design-system.md` §6.5) — hero "Shop Now," card "Add to Cart," PDP "Buy Now"/"Add to Cart" pairing (verified existing pattern). No stacked/competing CTAs, no invented urgency language ("only 2 left," "selling fast") anywhere — none of that is verified to be true and none is fabricated to imply it.

**Low interaction friction:**
- Inline search (§2.1) rather than a separate search results page.
- Accordion-based ingredient/usage/safety info on mobile PDP (§6) keeps the path to "Add to Cart" short on small screens rather than forcing a long scroll past every ingredient before reaching the purchase action.
- Newsletter capture (§2.9) is a single inline field, not a multi-step form.

**Clear navigation:**
- Nav is exactly what's verified to exist (Home, Shop) — no invented mega-menu or category flyout that would misrepresent the site's real structure.
- Sticky header keeps Shop/cart access available while scrolling long homepage sections.

**Mobile purchase flow:**
- Per the responsive table (§10): product grid single-column, PDP image-first with accordion-collapsed detail, CTA always reachable without excessive scrolling (sticky Add to Cart bar on mobile PDP is worth considering in Phase 3 implementation, flagged here as an option, not decided).
- Touch targets meet the 44×44px minimum (`design-system.md` §9) throughout — cart/search icons, card CTAs, form fields.

**Visual trust:**
- Real product photography (once supplied) and the verified formulation claims already in the copy (0% water, ingredient transparency, safety notes on every product) are the trust carriers — not badges, counters, or claims that aren't sourced.
- The "Raving Fans" gap (§4) is the one place trust-building content is genuinely missing; it is being left honestly absent/minimal rather than faked, which is itself a trust-preserving choice (a fabricated testimonial discovered later would cost far more trust than an absent section).

## 14. Remaining blockers affecting this architecture

Carried from `docs/verification-checklist.md` — this document works around them without resolving them:
- Product photography for 8 of 10 products (affects §2.5, §3, §6 — see Blockers list in final chat summary).
- Cart/checkout architecture (§8 — cannot be designed further until decided).
- Body Oils size, Geranium Lip Balm 10ml price, Trial Collection sample sizes, Body Butter variant photo — affect specific card/PDP fields, shown as verified-partial rather than guessed.
