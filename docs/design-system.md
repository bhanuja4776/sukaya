# SUKAYA Design System — Phase 2

**Status: DRAFT — documentation only. No components built, no dependencies installed, no website implementation started.**

## How to read this document

Every value below is one of two things, and each is labeled:

- **[VERIFIED]** — taken directly from `docs/source-of-truth.md` / the live-site archive (the confirmed brand color `#547d54`, the confirmed typefaces Righteous and Josefin Sans). These are facts about the existing brand, not invented.
- **[SYSTEM]** — a new design decision authored for this refurbishment, built around the verified anchors. This is normal design-system work (spacing scales, derived tints, shadow values are not "business information" in the sense the brief protects — no product claims, prices, ingredients, or brand history are invented anywhere in this document). Every [SYSTEM] value is a recommendation, not a fact, and is open for revision before implementation.

Nothing product-related, legal, or claims-based appears in this document — that content lives in `docs/product-inventory.md` and `docs/content-inventory.md`, verbatim and untouched.

## 1. Design direction

**Target feeling:** "premium natural skincare with subtle digital craftsmanship" — calm, editorial, tactile, trustworthy. A visitor should think "this is a well-made small skincare brand," not "this is a tech product" or "this is a template."

**Governing principles:**
1. **Product and ingredient photography is the hero.** UI recedes; imagery, whitespace, and typography carry the premium feeling — not effects.
2. **Warmth over sterility.** Off-white/cream surfaces, warm neutral text, soft organic shadows — never stark white-on-black or cold gray-scale.
3. **Restraint as a feature.** One accent color family, one display face used sparingly, motion that appears only where it clarifies something.
4. **Editorial rhythm.** Generous vertical whitespace between sections, asymmetric image/text pairings (as the source homepage already does with About/Philosophy/Commitment/Aromatherapy), not a rigid card grid everywhere.
5. **Every design choice traces to something real** — the sage green and the two typefaces are the only brand facts we have, so the whole palette and type system is built outward from them rather than from a generic "skincare template" aesthetic.

## 2. Color system

### 2.1 Verified anchor

- **Primary — Sukaya Sage** `#547D54` **[VERIFIED]** (theme-color meta tag + repeated CSS value on the live site).

### 2.2 Derived palette **[SYSTEM]**

Built by extending the verified sage green into a full accessible palette, plus warm neutrals and one accent drawn from colors that genuinely appear in the brand's own verified product/ingredient photography (pink clay, honey, dried botanicals — visible in `docs/asset-inventory.md`'s recovered lifestyle images) rather than an arbitrary color-wheel choice.

| Token | Hex | Usage |
|---|---|---|
| `sage-900` (Deep Sage) | `#2E4530` | Primary body text on light surfaces (softer than black; pairs with warm neutrals) |
| `sage-700` (Sukaya Sage — brand primary) | `#547D54` | Primary buttons, links, active states, icon accents — **the verified brand color, unchanged** |
| `sage-500` | `#7A9B7A` | Secondary UI accents, borders on interactive elements |
| `sage-200` | `#D9E4D3` | Subtle tinted backgrounds (badges, hover states, section dividers) |
| `sage-100` | `#EEF3EA` | Lightest tint — section background variation |
| `cream-50` (Warm Paper) | `#FAF7F1` | Primary page background — replaces stark white |
| `cream-0` (Card White) | `#FFFDF9` | Card/panel surfaces, slightly lifted from page background |
| `sand-200` | `#E7E0D3` | Borders, dividers, input outlines |
| `ink-900` (Warm Ink) | `#2B2822` | Default body text — warm near-black, not pure `#000` |
| `ink-600` | `#5C574C` | Secondary/muted text (captions, meta info) |
| `terracotta-500` (accent — new, sourced from real product tones) | `#B9744F` | Sparing use only: sale/discount badges (e.g. Trial Collection), warm highlight moments — never a primary CTA color |
| `success` | `#547D54` (= sage-700) | Confirmation states (newsletter signup success, added-to-cart) — reuses brand color rather than introducing a generic green |
| `error` | `#A6493A` (muted brick red, harmonizes with terracotta) | Form validation only — deliberately desaturated, not a harsh alert red |

**Contrast rule [SYSTEM]:** `ink-900` on `cream-50`/`cream-0` = AAA body text contrast. `sage-700` on `cream-50` meets AA for large text/UI (buttons); body-size text must use `ink-900`, not sage, for paragraphs — sage is for accents and short labels only.

**What's deliberately absent:** no neon, no saturated blue/purple (nothing in the verified brand supports it), no pure black (`#000`) as a text or background color despite it appearing once in the raw CSS scan — that single low-frequency occurrence (`observed_css_colours_by_frequency` in the archive) reads as incidental utility CSS, not a brand color, so it's not being carried forward as one.

## 3. Typography

### 3.1 Verified anchors

- **Righteous** **[VERIFIED]** — the logo wordmark's typeface (rounded, geometric display slab), confirmed via the archive's typography scan and visible directly in the logo artwork itself.
- **Josefin Sans** **[VERIFIED]** — confirmed body/UI typeface via the same scan.

### 3.2 Usage recommendation **[SYSTEM] — flagged for sign-off**

The live site currently appears to use Righteous fairly broadly (per the raw CSS scan). For the "premium editorial" direction, **recommend narrowing Righteous to brand-specific moments only** — the logo lockup and the homepage hero headline — while using Josefin Sans, at elevated scale/weight/tracking, for all other headings. Rationale: Righteous is a rounded, slightly playful display face; used sparingly it reads as "confident brand mark," used pervasively across every heading it pulls the site toward "friendly/craft blog" rather than "premium editorial." **This is a recommendation, not a decision** — it changes how an existing verified brand asset is applied, so it needs your approval before Phase 3, per the same standard as any other design choice that touches the brand's existing presentation.

### 3.3 Type scale **[SYSTEM]**

Fluid scale (`clamp()`-based in implementation), ratio ≈1.25, base 16px:

| Token | Size (desktop) | Size (mobile) | Weight | Face | Usage |
|---|---|---|---|---|---|
| `display-hero` | 56–72px | 34–40px | 400 | Righteous | Hero H1 only |
| `display-brand` | 28–32px | 22–24px | 400 | Righteous | Logo wordmark, standalone brand moments |
| `heading-1` | 40px | 28px | 500 | Josefin Sans, +2% tracking | Section titles ("About Sukaya," "Featured Products") |
| `heading-2` | 28px | 22px | 500 | Josefin Sans | Sub-section titles ("Our Philosophy," product names on PDP) |
| `heading-3` | 20px | 18px | 600 | Josefin Sans | Card titles, product-card names |
| `body-lg` | 18px | 17px | 400 | Josefin Sans | Intro paragraphs, hero subheadline |
| `body` | 16px | 16px | 400 | Josefin Sans | Default body copy, ingredient lists |
| `body-sm` | 14px | 14px | 400 | Josefin Sans | Captions, safety notes, meta text |
| `label` | 13px | 13px | 500, uppercase, +6% tracking | Josefin Sans | Buttons, badges, nav items |

**Line-height:** 1.15 for display/headings, 1.6 for body copy (editorial reading comfort). **Line length:** body text columns capped at ~65–75 characters (see container widths, §4) — this is why the source homepage's paragraph blocks (Philosophy, Commitment) should render in a constrained text column, not full-bleed.

## 4. Spacing, containers, layout

### 4.1 Spacing scale **[SYSTEM]** — base unit 4px

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160` (px). Section-level vertical rhythm uses the top of this scale (`96–160px` between major homepage sections on desktop, `64px` on mobile) — generous whitespace is a core part of the "premium editorial" feeling, not a default.

### 4.2 Container widths **[SYSTEM]**

| Token | Width | Usage |
|---|---|---|
| `container-wide` | 1280px | Section outer bounds, image-heavy layouts |
| `container-default` | 1120px | Standard content sections |
| `container-narrow` | 720px | Long-form text columns (Philosophy/Commitment paragraphs, policy pages) |
| `container-product` | 960px | Product detail page copy column |

Gutter: 24px mobile, 32px tablet, 48px desktop.

### 4.3 Border radius **[SYSTEM]**

Soft, organic, never sharp or bubble-round:

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 6px | Inputs, small buttons, badges |
| `radius-md` | 14px | Product cards, panels |
| `radius-lg` | 24px | Hero image frame, large feature panels |
| `radius-pill` | 999px | Tags, pill buttons (e.g. size/fragrance selectors) |

### 4.4 Shadows / elevation **[SYSTEM]**

Warm-tinted, low-opacity — never pure black shadows (which read as "digital/cold" rather than tactile):

| Token | Value | Usage |
|---|---|---|
| `shadow-rest` | `0 1px 2px rgba(43,40,34,0.04)` | Cards at rest |
| `shadow-hover` | `0 12px 24px rgba(43,40,34,0.08)` | Card/button hover lift |
| `shadow-float` | `0 24px 48px rgba(43,40,34,0.10)` | Hero image, modal/drawer |

## 5. Image treatment **[SYSTEM]**

- **Product photography:** consistent neutral/warm background per `docs/asset-inventory.md`'s existing product shots (light gray/cream studio background), `radius-md` corners, `shadow-rest` at rest → `shadow-hover` + subtle scale (1.02×) on hover (see `docs/motion-system.md`).
- **Lifestyle/editorial imagery** (botanicals, ingredients, aromatherapy shots): full-bleed or `radius-lg` framed, allowed to break the grid slightly for editorial asymmetry (image overlapping into an adjacent section's whitespace) — this is where "depth as craftsmanship" (§7 below, and `docs/motion-system.md` §3D/Depth) is expressed, not through 3D effects.
- **Missing product images:** see `docs/component-system.md` §"Awaiting-Asset Placeholder" — a clearly-labeled non-photographic placeholder, never a stock or AI-generated substitute.
- **Flagged existing assets** (the AI-generation-flagged hero image, two Getty stock images — `docs/asset-inventory.md` §4): none are used as defaults in this design system's examples; treated as pending your decision.

## 6. Core UI elements

### 6.1 Buttons **[SYSTEM]**

| Variant | Style | Usage |
|---|---|---|
| Primary | `sage-700` fill, `cream-0` text, `radius-pill`, `label` type | Add to Cart, Buy Now, Sign Up, Shop Now |
| Secondary | 1.5px `sage-700` outline, `sage-700` text, transparent fill | "View Product," secondary actions |
| Ghost/Text | No border/fill, `sage-700` text, underline on hover | Nav links, "Learn more" |

States: rest → hover (`shadow-hover` + 2% darken) → active (4% darken, no shadow) → disabled (40% opacity, no interaction) → focus (2px `sage-500` outline offset 2px, always visible — never `outline: none`).

### 6.2 Links **[SYSTEM]**
Body links: `sage-700`, underline always visible (not hover-only) inside paragraph text for accessibility/scannability; nav and card links may be underline-on-hover only since their tap target is the whole element.

### 6.3 Cards **[SYSTEM]**
Base card: `cream-0` surface, `radius-md`, `shadow-rest`, 24px internal padding. See `docs/component-system.md` for the full Product Card spec.

### 6.4 Navigation **[SYSTEM, structure VERIFIED]**
Structure is Home + Shop only (verified, `docs/source-of-truth.md` §A.4) — the design system does not add nav items beyond what's confirmed. Sticky header on scroll, `cream-50` background at 95% opacity with a subtle bottom border (`sand-200`) once scrolled, logo left, nav center/right, search + cart icons right. Mobile: hamburger → full-height drawer, `cream-50` background, large tap targets (min 44×44px).

### 6.5 CTA patterns **[SYSTEM]**
One primary CTA visible per viewport section maximum (avoid competing calls-to-action — a direct application of the conversion funnel in `docs/ux-architecture.md`). Product-card CTA is "Add to Cart" (icon + label on hover, icon-only at rest on desktop to keep the image dominant); PDP CTA is the full Buy Now/Add to Cart pairing matching the verified existing product-page pattern.

## 7. Depth & dimensionality principles **[SYSTEM]**

Full detail in `docs/motion-system.md` §"3D / Depth System" — summarized here as it's a design-system-level rule, not just a motion detail:

- Depth comes from **layout layering** (image bleeding past a section boundary, offset text/image pairings) and **soft shadow elevation**, not from 3D transforms, tilt effects, or literal 3D objects.
- Parallax, where used, is limited to a single background layer moving slower than foreground content on scroll — subtle enough that a user feels "this section has depth" without consciously noticing motion.
- No product ever rotates, floats independently, or gets a drop-shadow/glow treatment that reads as "3D render." Real photography stays photographic.

## 8. Responsive breakpoints **[SYSTEM]**

| Token | Min-width | Target |
|---|---|---|
| `mobile` | 0 | Phones (default/mobile-first base styles) |
| `tablet` | 768px | Tablets, small laptops |
| `desktop` | 1024px | Standard desktop |
| `desktop-lg` | 1440px | Large desktop / wide monitors |

Full per-breakpoint layout behavior documented in `docs/ux-architecture.md` §"Responsive Strategy."

## 9. Accessibility rules **[SYSTEM]**

- Minimum contrast: body text AAA (7:1), UI components/large text AA (4.5:1) — verified against the palette in §2.2.
- All interactive elements: visible focus ring (never removed), minimum 44×44px touch target.
- All imagery: real, descriptive `alt` text sourced from verified product names/descriptions (e.g. reuse the exact product name + short description already in `docs/product-inventory.md`) — never generic "image" alt text, never fabricated marketing copy in alt text.
- Motion: every animation must have a `prefers-reduced-motion` fallback (instant state change, no transition) — detailed per-pattern in `docs/motion-system.md`.
- Semantic HTML throughout: real heading hierarchy (one H1 per page), landmark regions (`nav`, `main`, `footer`), form labels always visible/associated (not placeholder-only, e.g. the newsletter email field).
- Cookie consent banner (verified copy, `docs/source-of-truth.md` §A.12): must be keyboard-navigable and not block page content from screen readers while present.

## 10. Cross-references

- Motion tokens and named patterns: `docs/motion-system.md`
- Component-by-component specs (Product Card, Header, Hero, etc.): `docs/component-system.md`
- Section-by-section homepage/PDP UX rationale: `docs/ux-architecture.md`
