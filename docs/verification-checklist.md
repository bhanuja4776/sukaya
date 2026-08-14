# SUKAYA Verification Checklist — Phase 1.5 (Source Verification Only)

**Status: DRAFT — no design/UI work has begun. This document does not modify or supersede `docs/content-inventory.md`; it only expands Section 6 of that document into a structured verification checklist.**

> **Phase 1.6 update:** a client-supplied offline archive of the live site (`sukaya-site-archive.zip`) was analysed after this checklist was first written. Several items below have since moved to **VERIFIED** based on that archive's raw HTML/data — each updated item says so explicitly and links to `docs/source-of-truth.md` for the evidence. Items the archive could not reach (its own crawl hit 404/429 on every product and cart page) remain `NEEDS CLIENT VERIFICATION`, unchanged. Four new items (17–20) were added for facts the archive surfaced that weren't previously tracked. This environment still has no live web access itself — see the section below, unchanged.

## Live-site access attempted and blocked

Before compiling this checklist, live verification against https://sukaya.com.au/ was attempted from this environment (via `WebFetch` and direct `curl`). Both were blocked:

```
WebFetch → error_type: EGRESS_BLOCKED — "Access to sukaya.com.au is blocked by the network egress proxy."
curl     → CONNECT tunnel failed, response 403
```

To confirm this isn't specific to the sukaya.com.au domain, a neutral control domain (`example.com`) was also tested and returned the identical block — confirming this environment has **no general outbound web access at all**, not a policy targeted at this one site. This is unrelated to the GitHub write-access issue resolved earlier (a separate, unrelated permission).

**Consequence, per your instructions:** since the live site cannot be reached, **no item below has been verified against it**. Nothing has been filled in from model knowledge or inference. Every item is marked `NEEDS CLIENT VERIFICATION`, with the exact question that needs answering and, where relevant, a live-site URL/page a human (or a future session with web access) should check.

---

## Checklist

### 1. Hero banner headline/subtext

| Field | Detail |
|---|---|
| **What the supplied source currently says** | A hero banner image exists (page 1 of `docs/sukaya-content.pdf`) showing the product range on a dark background with a "SHOP NOW" button. Headline/subheadline text is visible but rendered too small and low-resolution to transcribe reliably. |
| **What's missing/ambiguous** | The exact wording of the hero headline and subheadline. |
| **Why it matters** | This is the first thing a visitor reads — the brief calls it the "strong premium first impression." Cannot write real copy for the homepage hero without it, and must not paraphrase or invent it. |
| **Exact verification required** | View https://sukaya.com.au/ homepage hero banner directly (desktop, full width) and transcribe the exact headline and subheadline text, or supply a higher-resolution screenshot/export of the banner. |
| **Status** | **VERIFIED (Phase 1.6, via live-site archive).** The archive's raw HTML (`data/content.json` headings + `content/homepage.md` text extract) gives the exact H1: **"Pure & Natural Skin Care Solutions"**, and subheadline directly beneath it: **"Discover natural, minimalistic skincare for radiant skin."** (also matches the page's `og:description`/`twitter:description` meta tags independently). CTA button text: "Shop Now". See `docs/source-of-truth.md` §A.1–A.3. |

### 2. Full navigation menu

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Only "HOME" and "SHOP" are visible in the header, plus search and cart icons. |
| **What's missing/ambiguous** | Whether About / Aromatherapy / Contact / Subscribe are homepage-anchor sections only (as the source suggests), or whether the live site has additional top-level nav items not captured in the screenshot (e.g. a dropdown, mobile menu, or items outside the cropped screenshot area). |
| **Why it matters** | Determines the site's information architecture (single scrolling homepage vs. multiple nav-level pages) — a foundational decision for Phase 2. |
| **Exact verification required** | On https://sukaya.com.au/, list every visible top-level nav item (desktop) and every item inside the mobile hamburger menu, if different. |
| **Status** | **VERIFIED (Phase 1.6, via live-site archive).** Nav is exactly **Home + Shop**. A third visible element, "More", is a responsive overflow-menu component (`MoreMenu`) — its raw markup was inspected directly and contains the identical Home (`/`) and Shop (`/shop`) links again, not additional pages. `sitemap.website.xml` (200 OK) independently confirms the site has exactly 4 URLs total: `/`, `/shop`, `/privacy-policy`, `/terms-and-conditions` — no About/Contact page exists (the archive tool searched and recorded "NOT AVAILABLE — no separate public About/Contact page was discovered"). See `docs/source-of-truth.md` §A.4–A.5. |

### 3. Body Oils size (ml)

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Price given as A$31.99 for both Calming Body Oil and Uplifting Body Oil. No fill size in ml/oz is stated anywhere in the PDF for either variant. |
| **What's missing/ambiguous** | The bottle size. |
| **Why it matters** | Every other liquid/oil product in the inventory states its size (e.g. Berry Light Soothe Serum 30ml, Patchouli Face Cleansing Oil 50ml); Body Oils is the one exception, and a product page without a size looks unfinished and could mislead a buyer about quantity/value. |
| **Exact verification required** | On the Body Oils product page at https://sukaya.com.au/, record the exact ml (or other unit) shown for Calming Body Oil and Uplifting Body Oil. |
| **Status** | **NEEDS CLIENT VERIFICATION — unresolved by the Phase 1.6 archive.** The archive's crawl of `/ols/products/body-oil` returned HTTP 404; no product-page content was ever retrieved. Still open. |

### 4. Geranium Lip Balm — 10 ml tin price

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Product grid shows "Geranium Lip Balm — From $5.99." The product detail page shows a Size selector ("5 ML / 10 ML") but only one price (A$5.99) is printed on the page, with no second price tied to the 10 ML tin. |
| **What's missing/ambiguous** | The price of the 10 ml tin option. |
| **Why it matters** | "From $5.99" implies at least one other, presumably higher, price point exists. Displaying only one price for a two-size product would misstate the actual cost of the 10ml option. |
| **Exact verification required** | On the Geranium Lip Balm product page at https://sukaya.com.au/, select the "10 ML" option and record the price shown. |
| **Status** | **NEEDS CLIENT VERIFICATION — unresolved by the Phase 1.6 archive.** `/ols/products/geranium-lip-balm` returned HTTP 429 during the crawl; no product-page content retrieved. Still open. |

### 5. Trial Collection sample sizes

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Bundle description names its 4 contents (Pink Blush Cleanser Exfoliator Mask, Berry Light Soothe Serum, Super Fruits Face Elixir, Original Body Butter) and says sample sizes are "enough to use 3-4 times," but gives no ml/gm figures. |
| **What's missing/ambiguous** | Individual sample fill sizes. |
| **Why it matters** | Customers evaluating a trial/sample bundle typically expect to see quantity per item, similar to full-size products; omitting it is a gap versus the rest of the catalog's level of detail. |
| **Exact verification required** | On the Trial Collection product page at https://sukaya.com.au/, record any stated sample sizes (ml/gm) for each of the 4 included items, if shown. |
| **Status** | **NEEDS CLIENT VERIFICATION — unresolved by the Phase 1.6 archive.** `/ols/products/trial-collection` returned HTTP 404; no product-page content retrieved. Still open. |

### 6. Body Butter jar photography (variant match)

| Field | Detail |
|---|---|
| **What the supplied source currently says** | The 6-up product grid screenshot shows one body-butter jar photo, captioned "Body Butters" with a "More options" link and a visible label reading "Calming Body Butter" in the jar's own product label. |
| **What's missing/ambiguous** | Whether Original Body Butter has its own distinct product photo, or whether the single photo in the source is meant to represent both fragrance variants on the grid/PDP. |
| **Why it matters** | Affects the image-asset requirements list (Section 4 of the content inventory) — need to know whether to source one photo or two. |
| **Exact verification required** | On the Body Butters product page at https://sukaya.com.au/, switch between the "Original Body Butter" and "Calming Body Butter" fragrance options and note whether the product photo changes. |
| **Status** | **NEEDS CLIENT VERIFICATION — unresolved by the Phase 1.6 archive.** `/ols/products/original-body-butter` returned HTTP 404; the archive downloaded zero product images for any of the 10 products (all product pages 404/429'd before any images were queued). Still open. |

### 7. Privacy Policy — body copy

| Field | Detail |
|---|---|
| **What the supplied source currently says** | A "Privacy Policy" link exists in the footer (page 8 of the PDF). No policy text is included anywhere in the supplied material. |
| **What's missing/ambiguous** | The entire policy body text. |
| **Why it matters** | Legal/compliance content — cannot be written, paraphrased, or inferred by us under any circumstance; must come verbatim from the client or the live site. |
| **Exact verification required** | Full text of the Privacy Policy page at https://sukaya.com.au/ (or the client's current policy document, if maintained outside the site). |
| **Status** | **VERIFIED (Phase 1.6, via live-site archive) — and the answer is that no policy text exists.** The live page's actual full content (from `raw/html/sukaya.com.au_privacy-policy.html` and its text extract) is: H1 "Privacy Policy" followed directly by the literal text **"Privacy Policy coming soon"**. There is nothing further to source — this is the real, current state of the page, not a gap in our sources. Per your instruction to preserve "coming soon" states rather than write around them, the rebuild should carry this forward as-is unless/until the client supplies real policy text. See `docs/source-of-truth.md` §A.6. |

### 8. Terms and Conditions — body copy

| Field | Detail |
|---|---|
| **What the supplied source currently says** | A "Terms and Conditions" link exists in the footer (page 8 of the PDF). No policy text is included anywhere in the supplied material. |
| **What's missing/ambiguous** | The entire terms body text. |
| **Why it matters** | Same as above — legal content, zero tolerance for invention. |
| **Exact verification required** | Full text of the Terms and Conditions page at https://sukaya.com.au/ (or the client's current document). |
| **Status** | **VERIFIED (Phase 1.6, via live-site archive) — and the answer is that no terms text exists.** The live page's actual full content is: H1 "Terms and Conditions" followed by **"Coming soon!"**, then an H2 **"Return and Refund Policy"** heading with **no body text under it at all**. Same conclusion as item 7 — this is the real current state, to be preserved as-is (including the "coming soon" wording) rather than filled in. See `docs/source-of-truth.md` §A.7. |

### 9. Cart behaviour

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Every product page shows "Quantity," "Buy Now," "Add to Cart," and "Share" controls (consistent with a Wix Stores-style storefront), but the PDF contains no screenshots of an actual cart drawer/page, so behaviour (slide-out drawer vs. full page, quantity editing, promo code field, shipping estimate, etc.) is not shown. |
| **What's missing/ambiguous** | How the cart actually behaves once items are added. |
| **Why it matters** | Directly affects UX/architecture decisions for the rebuild's shopping flow (brief Section 9, conversion objective). |
| **Exact verification required** | On https://sukaya.com.au/, add a product to cart and record exactly what UI appears (drawer/page, fields, options, any messaging). |
| **Status** | **NEEDS CLIENT VERIFICATION — unresolved by the Phase 1.6 archive.** `/shop?olsPage=cart` returned HTTP 200 but its server-rendered content is only the cookie-consent banner shell — the actual cart UI renders client-side via JavaScript, which the archive tool's browser could not execute (`ERR_NETWORK_CHANGED`; explicitly logged as "NOT ACCESSIBLE" in the archive's own `MISSING-DATA.md`). Still open. |

### 10. Checkout / payment flow

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Nothing — no checkout screens, payment processor branding, shipping-cost display, or order-confirmation content appears anywhere in the PDF. |
| **What's missing/ambiguous** | What currently powers checkout (platform, payment processor, shipping/tax handling), and by extension, what the rebuilt site's checkout should do — this is also flagged as an open architecture decision in Section 7 of the content inventory (rebuild as front-end catalog linking to existing checkout, vs. integrating a hosted commerce provider, vs. full custom build). |
| **Why it matters** | This is a scope- and cost-defining decision for the entire e-commerce rebuild, not a copy/content detail — cannot be assumed. |
| **Exact verification required** | Either (a) inspect the live checkout flow at https://sukaya.com.au/ end-to-end (payment processor branding, shipping options, confirmation screen) and/or (b) the client directly confirms which platform currently powers checkout and what should happen in the rebuilt site (reuse existing checkout vs. build new). |
| **Status** | **NEEDS CLIENT VERIFICATION — narrowed but not resolved by the Phase 1.6 archive.** The store platform is now confirmed as the **GoDaddy Online Store** widget (API base `https://online-store.api.godaddy.com/v1/accounts/ef52d3fd-20a0-4d24-8277-f423cfb9cf9b`), per `technical/tech-stack.md`. However that same document states outright: *"Payment provider and checkout processor were not exposed without a functioning product route/cart flow."* A text search of the platform's shared JS bundle does surface the strings "PayPal" and "Square", but that bundle is generic GoDaddy Website Builder framework code likely present on every GoDaddy Online Store regardless of which processor is actually configured — **not treated as confirmation**. Still open. See `docs/source-of-truth.md` §D note. |

### 11. Original high-resolution product image availability

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Per Section 3/4 of the content inventory, only 2 of 10 products (Pink Blush Cleanser Exfoliator Mask, Geranium Lip Balm) have a clean standalone photo in the PDF, and even those are low-resolution (~200–350px). The other 8 products/variants exist only as small (~180×180px) crops inside multi-product grid screenshots, or (Uplifting Body Oil) have no photo at all in the source. |
| **What's missing/ambiguous** | Whether original, full-resolution product photography files exist and can be supplied, for every product listed in Section 4's "Missing / Required Image Assets" table of the content inventory. |
| **Why it matters** | The brief's Image Rule prohibits AI-generated or stock replacement imagery — a premium site cannot ship with 180×180px screenshot crops as hero product images, so this is a hard blocker for the Shop/PDP visual build (see Design Blockers below). |
| **Exact verification required** | Either (a) the live site at https://sukaya.com.au/ serves higher-resolution originals than what's embedded in the PDF (check each product image's actual served resolution / any zoom-image feature), and/or (b) the client supplies original photo files directly from their media library. |
| **Status** | **PARTIALLY RESOLVED (Phase 1.6, via live-site archive).** 3 non-product brand/lifestyle images were recovered at full native resolution (logo, the About-section botanicals photo, the Aromatherapy lavender-oil photo) — see `docs/asset-inventory.md`. **Still `NEEDS CLIENT VERIFICATION` for all 10 products**: every product page 404'd/429'd during the crawl, so zero product photos were ever downloaded by the archive — it independently hits the exact same wall the PDF does. Two of the site's homepage images were also found to be **licensed Getty stock photography**, not original SUKAYA photography — flagged separately, see `docs/asset-inventory.md` §4. |

### 12. Founder's name

| Field | Detail |
|---|---|
| **What the supplied source currently says** | The "Aromatherapy & Skincare" section references "our founder, who has completed an Aromatherapy Practitioner Certificate including Specialist Certificate for Rejuvenating Skincare at the Australian College of Aromatherapy" — no name given. |
| **What's missing/ambiguous** | The founder's name (and any other bio detail, if the client wants to expand this section). |
| **Why it matters** | Founder/brand-story content is explicitly protected under the brief's non-fabrication rule; "our founder" reads acceptably as-is but naming them (if desired) requires the real name. |
| **Exact verification required** | Check the live site's About/Aromatherapy section at https://sukaya.com.au/ for a named founder, or ask the client directly. Note: if the live site also only says "our founder" with no name, then this is not missing information to chase further — it should just be carried forward as-is. |
| **Status** | **NEEDS CLIENT VERIFICATION — confirmed still unnamed, but confirmed there's nowhere else to look.** The archive's homepage text extract reproduces the "Aromatherapy & Skincare" paragraph word-for-word with no name given, and confirms no separate About page exists anywhere on the site to find one on. So this isn't a gap in what we've collected — it's the complete text as it exists live. "Our founder" can be used as-is; a name is only needed if the client wants to add one. |

### 13. Street address

| Field | Detail |
|---|---|
| **What the supplied source currently says** | "SUKAYA / Melbourne VIC, Australia" plus a Google Map pin centered on Melbourne CBD. No street address is given. |
| **What's missing/ambiguous** | Whether a full street address exists and should be shown, or whether "Melbourne VIC, Australia" plus a map pin is the intended level of disclosure (e.g. no public storefront). |
| **Why it matters** | Determines whether the rebuilt Contact section needs a more precise address or should stay at city-level, matching the original site's apparent intent. |
| **Exact verification required** | Check https://sukaya.com.au/ Contact Us section for a full street address; if none is shown there either, treat "Melbourne VIC, Australia" as the confirmed, intentional level of detail rather than a gap. |
| **Status** | **VERIFIED (Phase 1.6, via live-site archive).** The archive's homepage text extract confirms the Contact Us section shows exactly "SUKAYA / Melbourne VIC, Australia" plus a "Get directions" button (Google Maps link) — no fuller street address exists on the live site. This is the complete, intentional level of detail, not a gap. See `docs/source-of-truth.md` §A.8. |

### 14. Shipping/returns policy, stock levels, and any additional product variants

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Nothing on shipping rates, returns/exchanges, or stock/availability appears anywhere in the PDF. No variant types beyond the ones already catalogued (Body Oils fragrance, Body Butters fragrance, Geranium Lip Balm size) are shown. |
| **What's missing/ambiguous** | Whether shipping/returns policy content exists elsewhere on the live site (often a separate page or FAQ, sometimes not linked from the homepage) and whether any products have variants not captured in the PDF (e.g. additional fragrances, colours). |
| **Why it matters** | Shipping/returns information is a standard trust-building element for conversion (brief Section 9) but must not be fabricated. |
| **Exact verification required** | Check https://sukaya.com.au/ for a Shipping/Returns/FAQ page (may not be linked from the nav captured in the PDF) and transcribe verbatim if found; also re-check each PDP for variant options beyond what's listed in Section 2 of the content inventory. |
| **Status** | **PARTIALLY RESOLVED (Phase 1.6, via live-site archive).** Confirmed there is no separate Shipping/Returns/FAQ page — the site has exactly 4 pages total (§ item 2 above), and a "Return and Refund Policy" heading does exist (on the Terms and Conditions page) but with **no text under it** — so the policy has not been written yet on the live site either, not merely missing from our sources. Product variants: still `NEEDS CLIENT VERIFICATION` — the archive could not reach any product page to check for undocumented variants. |

### 15. "Powered by" footer platform

| Field | Detail |
|---|---|
| **What the supplied source currently says** | "Powered by" text appears in the footer (page 8 of the PDF), but the platform name/logo following it is not legible in the source. |
| **What's missing/ambiguous** | The platform name. |
| **Why it matters** | Low priority — a rebuilt custom site would not carry this attribution regardless of what it says. Included for completeness only. |
| **Exact verification required** | None required for the rebuild; optional to check the live footer at https://sukaya.com.au/ purely out of technical curiosity (e.g. confirms which platform the current site runs on, which could be useful context for the checkout-flow item above). |
| **Status** | **VERIFIED (Phase 1.6, via live-site archive).** Footer "Powered by" links to `godaddy.com/websites/website-builder`. Platform is **GoDaddy Website Builder** (confirmed by `<meta name="generator">` on every page too). This is useful context for item 10 (narrows but doesn't resolve the payment-processor question) — still non-blocking for the rebuild itself. See `docs/source-of-truth.md` §A.9–A.10. |

### 16. `PROJECT_BRIEF.md`

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Referenced in earlier task instructions as something to inspect; no such file exists in the repository. The refurbishment brief was supplied as chat/task instructions instead. |
| **What's missing/ambiguous** | Whether the client intended to upload a separate `PROJECT_BRIEF.md` file that didn't make it into the repo. |
| **Why it matters** | Administrative/organizational only — does not block content or design work, since the brief's content is already available via the task instructions. |
| **Exact verification required** | Confirm with the client whether a separate brief file should be added to the repo, or whether the chat-supplied instructions are the authoritative brief going forward. |
| **Status** | **NON-BLOCKING — NEEDS CLIENT CONFIRMATION (administrative only)** |

### 17. "Raving Fans" homepage section

| Field | Detail |
|---|---|
| **What the archive shows** | A real H2 heading, "Raving Fans," sits between the image gallery and Contact Us on the live homepage — not previously known from the PDF. Inspecting the raw HTML between this heading and the next one shows no testimonial text, star ratings, or review count of any kind. |
| **What's missing/ambiguous** | Nothing factual — this is confirmed empty, consistent with `data/reviews.json` being `[]`. The only open question is intent: is this a widget waiting to be populated with real reviews, or a section the client wants removed/redesigned? |
| **Why it matters** | Affects whether the rebuild includes a "Raving Fans"/testimonials section at all, and if so, whether it launches empty or the client has real reviews to add. |
| **Exact verification required** | Ask the client whether real customer testimonials exist to populate this section, or whether it should be omitted from the rebuild until they do. |
| **Status** | **VERIFIED as empty; intent NEEDS CLIENT VERIFICATION.** See `docs/source-of-truth.md` §A.11. |

### 18. Cookie consent banner

| Field | Detail |
|---|---|
| **What the archive shows** | A first-party cookie banner appears on every page: *"This website uses cookies. We use cookies to analyze website traffic and optimize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data."* with "Decline"/"Accept" buttons. Not captured in the PDF. |
| **What's missing/ambiguous** | Nothing — full text captured verbatim. |
| **Why it matters** | A functional requirement for the rebuild (likely a legal/compliance necessity for an AU-based site), not previously tracked. |
| **Exact verification required** | None — this is fully verified text, included here so it isn't lost before Phase 2. |
| **Status** | **VERIFIED (Phase 1.6, via live-site archive).** See `docs/source-of-truth.md` §A.12. |

### 19. Homepage `og:image` — AI-generation indicators

| Field | Detail |
|---|---|
| **What the archive shows** | The site's `og:image`/`twitter:image` and a site-wide background asset is `Gemini_Generated_Image_j5auh1j5auh1j5au.png`. Beyond the filename, the image itself shows visibly distorted/garbled text on several product labels within the composition (e.g. "Berry Light Soulite Serum," "All ip ons Lavender Balm"). |
| **What's missing/ambiguous** | Whether the client is aware this asset may be AI-generated, and what they want done about it. |
| **Why it matters** | Per your explicit instruction, this cannot be auto-replaced — it must be flagged as a client decision. |
| **Exact verification required** | Client confirmation: keep, replace with real product photography, or otherwise redesign this asset. |
| **Status** | **EXISTING LIVE-SITE ASSET — CLIENT DECISION REQUIRED.** Not modified. See `docs/asset-inventory.md` §4.1. |

### 20. Two homepage images confirmed as Getty stock photography

| Field | Detail |
|---|---|
| **What the archive shows** | Two decorative/lifestyle images on the homepage (a serum-droplet macro shot, and an ingredients flatlay resembling the "Our Commitment" section) both resolve to `img1.wsimg.com/isteam/getty/{id}` source URLs — GoDaddy's own path convention for licensed Getty Images stock, not original uploads. |
| **What's missing/ambiguous** | Whether the site's Getty license covers continued use in a rebuilt site, and whether the client wants these replaced with authentic SUKAYA photography instead. |
| **Why it matters** | The "Our Commitment" section reads as if it's showing SUKAYA's own ingredients, but the specific photo is stock — a licensing and authenticity question for the client, not something to silently carry forward or silently replace. |
| **Exact verification required** | Client confirmation on licensing status and whether to keep, replace, or supplement with real SUKAYA photography. |
| **Status** | **EXISTING LIVE-SITE ASSET — CLIENT DECISION REQUIRED.** Not modified. See `docs/asset-inventory.md` §4.2–4.3. |

---

## Summary (updated Phase 1.6)

### A. VERIFIED
1. Hero headline/subtext/CTA (item 1)
2. Full navigation menu — Home + Shop only, "More" is a duplicate overflow menu, 4 pages total (item 2)
7. Privacy Policy — confirmed to say "Privacy Policy coming soon," nothing more (item 7)
8. Terms and Conditions — confirmed to say "Coming soon!" plus an empty "Return and Refund Policy" heading (item 8)
13. Street address — "Melbourne VIC, Australia" + Get Directions confirmed as the complete, intentional detail (item 13)
15. "Powered by" footer platform — GoDaddy Website Builder (item 15)
18. Cookie consent banner text (item 18, new)

### A2. PARTIALLY RESOLVED
11. Original image availability — 3 non-product brand/lifestyle images recovered at full resolution; all 10 products' photography remains unresolved (item 11)
14. Shipping/returns page — confirmed not to exist as a separate page, and the "Return and Refund Policy" heading on Terms is confirmed empty; product-variant completeness still unverified (item 14)
17. "Raving Fans" section — confirmed empty; intent (populate vs. remove) still needs the client (item 17, new)

### B. NEEDS CLIENT VERIFICATION (unresolved by either source)
3. Body Oils size (ml)
4. Geranium Lip Balm — 10 ml tin price
5. Trial Collection sample sizes
6. Body Butter jar photography (variant match)
9. Cart behaviour
10. Checkout / payment flow / processor
11. (products only) Original product photography for all 10 products
12. Founder's name
14. (products only) Undocumented product variants
16. `PROJECT_BRIEF.md` (non-blocking, administrative)

### B2. EXISTING LIVE-SITE ASSETS — CLIENT DECISION REQUIRED (new, not a content gap)
19. Homepage `og:image` — AI-generation indicators (filename + garbled label text)
20. Two homepage images confirmed as Getty stock photography

### C. SOURCE CONFLICTS
None found, across all three sources (PDF, archive, and their cross-checks). Every fact the archive could independently verify matches the PDF word-for-word. Where sources differ, one reached content the other didn't (a gap filled, not a contradiction) — see `docs/source-of-truth.md` for the full reasoning, including why the archive contributes zero product-content facts (every product page 404'd/429'd during its crawl) and therefore cannot conflict with the PDF's product data.

### D. DESIGN BLOCKERS (updated)
Resolved and removed from this list since the original Phase 1.5 pass:
- ~~Hero headline/subtext~~ — RESOLVED, now verified.
- ~~Privacy Policy / Terms and Conditions~~ — RESOLVED in the sense that we now know definitively there's no real text to preserve beyond "coming soon."

Still blocking:
- **Product photography for all 10 products** (item 11) — both sources independently hit a wall here; a premium Shop/PDP visual design cannot be built around missing or placeholder-quality images.
- **Cart behaviour** (item 9) — blocks designing the add-to-cart interaction/drawer.
- **Checkout/payment flow** (item 10) — blocks any implementation work on checkout; an architecture decision, not styling.

### E. NON-BLOCKING ITEMS
- Item 3 (Body Oils size) — build with size field visibly pending.
- Item 4 (Geranium Lip Balm 10ml price) — build with size selector present, 10ml price marked pending.
- Item 5 (Trial Collection sample sizes) — bundle description can ship without sizes.
- Item 6 (Body Butter photography) — proceed with the single available (low-res) photo until clarified.
- Item 12 (founder's name) — "our founder" copy usable as-is.
- Item 14 (variants) — proceed with the documented variants only.
- Item 16 (`PROJECT_BRIEF.md`) — administrative only.
- Item 17 ("Raving Fans") — can launch omitted or as an empty/future section pending client intent.

---

## Next Step

Per your instruction, stopping here. Phase 2 (design system / UX) should not begin until:
1. The remaining Design Blockers (Section D) and the two flagged existing-asset decisions (Section B2) are resolved or the client explicitly authorizes proceeding around them, and
2. Live-site access is either restored in this environment or the client supplies the remaining verified answers directly — whichever is faster.

See `docs/source-of-truth.md` for the full reconciliation this update is based on.
