# SUKAYA Phase 4 — Product Experience Report

**Status: Shop listing and product detail pages implemented and verified (lint/typecheck/build/runtime all pass). Checkout and payment provider are NOT built/selected. Awaiting review.**

## 0. Source material re-inspected before coding

Per your instruction, re-read fresh (not from memory) before writing any code:
- `docs/content-inventory.md` §2 (full verbatim product copy — re-read in full this session to transcribe the long-form PDP content with zero drift risk)
- `docs/product-inventory.md`, `docs/asset-inventory.md`, `docs/website-architecture.md`, `docs/verification-checklist.md`
- The existing `content/products.ts` / `content/assets.ts` (Phase 3A/3B) to build on top of rather than duplicate

## 1. Shop / product listing route

`/shop` — all 10 verified products/product-groups (`docs/product-inventory.md`). Heading, category filter, product grid.

## 2. Product grid

`components/products/shop-grid.tsx` — client component managing category-filter state, rendering `ProductCard`s in a `RevealGroup`/`FadeUp` staggered reveal (reused from Phase 3B, not reinvented).

## 3. Product card

`components/products/product-card.tsx` — updated from Phase 3B. It now links to its real product detail page (`/shop/[slug]`) since PDPs exist as of this phase; Phase 3B had deliberately left it as a non-link for exactly this reason ("trivial to swap to a real `<Link>` once PDPs are built" — now done). "Add to Cart" stays a properly `disabled` button, kept as a sibling of the link rather than nested inside it (an `<a>` wrapping a `<button>` is invalid/inaccessible nesting) — cart/checkout is still out of scope.

## 4. Product filtering/sorting

**Filtering: implemented.** Category filtering only, because it's the one piece supported by verified website requirements — the live site's own sitemap confirms 9 real product categories (`docs/website-architecture.md`), and every product's category is a verified field (`docs/product-inventory.md`). Filter pills computed dynamically from the actual category values in `content/products.ts` (currently 8 distinct, since "Face" has zero mapped products — not rendered as a dead filter option).

**Sorting: not implemented.** Nothing in the source material (PDF, live-site archive, or the crawl's own captured forms/UI) evidences a sort control existing on the live site — inventing one would be adding UI/functionality that isn't verified, which the brief prohibits by the same logic as inventing content.

## 5. Product detail architecture

New file `content/product-details.ts` — the long-form PDP content deliberately deferred out of Phase 3A's `content/products.ts` (that file's own comment says: "deferred pending the phase that actually builds PDPs" — this is that phase). Every field is transcribed verbatim from `docs/content-inventory.md` §2, re-read fresh this session rather than from memory.

Three shapes, matching what the source material actually contains — not forced into one generic template:
- **`details: ProductDetail`** — single-variant products (7 of 10).
- **`variantDetails: { variantName; detail }[]`** — Body Oils (Calming/Uplifting) and Body Butters (Original/Calming), each variant with its own complete, independently-verified content set (the PDF genuinely has two full descriptions per product, not one shared one).
- **`bundleContents` / `bundleNote`** — Trial Collection only, which has a fundamentally different shape (a bundle description + 4 short per-item blurbs, explicitly "refer to individual products" for detail — so its PDP cross-links to the 4 real product pages for those items, e.g. "Pink Blush - Cleanser Exfoliator Mask" links to `/shop/cleanser-exfoliator-mask---pink-blush`).

**Handling the two documented data gaps without new content:**
- **Body Oils size** (`docs/verification-checklist.md` item 3) — `content/products.ts`'s `size: NEEDS_VERIFICATION` renders as "Size pending verification" on the PDP, not a guessed number.
- **Geranium Lip Balm 10 ML price** (item 4) — added a new, reusable `sizeVariants` field to the `Product` type (`{ label, price: ProductPrice | NEEDS_VERIFICATION }[]`) specifically so a size selector can exist honestly: selecting "5 ML" shows the verified `$5.99`; selecting "10 ML" shows "Price pending verification" rather than inventing a number or hiding the option. This mechanism is generic — any future product with a per-size price gap uses the same field, no redesign needed.

**"Insert later without redesigning" — how this was achieved specifically:** every optional field in `ProductDetail` (`tagline`, `benefits`, `ingredients`, `skinType`, `aromaAndTexture`, `howToUse`, `safetyNotes`) is individually checked in `ProductDetailView` and simply omitted from the render when absent — verified concretely by Rosewood Spoon, which only has a `description` and renders correctly with no empty "Ingredients: (none)" sections. The image slot is the same `AwaitingAssetPlaceholder` component from Phase 3A/3B — no PDP-specific placeholder was built, reusing the one already-approved component.

## 6. Product detail page for verified product data

`/shop/[slug]` — `generateStaticParams` from `content/products.ts` (all 10 slugs prerendered, confirmed in the build output), `notFound()` for any other slug (verified: a nonexistent slug returns a real 404, not a broken page). Layout: sticky image (desktop) + purchase panel (price/pending-price, size/fragrance selector where applicable, quantity stepper, disabled Buy Now/Add to Cart) beside a scrolling info column (breadcrumb, tagline, description, What It Does/Key Benefits — exact heading preserved per product, Skin Type, Aroma & Texture, then an accordion for Ingredients/How to Use/Safety Notes).

## 7. Responsive product experience

Verified with a real headless browser across 4 viewports (390/820/1440/1920px) on 8 representative pages (Home, Shop, and 6 PDPs covering every content shape: real image + single variant, no image + fragrance variants ×2, real image + size-variant pending price, bundle contents, minimal/no-ingredients product) — **32 checks, zero horizontal overflow, zero broken images at any combination.** Mobile PDP additionally screenshotted after a real incremental scroll: image, purchase panel, and the collapsed accordion (correct "+" icons, closed by default) all render correctly.

## 8. Accessible interactions

- Category filter pills: `role="group"`, `aria-pressed` per pill, 44px minimum touch target.
- Fragrance/size selectors: same pattern (`role="group"`, `aria-pressed`), keyboard-operable native `<button>`s.
- **Accordion** (`components/ui/accordion.tsx`) — hand-rolled (see §13), correct `aria-expanded`/`aria-controls` wiring, `role="region"` on each panel, pure-CSS height animation (`grid-template-rows`) so it respects the global `prefers-reduced-motion` fallback with no extra JS.
- Quantity stepper: labeled `-`/`+` buttons (`aria-label`), live region (`aria-live="polite"`) announcing the current count to screen readers.
- Buy Now / Add to Cart: real `disabled` buttons with honest `aria-label`s (e.g. "Buy Geranium Lip Balm now — coming soon"), matching the Product Card's Phase 3B precedent — not fake links, not silently non-functional with no explanation.
- Breadcrumb: semantic `<nav aria-label="Breadcrumb">` with an ordered list, verified category/product names only.

## 9. Subtle motion interactions

No new motion primitives needed or added — reused Phase 3A/3B's existing set:
- `ImageReveal` for the PDP hero image.
- `FadeUp` for the info column.
- `RevealGroup` for the Shop grid's staggered card entrance.
- Product Card's hover (`product-hover`) is the same plain-CSS `group-hover` implementation from Phase 3B — unchanged.
- Accordion expand/collapse and the chevron rotation are CSS transitions, not Framer Motion — consistent with keeping simple state-driven UI lightweight (`docs/motion-system.md`'s performance guidance).

## 10. What was NOT built (explicitly, per instructions)

- **Checkout** — no cart page, no payment flow, nothing.
- **Payment provider** — not selected, not referenced anywhere in code or content.
- **Cart state** — "Add to Cart"/"Buy Now" remain honestly `disabled` everywhere (Product Card and PDP alike); no client-side cart store was added.

## 11. QC results

- **`npm run lint`** — clean, 0 errors/warnings.
- **`npx tsc --noEmit`** — clean, 0 errors.
- **`npm run build`** — succeeds; all 10 PDPs + `/shop` + `/` statically generated (confirmed in build output, not assumed).
- **Responsive runtime test** — 4 viewports × 8 pages, real Chromium (Playwright, pre-installed instance), real incremental scrolling (not full-page-screenshot resizing, which produced a known false-positive-prone artifact documented in Phase 3B) — **zero overflow, zero broken images, zero page errors, zero unexpected failed requests at every combination.**
- **Broken images** — checked via `img.complete && naturalWidth > 0` on every rendered page; all real product photos (Pink Blush mask, Geranium Lip Balm) load correctly, `unoptimized` handling from Phase 3B carried over identically to the new PDP hero image usage.
- **Horizontal overflow** — `scrollWidth === clientWidth` confirmed at every viewport on every page.
- **Console errors** — the only recurring one is the same artifact already documented in Phase 3B: the global Footer's `/privacy-policy` and `/terms-and-conditions` links get Next.js's automatic prefetch once the footer scrolls into view, and 404 because those pages don't exist yet by design. Now also visible on Shop/PDP pages since Footer is global — same root cause, same expected resolution (disappears once those pages are built in a later phase), confirmed by inspecting the exact failing URLs directly rather than assuming.
- **One investigation, not a bug:** early in this phase, `next start` briefly kept serving stale 404 responses for `/shop` and every PDP route immediately after a rebuild. Traced to a leftover server process from a prior test cycle still bound to the port (confirmed via `ps`/killing it by PID and restarting cleanly resolved it immediately) — not a routing or code defect; the build output and `routes-manifest.json` had the routes correctly registered the whole time.

---

Stopping here per your instruction. Not building checkout or selecting a payment provider until explicitly asked.
