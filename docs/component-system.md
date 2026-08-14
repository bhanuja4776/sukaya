# SUKAYA Component System — Phase 2

**Status: DRAFT — documentation only. No React components have been created, no dependencies installed.**

## 1. Proposed technology stack **[SYSTEM — recommendation, unchanged from `docs/content-inventory.md` §7]**

- **Next.js (App Router) + TypeScript** — file-based routing maps directly onto the verified 4-page site plus Shop/PDP routes.
- **Tailwind CSS** — implements the token system in `design-system.md` (colors, spacing, radius, shadows, type scale) directly as config, keeping every component consistent by construction rather than by discipline.
- **shadcn/ui as an unstyled primitive base** *(new recommendation, added here)* — for accessible, unstyled interactive primitives (dialog/drawer, accordion, tabs, form controls) that get fully re-skinned with SUKAYA's tokens. This is the practical way to satisfy "adapt 21st.dev components, don't copy them raw" (§4) — 21st.dev components are themselves commonly built on shadcn/ui primitives, so starting from the same accessible foundation makes adaptation straightforward rather than fighting someone else's design opinions.
- **Framer Motion (`motion`)** — implements `motion-system.md` exactly as specified there.
- **Product content as structured local data** (TypeScript objects generated directly from `docs/product-inventory.md`) — not a headless CMS at this stage, so every field traces directly to a verified source file.
- **Images** via `next/image`, served from `/public` once real assets are supplied (see Blockers).

Nothing here is installed yet — this is the stack this documentation is written against, pending your approval to begin Phase 3.

## 2. Component inventory

| Component | Purpose | Content source |
|---|---|---|
| `Header` | Sticky nav, logo, search, cart icon | `docs/website-architecture.md` (verified nav) |
| `MobileDrawer` | Mobile nav drawer | Same as Header |
| `SearchControl` | Inline product search | `docs/product-inventory.md` (10-product catalog) |
| `CartControl` | Cart icon + item count | Blocked — see §6 |
| `Hero` | Homepage hero | `docs/source-of-truth.md` §A.1–A.3 (verified copy) |
| `SectionHeading` | Reusable section title component (About Sukaya, Featured Products, etc.) | Verified heading text per section |
| `TextImagePanel` | Reusable asymmetric image/text layout — powers Philosophy, Commitment, Aromatherapy sections | Verified paragraph copy + recovered images |
| `PullQuote` | Highlights one verified line of copy at large scale (e.g. "0% water") | Verified copy only, no new text |
| `ProductCard` | Product teaser (Featured Products, Shop grid) | See §3, full spec below |
| `ProductGrid` | Layout wrapper for `ProductCard`s, handles category filtering | `docs/product-inventory.md` |
| `GalleryCarousel` | "Explore our stunning range" section | Recovered + PDF images (partial set, see Blockers) |
| `TrustSection` | Placeholder name for whichever "Raving Fans" option (`ux-architecture.md` §4) is approved | Pending your decision — not built until chosen |
| `ContactSection` | Contact copy + live map | Verified copy (`docs/source-of-truth.md`) |
| `NewsletterForm` | Subscribe section | Verified copy |
| `Footer` | Site footer | Verified copyright/links |
| `CookieBanner` | Cookie consent | Verified copy (`docs/source-of-truth.md` §A.12) |
| `Button` | Primary/secondary/ghost variants | `design-system.md` §6.1 |
| `PriceDisplay` | Renders verified price, handles "From $X" and struck-through sale price (Trial Collection) patterns | `docs/product-inventory.md` — **never computes or guesses a price** |
| `IngredientAccordion` | Expandable Ingredients/How to Use/Safety Notes on PDP | Verified verbatim copy per product |
| `AwaitingAssetPlaceholder` | Non-photographic placeholder for missing product images | See §5 |
| `Breadcrumb` | Shop/Category/Product wayfinding | Verified category + product names |

## 3. Product Card — detailed architecture

Per your explicit request, the full spec:

**Required fields (all verified, none invented):**
- Product image (real photo where available, `AwaitingAssetPlaceholder` where not — §5)
- Exact product name (as written in `docs/product-inventory.md`)
- Exact price, using the verified format exactly as sourced (e.g. "$31.99", "From $5.99", "~~$19.99~~ $15.99 · Save 20%" for Trial Collection — struck-through/sale formatting only where the source itself shows a sale, never invented)
- Category label (from the 9 verified categories), shown as a small `label`-styled tag — omitted if a product's category is ambiguous rather than guessed
- CTA: "Add to Cart" (icon-only at rest on desktop per `motion-system.md` `product-hover`, always-visible label on mobile)

**States:**
- Rest: `shadow-rest`, image static, CTA hidden (desktop only)/visible (mobile)
- Hover (desktop): `product-hover` pattern — image `soft-scale`, CTA fades in, card elevates to `shadow-hover`
- Focus (keyboard): same visual treatment as hover, triggered by `:focus-within`, plus visible focus ring on the card's link wrapper
- Awaiting-asset variant: image slot replaced by `AwaitingAssetPlaceholder`; card otherwise identical (name/price/CTA still fully functional — a missing photo doesn't mean a non-functional card)

**Layout:** `radius-md`, `cream-0` surface, 3:4 or 1:1 image aspect ratio (consistent across all cards — recommend confirming against real product photography once available, since bottle/jar/tube shapes vary and a single ratio must accommodate all 10 without awkward cropping), 16px internal padding below the image, name in `heading-3`, price in `body` weight 600, category tag in `label`.

**Accessibility:** entire card is one focusable link (`<a>` wrapping the card, not a nested interactive CTA button competing for the same click), image `alt` = exact product name + short verified descriptor, price and name are real text (not embedded in the image) so they're screen-reader and zoom accessible.

## 4. 21st.dev component recommendations

**Access note:** this environment has no live web access in this session, so these recommendations are made at the **pattern/category level** — the kind of component to source and adapt from 21st.dev's catalog — rather than citing specific named components whose current existence/API I can't verify from here. Before Phase 3, whoever has live access should confirm specific component matches against these patterns.

| Pattern to source | Purpose | Why it fits SUKAYA | What will be customized | What must NOT be copied as-is |
|---|---|---|---|---|
| Minimal sticky navbar w/ scroll-aware background | `Header` | Common, well-solved accessibility/interaction pattern (focus trap, keyboard nav) — no need to hand-roll | Full color/type/spacing re-skin to `design-system.md` tokens; remove any built-in mega-menu (nav is only Home+Shop) | Any default "SaaS product" visual styling, dark-mode-first color assumptions, glassmorphism/blur backgrounds |
| Editorial image+text split section | `TextImagePanel` | Matches the verified About/Philosophy/Commitment/Aromatherapy layout need exactly | Text column width, image treatment, spacing to match `design-system.md` §4 | Any built-in decorative gradient overlays or "tech" iconography |
| E-commerce product card | `ProductCard` | Accessible card interaction pattern (hover states, focus handling) is genuinely hard to get right from scratch | Full visual re-skin per §3; remove any built-in star-rating display (no verified ratings exist — must not ship even a "0 stars" placeholder that implies a rating system) | Built-in "quick view" modal patterns unless a real product-image-rich enough to support it exists; any badge/ribbon styles implying sales/urgency not verified to exist |
| Accordion | `IngredientAccordion` | Solves keyboard/ARIA accordion semantics correctly | Visual styling only | Any icon set or animation timing that doesn't match `motion-system.md` |
| Cookie consent bar | `CookieBanner` | Accessibility (focus management, dismiss behavior) is easy to get subtly wrong | Copy (already verified, exact text must be used), color/button styling | Any component that blocks the full page with a modal — verified live pattern is a non-blocking banner |
| Image carousel/gallery | `GalleryCarousel` | Touch/swipe + keyboard-arrow support is worth reusing rather than reinventing | Minimal-chrome visual restyle, dot indicators only (no arrows-and-thumbnails-and-counter clutter) | Auto-advancing/looping carousels — conflicts with "no infinite/looping motion" rule in `motion-system.md` §4 |

**Explicitly not recommended from 21st.dev's typical catalog for this project:** bento-grid marketing layouts, animated gradient-text headlines, particle/canvas backgrounds, 3D tilt card effects, marquee/logo-cloud strips (nothing to put in one — no certifications/press logos are verified to exist) — all conflict with the brief's exclusions or would require content that isn't verified.

## 5. Awaiting-Asset Placeholder — detailed spec

For the 8 of 10 products with no usable photography (`docs/product-inventory.md`), and any other image slot lacking a verified asset:

- **Visual:** a solid `sage-100` or `cream-0`-on-`sand-200`-border panel (design-system tokens), centered simple line-art icon (e.g. a single-stroke leaf or droplet glyph — decorative only, not representing the actual product shape, so it's never mistaken for a real photo even at a glance) plus small `body-sm`/`ink-600` caption text: **"Product photography coming soon."**
- **Explicitly not:** no AI-generated image, no stock photo, no blurred/low-res stretch of an unrelated image, no attempt to approximate the product's appearance. The placeholder must read as an obvious placeholder, not a degraded photo.
- **Behavior:** static (no shimmer/skeleton-loading animation, per `motion-system.md` §4) — it's a permanent state until a real asset is supplied, not a loading state.
- **Scope:** applies at Product Card, PDP hero image, and Featured Products/Shop grid — one component reused everywhere a product image would go, so replacing it with a real photo later is a one-place data change, not a per-page fix.

## 6. Cart/Checkout components — explicitly not designed yet

`CartControl`'s icon/badge is documented (§2) because it's part of the persistent header, but its drawer/page contents, and any `Checkout` component, are **not specified in this document** — per `ux-architecture.md` §8, this is blocked on an architecture decision (link-out vs. hosted commerce vs. custom build) that hasn't been made. Building these components now would mean guessing at functionality the brief explicitly says not to assume.

## 7. Cross-references

- Visual tokens each component consumes: `design-system.md`
- Animation patterns each component uses: `motion-system.md`
- Page-level composition (which components appear where, in what order): `ux-architecture.md`
