# SUKAYA Phase 5 — Commerce + Existing Site Functionality Investigation

**Status: Investigation only. No cart, checkout, or payment functionality is implemented in this phase. No payment provider is selected. No product content or imagery was touched.**

This document uses **only** material already collected in this project — `docs/content-inventory.md` (client-supplied PDF transcription), `docs/source-of-truth.md` (Phase 1.6 archive reconciliation), and `reference/sukaya-site-archive/` (the preserved live-site crawl) — plus `content/site.ts`/`content/products.ts` as already built. No new inference, guessing, or external browsing was performed. Every item below is marked **VERIFIED** (directly evidenced in the source material) or **NEEDS CLIENT VERIFICATION** (not evidenced, or only partially evidenced).

---

## Part 1 — 12-item investigation

### 1. Cart

**NEEDS CLIENT VERIFICATION.**
The archive attempted to load `/shop?olsPage=cart` and got back only the cookie-banner shell HTML — the actual cart UI is rendered client-side by GoDaddy's JavaScript widget and was explicitly recorded as **"NOT ACCESSIBLE"** to the crawler (`docs/source-of-truth.md` §D.5; `reference/sukaya-site-archive/technical/integrations.md`). The PDF likewise contains no cart-page screenshot — only the per-product "Quantity / Buy Now / Add to Cart" controls (`docs/content-inventory.md` line 507). No source shows what the cart itself looks like, what it contains, or how it behaves.

### 2. Add to Cart

**PARTIALLY VERIFIED.**
That an "Add to Cart" control **exists** on each PDP is verified — it appears in the PDF's product-page layout (`docs/content-inventory.md` line 507: "price → quantity/Buy Now/Add to Cart/Share"). What happens when it's clicked (client-side cart update, redirect, confirmation toast, etc.) is **NEEDS CLIENT VERIFICATION** — not observable in either source.

### 3. Product quantity

**VERIFIED (control exists) / NEEDS CLIENT VERIFICATION (behaviour).**
A quantity selector is part of the standard PDP block per the PDF (`docs/content-inventory.md` line 507). Whether it enforces stock limits, a maximum per order, or anything else is not evidenced anywhere and is **NEEDS CLIENT VERIFICATION**.

### 4. Product variants

**VERIFIED.**
Fragrance/size variants are directly confirmed as real, existing product structure — not a UI guess:
- Body Oils: one product page, two fragrance variants (Calming, Uplifting) — confirmed by the PDF content and independently corroborated by the archive's sitemap, which has exactly one `body-oil` slug rather than two (`docs/source-of-truth.md` line 21).
- Body Butters: one product page, two fragrance variants (Original, Calming) — same pattern, one `original-body-butter` slug.
- Geranium Lip Balm: two size options (5 ML tube, 10 ML tin), 5 ML price verified at $5.99, 10 ML price **NEEDS CLIENT VERIFICATION** (`docs/verification-checklist.md` item 4; already reflected honestly in `content/products.ts`).

### 5. Checkout

**NEEDS CLIENT VERIFICATION.**
No source reaches a checkout screen at all. The archive's crawler never got past the cookie-banner shell for any commerce-flow URL, and the PDF contains no checkout screenshots. `docs/source-of-truth.md` §G states this outright: "Cart UI/UX: NOT ACCESSIBLE to either source."

### 6. Payment processor

**NEEDS CLIENT VERIFICATION.**
The archive's own technical report states this in plain language: `reference/sukaya-site-archive/technical/integrations.md` — *"Payment/review/newsletter providers: NOT DETERMINED."* `reference/sukaya-site-archive/technical/tech-stack.md` confirms the same under "NOT DETERMINED": *"Payment provider and checkout processor were not exposed without a functioning product route/cart flow."*

**Important caveat already on record and repeated here so it isn't rediscovered as a false lead:** a text search of the platform's shared JavaScript bundle (`UX.4.51.22.js`, generic GoDaddy Website Builder framework code, not SUKAYA-specific) contains the strings "PayPal" and "Square". `docs/source-of-truth.md` line 80 explicitly flags this as **not confirmation** — that bundle ships generic support code across all GoDaddy Online Store sites regardless of which processor (if any) a given store has actually configured. Treat this as a red herring, not a finding.

### 7. Shipping

**NEEDS CLIENT VERIFICATION.**
No shipping rates, carriers, zones, or delivery-time information appear anywhere in the PDF or the archive. The one directly adjacent fact that is verified: the "Return and Refund Policy" heading exists on the live Terms and Conditions page with **no body text underneath it at all** (`docs/source-of-truth.md` §A.7, §D.8) — i.e., there is currently no shipping/returns policy text published on the live site to preserve, not a gap in what was collected.

### 8. Order flow

**NEEDS CLIENT VERIFICATION.**
No source shows an order-confirmation screen, an order-confirmation email, or any post-purchase flow. Nothing in the PDF or archive addresses this at all.

### 9. Existing GoDaddy Online Store integration

**VERIFIED.**
This is one of the most solidly evidenced facts in the whole investigation:
- Platform: GoDaddy Website Builder 8.0.0000, confirmed via `<meta name="generator" content="Starfield Technologies; Go Daddy Website Builder 8.0.0000">` present on every archived page (`docs/source-of-truth.md` §A.10; `reference/sukaya-site-archive/technical/tech-stack.md`).
- Commerce widget: GoDaddy Online Store, DOM IDs `widget-shop-shop-1` / `ols-shop-container` (`reference/sukaya-site-archive/technical/tech-stack.md`).
- Public store API base exposed by the page's own script: `https://online-store.api.godaddy.com/v1/accounts/ef52d3fd-20a0-4d24-8277-f423cfb9cf9b` (same source).
- Footer attribution confirms the same platform independently: "Powered by" links to `godaddy.com/websites/website-builder` (`docs/source-of-truth.md` §A.9).

Note: the PDF-era note in `docs/content-inventory.md` line 529 speculating "consistent with a Wix Stores-style setup" predates the archive and is **superseded** by the above — it should not be treated as a live possibility.

### 10. Existing product purchase URLs

**VERIFIED (URL pattern and existence) / NEEDS CLIENT VERIFICATION (live resolution for real visitors).**
The URL pattern `/ols/products/{slug}` for all 10 products and `/ols/categories/{slug}` for all 9 categories is verified to exist — `sitemap.ols.xml` itself returned HTTP 200 and lists all 19 URLs explicitly (`reference/sukaya-site-archive/raw/responses/sukaya.com.au_sitemap.ols.xml.xml`), and the 10 product slugs match `content/products.ts` exactly.

However, every one of those 19 individual URLs returned **HTTP 404 or 429** when the archive crawler tried to fetch them directly (`reference/sukaya-site-archive/MISSING-DATA.md`, `data/products.json`, `data/collections.json`). This is recorded here precisely rather than flattened into one verdict, because the two readings have different implications:
- It may mean these routes require client-side JS routing/hydration that a headless crawler without full JS execution can't satisfy — in which case they likely resolve fine for a real browser visitor.
- Or it may mean the routes genuinely error for anyone (404) or are rate-limited (429) under real traffic too.

Nothing in the source material distinguishes between these two explanations. **A real visit to a live `/ols/products/{slug}` URL in an ordinary browser, done by someone with access to the live site, is needed to resolve this — NEEDS CLIENT VERIFICATION.**

### 11. Any public commerce API information

**VERIFIED (existence and base URL) / NOT ACCESSIBLE (contents).**
The store's API base URL is verified: `https://online-store.api.godaddy.com/v1/accounts/ef52d3fd-20a0-4d24-8277-f423cfb9cf9b` (`reference/sukaya-site-archive/technical/tech-stack.md`). A direct request to it during the archive crawl returned **HTTP 403** (`docs/source-of-truth.md` line 17; `reference/sukaya-site-archive/MISSING-DATA.md` line 109: *"Direct API returned HTTP 403..."*). No product payload, schema, or any other API response content was ever retrieved. This is an account-scoped GoDaddy platform API, not a documented public integration surface.

### 12. Any existing checkout redirects

**NEEDS CLIENT VERIFICATION.**
No checkout redirect (to a hosted payment page, a different domain, an in-page modal, etc.) was ever observed, because no source reached far enough into the flow to trigger one. Not evidenced either way in the PDF or archive.

---

## Part 2 — Commerce architecture summary

### 1. Existing platform

GoDaddy Website Builder 8.0.0000 running the GoDaddy Online Store widget, confirmed via generator meta tag, widget DOM IDs, and footer "Powered by" attribution. This is settled — not a candidate among options, a confirmed fact.

### 2. Cart behaviour

Unknown. The cart is rendered entirely client-side by GoDaddy's JS widget; the archive's crawler could not execute that JavaScript and recorded the cart route as returning only the cookie-banner shell. No cart screenshots exist in the PDF either.

### 3. Checkout behaviour

Unknown. No source reached a checkout screen. No screenshots, no HTML, no described flow anywhere in the project's material.

### 4. Payment provider

Not determined by either source, stated explicitly by the archive's own technical report. A "PayPal"/"Square" string match in a generic shared JS bundle exists but is explicitly not treated as confirmation (see item 6 above) — it reflects GoDaddy's generic framework code, not a confirmed account configuration.

### 5. Shipping

No shipping information (rates, carriers, timeframes) exists in any source. Related: the live site's own "Return and Refund Policy" heading currently has no body text under it at all — this isn't a collection gap, it's the live site's actual current (empty) state.

### 6. Product purchase flow

The PDP-level "Quantity / Buy Now / Add to Cart" controls are verified to exist (from the PDF). Everything past that click — cart, checkout, payment, confirmation — is unverified. The `/ols/products/{slug}` and `/ols/categories/{slug}` URL patterns are verified to exist (sitemap), but their live HTTP resolution for a real visitor is unconfirmed (crawler saw 404/429 on all of them).

### 7. What can be preserved

- The verified navigation, all verified homepage/product copy, and the verified brand/contact/subscribe content (already built in Phases 3A–4).
- The Privacy Policy and Terms and Conditions pages' actual current "coming soon" state, verbatim (this phase's deliverable).
- The "Return and Refund Policy" heading, preserved exactly as verified — present, with no body text, matching the live site's real current state rather than inventing policy copy.
- The verified product catalog structure (names, categories, verified prices/sizes, verified variants) already in `content/products.ts` / `content/product-details.ts`.

### 8. What remains unknown

Cart UI/behaviour, checkout UI/flow, payment processor, shipping rates/policy, order confirmation/fulfillment flow, and whether the existing `/ols/products/*` and `/ols/categories/*` URLs currently resolve for real visitors. These are the items flagged NEEDS CLIENT VERIFICATION in Part 1.

### 9. Client questions

1. What currently powers checkout and payment on sukaya.com.au today (provider name, hosted vs. embedded, etc.)?
2. Should the rebuilt site link out to the existing live GoDaddy Online Store checkout (`/ols/products/{slug}` → existing cart/checkout), or should a new cart/checkout be built from scratch on the new site?
3. If a new checkout is to be built: is there a preferred payment processor (Stripe, PayPal, Square, GoDaddy Payments, or other)?
4. What are the actual shipping rates/carriers/timeframes to publish, given the live site currently has none published?
5. Is there a Return and Refund Policy to publish, or should that heading continue to ship with no body text (matching the live site's current state) until the client supplies one?
6. Can someone with access to the live site manually visit one or two `/ols/products/{slug}` URLs in an ordinary browser and confirm whether they load normally? This resolves item 10 above without needing crawler access.

### 10. Recommended next step

Do not select a payment provider or build checkout speculatively. This project's own Phase 1 documentation already frames the real decision correctly (`docs/content-inventory.md` lines 546–549): choose between (a) linking out to the existing live GoDaddy Online Store checkout, (b) integrating a hosted commerce/checkout provider against the current catalog, or (c) building a full custom cart + payment integration — and that choice depends entirely on the client questions above, particularly #1 and #2. Recommend surfacing this document's Part 2 §9 questions to the client and waiting for direct answers before any checkout/payment code is written, consistent with the explicit instruction governing this phase.

---

Stopping here per instruction. No cart, checkout, or payment functionality was implemented in this phase.
