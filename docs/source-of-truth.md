# SUKAYA Source of Truth — Phase 1.6 (Archive Reconciliation)

**Status: DRAFT — no design/UI work has begun.** This document reconciles three source sets per your instructions and does not silently resolve any conflict. It supersedes nothing in `docs/content-inventory.md` or `docs/verification-checklist.md` — those remain intact; this document cross-references and updates their status.

## The three sources

| # | Source | What it actually is |
|---|---|---|
| 1 | `docs/archive/sukaya-site-archive/` (from `sukaya-site-archive.zip`) | An offline preservation crawl of the **live** site collected 2026-08-14, using a headless crawler ("Codex"). Contains raw HTML, extracted text, structured JSON/CSV data, a downloaded-asset manifest, and its own `MISSING-DATA.md`/`website-inventory.md` self-report of what it could and couldn't retrieve. |
| 2 | `docs/sukaya-content.pdf` | A 20-page Word-exported set of screenshots/text supplied directly by the client, covering the homepage and all 10 product detail pages in full. |
| 3 | `docs/content-inventory.md`, `docs/verification-checklist.md` | Our own Phase 1/1.5 documents, built from Source 2 only (Source 1 did not exist yet at that point). |

Per your instruction, neither Source 1 nor Source 2 is treated as automatically more current — every fact below states which source(s) support it.

## Critical scope finding: the archive contains no live product data

Before reconciling anything, this has to be stated plainly because it governs everything below: **the archive's own crawl report says all 10 individual product-page routes (`/ols/products/*`) and all 9 category-page routes (`/ols/categories/*`) returned HTTP 404 or 429.** The live storefront renders products client-side via a JavaScript widget hitting `https://online-store.api.godaddy.com/v1/accounts/ef52d3fd-20a0-4d24-8277-f423cfb9cf9b`, and the crawler could not execute that JavaScript or reach that API directly (confirmed in the archive's own `MISSING-DATA.md`: *"JavaScript-rendered storefront product payload: NOT ACCESSIBLE. Direct API returned HTTP 403..."*). Screenshots were also not accessible (`ERR_NETWORK_CHANGED`).

**Consequence:** the archive contributes **zero** product descriptions, ingredients, benefits, usage instructions, or safety notes — and it does **not** independently confirm or contradict prices/sizes either, because it never reached a page that displays them. The archive's own `website-inventory.md` states this explicitly: *"Do not treat sitemap product names derived from slugs as complete product content."* For every one of the 10 products, **the PDF (Source 2) remains the sole source of descriptive content.** This is not a judgment call on which source is "more current" — Source 1 simply has no product content to compare.

What the archive *does* confirm about products is limited to: the 10 product **names** (via URL slugs in `sitemap.ols.xml`, which returned 200) and 9 shop **category names** (same sitemap). Both match the PDF's 10 products exactly, including that Body Oils and Body Butters are each a single product page with two fragrance variants (the sitemap has one `body-oil` slug and one `original-body-butter` slug, not two each) — consistent with, not contradicting, the PDF.

---

## A. VERIFIED (confirmed directly from the live-site archive)

These are new facts the archive establishes with primary evidence (raw HTML, `<meta>` tags, or literal page text), not present or not confirmable in the PDF alone.

1. **Hero headline (H1):** "Pure & Natural Skin Care Solutions" — from `data/content.json` headings and repeated 4× in `content/homepage.md`'s extracted text. **Resolves verification-checklist item 1.**
2. **Hero subheadline / tagline:** "Discover natural, minimalistic skincare for radiant skin." — appears as body text directly under the H1 in the homepage text extract, and matches the page's `og:description`/`twitter:description` meta tags exactly. **Resolves item 1.**
3. **Hero CTA button text:** "Shop Now" (links to `/`, i.e. it's an in-page anchor/scroll trigger on the homepage itself, not a separate URL).
4. **Navigation is exactly Home + Shop.** The header also renders a "More" menu, but inspecting its raw markup shows it contains the identical Home/Shop links again (`NavMoreMenuLink` → `/` and `/shop`) — it's a responsive overflow duplicate, not additional pages. **Resolves item 2 — no hidden nav items exist.**
5. **Site page count confirmed at exactly 4** via `sitemap.website.xml` (200 OK): `/`, `/shop`, `/privacy-policy`, `/terms-and-conditions`. No separate About or Contact page exists — confirmed independently by the archive's own note that no such pages were discoverable (`content/about.md` / `content/contact.md` both say "NOT AVAILABLE — no separate public About/Contact page was discovered").
6. **Privacy Policy page — actual live content is:** "Privacy Policy" (H1) / **"Privacy Policy coming soon"**. There is no policy body text on the live site — not a gap in what was collected, but the literal current state of the page. **Resolves item 7 — no policy text exists to source; nothing should be fabricated to fill this.**
7. **Terms and Conditions page — actual live content is:** "Terms and Conditions" (H1) / **"Coming soon!"**, followed by an H2 "Return and Refund Policy" heading with **no body text under it at all**. **Resolves item 8 — same conclusion: nothing exists to preserve beyond these headings and the "coming soon" statement, which itself must be preserved verbatim, per your instruction to preserve "coming soon" states rather than treat them as our own gap.**
8. **Street address confirmed complete as shown:** "SUKAYA / Melbourne VIC, Australia" plus a "Get directions" button (Google Maps link) — no fuller street address exists on the live page. **Resolves item 13 — this is the intentional, complete level of detail, not a gap.**
9. **Footer platform attribution confirmed:** "Powered by" links to `godaddy.com/websites/website-builder`. **Resolves item 15.**
10. **Platform identified with certainty:** GoDaddy Website Builder 8.0.0000 (`<meta name="generator" content="Starfield Technologies; Go Daddy Website Builder 8.0.0000">` on every page) running the **GoDaddy Online Store** widget for commerce. This corrects an unstated assumption risk — nothing in our prior docs had asserted a platform, but it's now on the record precisely rather than guessed.
11. **A "Raving Fans" homepage section exists** (H2 heading, between the image gallery and Contact Us) **and is completely empty** — no testimonial text, star ratings, or review count between it and the next heading. This is consistent with `data/reviews.json` being `[]`. This is new information (not in the PDF) but it *confirms* rather than contradicts our prior finding of "no testimonials anywhere" — the section exists as a heading/widget shell with zero content behind it.
12. **A first-party cookie-consent banner exists**, exact text: *"This website uses cookies. We use cookies to analyze website traffic and optimize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data."* with "Decline"/"Accept" buttons. Not previously captured in the PDF or Phase 1 inventory — new confirmed UI element to carry into the rebuild.
13. **Brand color and typography, confirmed from live CSS/meta:**
    - Primary color `#547d54` (dark sage green) — from `theme-color` meta tag and repeated in observed CSS.
    - Fonts: `Righteous` (display/logo-style serif) and `Josefin Sans` (body sans-serif), both via Google Fonts.
    - *(Reference only, per your instruction — not implemented yet.)*
14. **Three additional high-resolution original images recovered** that were previously only available as small screenshot crops from the PDF: the About-section botanicals/strawberry flatlay, the Aromatherapy lavender-oil-bottle photo, and the brand logo — all now available at native resolution. Full detail in `docs/asset-inventory.md`.
15. **Two of the site's homepage images are confirmed Getty Images stock photography**, not original SUKAYA photography — proven by their source URLs being served from `img1.wsimg.com/isteam/getty/{id}`, not the account's own upload path. See `docs/asset-inventory.md` and the "Existing live-site assets requiring a client decision" section below.
16. **One image (the site's `og:image`, used site-wide) has a filename indicating AI generation** (`Gemini_Generated_Image_j5auh1j5auh1j5au.png`) **and shows visible text-distortion artifacts on the product labels within the image itself** (e.g. "Super Fruits Fsts Eilser", "Berry Light Soulite Serum", "All ip ons Lavender Balm" — garbled versions of real product names), which is independent visual evidence consistent with AI generation, not just a suspicious filename. Per your explicit instruction, this is **not** being replaced or treated as needing regeneration — it is flagged below as a client decision.

## B. VERIFIED BY MULTIPLE SOURCES (PDF and archive agree)

These were already in `docs/content-inventory.md` from the PDF; the archive's homepage text extract (`content/homepage.md`) independently reproduces the same copy word-for-word, so they're now cross-confirmed by two independent sources rather than resting on one:

- "Our Philosophy" full paragraph
- "Our Commitment" full paragraph
- "Aromatherapy & Skincare" full paragraph (including "our founder... Aromatherapy Practitioner Certificate... Australian College of Aromatherapy" with no name given — the archive confirms no name is given here either, since no separate About page exists to name them)
- "Contact Us" / "Questions or Comments" body copy
- Contact block: SUKAYA / Melbourne VIC, Australia / enquiries@sukaya.com.au
- "Subscribe" section copy: "Get 10% off your first purchase when you sign up for our newsletter!"
- Footer copyright line: "Copyright © 2025 SUKAYA - All Rights Reserved."
- Section headings: About Sukaya, Featured Products, "Explore our stunning range of natural beauty", Contact Us, Subscribe

## C. SOURCE CONFLICTS

**None found.** Every fact the archive could independently verify matches the PDF exactly, word-for-word, where both sources cover the same content. Where the two sources differ, it is because the archive reached content the PDF didn't capture (hero headline text, cookie banner, "Raving Fans" heading, "coming soon" policy pages) or the PDF reached content the archive's crawler couldn't reach (all product detail data) — these are gaps in one source filled by the other, not contradictions. Nothing here required picking one version over another.

## D. STILL NEEDS CLIENT VERIFICATION

Carried forward from `docs/verification-checklist.md`, unresolved by the archive because the archive could not reach the pages in question:

1. **Body Oils fill size (ml)** — product page inaccessible to the archive; still not stated anywhere.
2. **Geranium Lip Balm 10 ml tin price** — product page inaccessible.
3. **Trial Collection individual sample sizes** — product page inaccessible.
4. **Body Butter jar photography (Original vs. Calming variant match)** — no product-page images were retrievable by the archive at all.
5. **Cart behaviour** — the archive explicitly could not render the cart (`/shop?olsPage=cart` returned only the cookie-banner shell; JS-rendered cart UI "NOT ACCESSIBLE").
6. **Checkout / payment flow / processor** — archive's own `technical/integrations.md` states plainly: *"Payment/review/newsletter providers: NOT DETERMINED."* (See note below — this is not fully resolved by a coincidental JS finding.)
7. **Founder's name** — still not given anywhere; confirmed no separate About page exists to find it on.
8. **Shipping/returns policy body text** — now additionally confirmed the "Return and Refund Policy" heading on the live Terms page has **no text under it** — so this isn't missing from our sources, it does not yet exist on the live site. Still needs the client to confirm whether it should be written (with real content they supply) before launch, or left as-is.
9. **Original, full-resolution product photography** for 8 of 10 products (all except the logo and the two About/Aromatherapy lifestyle photos now recovered) — see `docs/asset-inventory.md`.

**Note on item 6 (checkout/payment):** a text search of the platform's shared JavaScript bundles (`UX.4.51.22.js`, generic to GoDaddy Website Builder) turns up the strings "PayPal" and "Square". This is **not** being treated as confirmation that SUKAYA's store uses either — those strings are consistent with GoDaddy Online Store's generic framework code supporting multiple possible payment options across all GoDaddy stores, not evidence of which one (if any) is actually configured for this account. Flagged as a red herring to avoid, not a finding.

## E. MISSING ASSETS

See `docs/asset-inventory.md` for the full breakdown. Summary: of the 10 products, only the Cleanser Exfoliator Mask – Pink Blush and Geranium Lip Balm have any standalone (if low-resolution) product photo anywhere across either source. The other 8 products/variants have no independently-sourced product photograph in either the PDF or the archive — both sources hit the same wall (PDF: small grid-screenshot crops only; archive: product pages 404'd, so no images were ever downloaded for them at all).

## F. DESIGN BLOCKERS

Unchanged in substance from `docs/verification-checklist.md`, with two now resolved and removed:
- ~~Hero headline/subtext~~ — **RESOLVED**, see A.1–A.2.
- ~~Privacy Policy / Terms and Conditions~~ — **RESOLVED** in the sense that we now know definitively there is no real policy text to preserve; both pages should carry forward their actual "coming soon" state rather than being built out with placeholder legal copy.

Still blocking:
- **Product photography** for 8 of 10 products (D.9 / Section E) — a premium Shop/PDP visual design cannot be finalized around thumbnail crops or missing images.
- **Cart behaviour and checkout/payment flow** (D.5, D.6) — architecture-defining, not a styling detail.

## G. COMMERCE BLOCKERS

- **Payment processor: NOT DETERMINED** by either source. The archive's technical report states this outright; nothing found overrides that.
- **Cart UI/UX: NOT ACCESSIBLE** to either source — the archive could not render the JS-driven cart, and the PDF contains only the "Quantity / Buy Now / Add to Cart" controls on each product page, not the resulting cart or checkout screens.
- **Store platform is now known** (GoDaddy Online Store, account `ef52d3fd-20a0-4d24-8277-f423cfb9cf9b`), which narrows the space of likely payment integrations (GoDaddy Online Store typically offers GoDaddy Payments and/or PayPal as configurable options) — but narrowing is not confirming, and nothing here should be treated as the answer.
- This remains the single open item most likely to define the actual cost/scope of the commerce rebuild (per `docs/content-inventory.md` Section 7's architecture options), and it still requires the client to state directly what currently powers checkout and what should happen in the rebuild.

---

## Existing live-site assets requiring a client decision

Per your explicit instruction, the following are **not** being replaced, regenerated, or treated as needing AI substitution. They are flagged for you to decide:

1. **`Gemini_Generated_Image_j5auh1j5auh1j5au.png`** (960×1088) — used as the site's `og:image`/`twitter:image` and as a background element across every page. Filename indicates Google Gemini generation; the image itself shows an all-10-products studio composition with visibly distorted text on several product labels (a common AI-generation artifact). **EXISTING LIVE-SITE ASSET — CLIENT DECISION REQUIRED.**
2. **Getty Images stock photo, ID `1570519591`** (2560×2560, a macro shot of a clear gel/serum droplet) — used as a CSS background/decorative element on the homepage. Confirmed via its `img1.wsimg.com/isteam/getty/1570519591` source path. **EXISTING LIVE-SITE ASSET — CLIENT DECISION REQUIRED** (continued licensing/usage rights should be confirmed before reuse).
3. **Getty Images stock photo, ID `665238744`** (2303×1302, an ingredients flatlay — shea butter, salt, clay powder, honey, citrus, aloe, dried flowers) — visually similar in concept to the PDF's "Our Commitment" section image, but this specific file is confirmed Getty stock via the same `isteam/getty/` path, not an original SUKAYA photograph. **EXISTING LIVE-SITE ASSET — CLIENT DECISION REQUIRED.**

None of these three have been altered, replaced, or reproduced — they remain exactly as extracted in `docs/archive/sukaya-site-archive/assets/images/`.

## What's safe to proceed with (once you approve continuing)

Given everything above, once you give the go-ahead, work that would **not** touch any blocked or flagged item includes: information architecture confirmed to exactly Home/Shop/Privacy/Terms; homepage section order and headings (About Sukaya, Featured Products, gallery, Raving Fans, Contact Us, Subscribe); all fully-verified brand/about/contact/subscribe copy; the cookie-consent requirement; and design-reference-only use of the confirmed brand color and typography. Nothing in that list requires guessing at product photography, cart/checkout behaviour, or the flagged AI/stock images.

## Next step

Stopping here, per your instruction. Phase 2 should not begin until you've reviewed this reconciliation and the three flagged existing assets, and ideally provided direction on the Section D/F/G items (or explicitly authorized proceeding around them with visible placeholders).
