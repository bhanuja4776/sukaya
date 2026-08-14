# SUKAYA Verification Checklist — Phase 1.5 (Source Verification Only)

**Status: DRAFT — no design/UI work has begun. This document does not modify or supersede `docs/content-inventory.md`; it only expands Section 6 of that document into a structured verification checklist.**

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
| **Status** | **NEEDS CLIENT VERIFICATION** |

### 2. Full navigation menu

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Only "HOME" and "SHOP" are visible in the header, plus search and cart icons. |
| **What's missing/ambiguous** | Whether About / Aromatherapy / Contact / Subscribe are homepage-anchor sections only (as the source suggests), or whether the live site has additional top-level nav items not captured in the screenshot (e.g. a dropdown, mobile menu, or items outside the cropped screenshot area). |
| **Why it matters** | Determines the site's information architecture (single scrolling homepage vs. multiple nav-level pages) — a foundational decision for Phase 2. |
| **Exact verification required** | On https://sukaya.com.au/, list every visible top-level nav item (desktop) and every item inside the mobile hamburger menu, if different. |
| **Status** | **NEEDS CLIENT VERIFICATION** |

### 3. Body Oils size (ml)

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Price given as A$31.99 for both Calming Body Oil and Uplifting Body Oil. No fill size in ml/oz is stated anywhere in the PDF for either variant. |
| **What's missing/ambiguous** | The bottle size. |
| **Why it matters** | Every other liquid/oil product in the inventory states its size (e.g. Berry Light Soothe Serum 30ml, Patchouli Face Cleansing Oil 50ml); Body Oils is the one exception, and a product page without a size looks unfinished and could mislead a buyer about quantity/value. |
| **Exact verification required** | On the Body Oils product page at https://sukaya.com.au/, record the exact ml (or other unit) shown for Calming Body Oil and Uplifting Body Oil. |
| **Status** | **NEEDS CLIENT VERIFICATION** |

### 4. Geranium Lip Balm — 10 ml tin price

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Product grid shows "Geranium Lip Balm — From $5.99." The product detail page shows a Size selector ("5 ML / 10 ML") but only one price (A$5.99) is printed on the page, with no second price tied to the 10 ML tin. |
| **What's missing/ambiguous** | The price of the 10 ml tin option. |
| **Why it matters** | "From $5.99" implies at least one other, presumably higher, price point exists. Displaying only one price for a two-size product would misstate the actual cost of the 10ml option. |
| **Exact verification required** | On the Geranium Lip Balm product page at https://sukaya.com.au/, select the "10 ML" option and record the price shown. |
| **Status** | **NEEDS CLIENT VERIFICATION** |

### 5. Trial Collection sample sizes

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Bundle description names its 4 contents (Pink Blush Cleanser Exfoliator Mask, Berry Light Soothe Serum, Super Fruits Face Elixir, Original Body Butter) and says sample sizes are "enough to use 3-4 times," but gives no ml/gm figures. |
| **What's missing/ambiguous** | Individual sample fill sizes. |
| **Why it matters** | Customers evaluating a trial/sample bundle typically expect to see quantity per item, similar to full-size products; omitting it is a gap versus the rest of the catalog's level of detail. |
| **Exact verification required** | On the Trial Collection product page at https://sukaya.com.au/, record any stated sample sizes (ml/gm) for each of the 4 included items, if shown. |
| **Status** | **NEEDS CLIENT VERIFICATION** |

### 6. Body Butter jar photography (variant match)

| Field | Detail |
|---|---|
| **What the supplied source currently says** | The 6-up product grid screenshot shows one body-butter jar photo, captioned "Body Butters" with a "More options" link and a visible label reading "Calming Body Butter" in the jar's own product label. |
| **What's missing/ambiguous** | Whether Original Body Butter has its own distinct product photo, or whether the single photo in the source is meant to represent both fragrance variants on the grid/PDP. |
| **Why it matters** | Affects the image-asset requirements list (Section 4 of the content inventory) — need to know whether to source one photo or two. |
| **Exact verification required** | On the Body Butters product page at https://sukaya.com.au/, switch between the "Original Body Butter" and "Calming Body Butter" fragrance options and note whether the product photo changes. |
| **Status** | **NEEDS CLIENT VERIFICATION** |

### 7. Privacy Policy — body copy

| Field | Detail |
|---|---|
| **What the supplied source currently says** | A "Privacy Policy" link exists in the footer (page 8 of the PDF). No policy text is included anywhere in the supplied material. |
| **What's missing/ambiguous** | The entire policy body text. |
| **Why it matters** | Legal/compliance content — cannot be written, paraphrased, or inferred by us under any circumstance; must come verbatim from the client or the live site. |
| **Exact verification required** | Full text of the Privacy Policy page at https://sukaya.com.au/ (or the client's current policy document, if maintained outside the site). |
| **Status** | **NEEDS CLIENT VERIFICATION** |

### 8. Terms and Conditions — body copy

| Field | Detail |
|---|---|
| **What the supplied source currently says** | A "Terms and Conditions" link exists in the footer (page 8 of the PDF). No policy text is included anywhere in the supplied material. |
| **What's missing/ambiguous** | The entire terms body text. |
| **Why it matters** | Same as above — legal content, zero tolerance for invention. |
| **Exact verification required** | Full text of the Terms and Conditions page at https://sukaya.com.au/ (or the client's current document). |
| **Status** | **NEEDS CLIENT VERIFICATION** |

### 9. Cart behaviour

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Every product page shows "Quantity," "Buy Now," "Add to Cart," and "Share" controls (consistent with a Wix Stores-style storefront), but the PDF contains no screenshots of an actual cart drawer/page, so behaviour (slide-out drawer vs. full page, quantity editing, promo code field, shipping estimate, etc.) is not shown. |
| **What's missing/ambiguous** | How the cart actually behaves once items are added. |
| **Why it matters** | Directly affects UX/architecture decisions for the rebuild's shopping flow (brief Section 9, conversion objective). |
| **Exact verification required** | On https://sukaya.com.au/, add a product to cart and record exactly what UI appears (drawer/page, fields, options, any messaging). |
| **Status** | **NEEDS CLIENT VERIFICATION** |

### 10. Checkout / payment flow

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Nothing — no checkout screens, payment processor branding, shipping-cost display, or order-confirmation content appears anywhere in the PDF. |
| **What's missing/ambiguous** | What currently powers checkout (platform, payment processor, shipping/tax handling), and by extension, what the rebuilt site's checkout should do — this is also flagged as an open architecture decision in Section 7 of the content inventory (rebuild as front-end catalog linking to existing checkout, vs. integrating a hosted commerce provider, vs. full custom build). |
| **Why it matters** | This is a scope- and cost-defining decision for the entire e-commerce rebuild, not a copy/content detail — cannot be assumed. |
| **Exact verification required** | Either (a) inspect the live checkout flow at https://sukaya.com.au/ end-to-end (payment processor branding, shipping options, confirmation screen) and/or (b) the client directly confirms which platform currently powers checkout and what should happen in the rebuilt site (reuse existing checkout vs. build new). |
| **Status** | **NEEDS CLIENT VERIFICATION** |

### 11. Original high-resolution product image availability

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Per Section 3/4 of the content inventory, only 2 of 10 products (Pink Blush Cleanser Exfoliator Mask, Geranium Lip Balm) have a clean standalone photo in the PDF, and even those are low-resolution (~200–350px). The other 8 products/variants exist only as small (~180×180px) crops inside multi-product grid screenshots, or (Uplifting Body Oil) have no photo at all in the source. |
| **What's missing/ambiguous** | Whether original, full-resolution product photography files exist and can be supplied, for every product listed in Section 4's "Missing / Required Image Assets" table of the content inventory. |
| **Why it matters** | The brief's Image Rule prohibits AI-generated or stock replacement imagery — a premium site cannot ship with 180×180px screenshot crops as hero product images, so this is a hard blocker for the Shop/PDP visual build (see Design Blockers below). |
| **Exact verification required** | Either (a) the live site at https://sukaya.com.au/ serves higher-resolution originals than what's embedded in the PDF (check each product image's actual served resolution / any zoom-image feature), and/or (b) the client supplies original photo files directly from their media library. |
| **Status** | **NEEDS CLIENT VERIFICATION** |

### 12. Founder's name

| Field | Detail |
|---|---|
| **What the supplied source currently says** | The "Aromatherapy & Skincare" section references "our founder, who has completed an Aromatherapy Practitioner Certificate including Specialist Certificate for Rejuvenating Skincare at the Australian College of Aromatherapy" — no name given. |
| **What's missing/ambiguous** | The founder's name (and any other bio detail, if the client wants to expand this section). |
| **Why it matters** | Founder/brand-story content is explicitly protected under the brief's non-fabrication rule; "our founder" reads acceptably as-is but naming them (if desired) requires the real name. |
| **Exact verification required** | Check the live site's About/Aromatherapy section at https://sukaya.com.au/ for a named founder, or ask the client directly. Note: if the live site also only says "our founder" with no name, then this is not missing information to chase further — it should just be carried forward as-is. |
| **Status** | **NEEDS CLIENT VERIFICATION** |

### 13. Street address

| Field | Detail |
|---|---|
| **What the supplied source currently says** | "SUKAYA / Melbourne VIC, Australia" plus a Google Map pin centered on Melbourne CBD. No street address is given. |
| **What's missing/ambiguous** | Whether a full street address exists and should be shown, or whether "Melbourne VIC, Australia" plus a map pin is the intended level of disclosure (e.g. no public storefront). |
| **Why it matters** | Determines whether the rebuilt Contact section needs a more precise address or should stay at city-level, matching the original site's apparent intent. |
| **Exact verification required** | Check https://sukaya.com.au/ Contact Us section for a full street address; if none is shown there either, treat "Melbourne VIC, Australia" as the confirmed, intentional level of detail rather than a gap. |
| **Status** | **NEEDS CLIENT VERIFICATION** |

### 14. Shipping/returns policy, stock levels, and any additional product variants

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Nothing on shipping rates, returns/exchanges, or stock/availability appears anywhere in the PDF. No variant types beyond the ones already catalogued (Body Oils fragrance, Body Butters fragrance, Geranium Lip Balm size) are shown. |
| **What's missing/ambiguous** | Whether shipping/returns policy content exists elsewhere on the live site (often a separate page or FAQ, sometimes not linked from the homepage) and whether any products have variants not captured in the PDF (e.g. additional fragrances, colours). |
| **Why it matters** | Shipping/returns information is a standard trust-building element for conversion (brief Section 9) but must not be fabricated. |
| **Exact verification required** | Check https://sukaya.com.au/ for a Shipping/Returns/FAQ page (may not be linked from the nav captured in the PDF) and transcribe verbatim if found; also re-check each PDP for variant options beyond what's listed in Section 2 of the content inventory. |
| **Status** | **NEEDS CLIENT VERIFICATION** |

### 15. "Powered by" footer platform

| Field | Detail |
|---|---|
| **What the supplied source currently says** | "Powered by" text appears in the footer (page 8 of the PDF), but the platform name/logo following it is not legible in the source. |
| **What's missing/ambiguous** | The platform name. |
| **Why it matters** | Low priority — a rebuilt custom site would not carry this attribution regardless of what it says. Included for completeness only. |
| **Exact verification required** | None required for the rebuild; optional to check the live footer at https://sukaya.com.au/ purely out of technical curiosity (e.g. confirms which platform the current site runs on, which could be useful context for the checkout-flow item above). |
| **Status** | **NON-BLOCKING — NEEDS CLIENT VERIFICATION ONLY IF USEFUL FOR ITEM 10 (checkout flow)** |

### 16. `PROJECT_BRIEF.md`

| Field | Detail |
|---|---|
| **What the supplied source currently says** | Referenced in earlier task instructions as something to inspect; no such file exists in the repository. The refurbishment brief was supplied as chat/task instructions instead. |
| **What's missing/ambiguous** | Whether the client intended to upload a separate `PROJECT_BRIEF.md` file that didn't make it into the repo. |
| **Why it matters** | Administrative/organizational only — does not block content or design work, since the brief's content is already available via the task instructions. |
| **Exact verification required** | Confirm with the client whether a separate brief file should be added to the repo, or whether the chat-supplied instructions are the authoritative brief going forward. |
| **Status** | **NON-BLOCKING — NEEDS CLIENT CONFIRMATION (administrative only)** |

---

## Summary

### A. VERIFIED
None. Live-site access was attempted (`sukaya.com.au` and a neutral control domain) and both were blocked by this environment's network egress policy — see "Live-site access attempted and blocked" above. No item could be checked against the live site or any other authoritative source, so nothing is promoted to Verified in this pass.

### B. NEEDS CLIENT VERIFICATION
1. Hero banner headline/subtext
2. Full navigation menu
3. Body Oils size (ml)
4. Geranium Lip Balm — 10 ml tin price
5. Trial Collection sample sizes
6. Body Butter jar photography (variant match)
7. Privacy Policy body copy
8. Terms and Conditions body copy
9. Cart behaviour
10. Checkout / payment flow
11. Original high-resolution product image availability
12. Founder's name
13. Street address
14. Shipping/returns policy, stock levels, additional variants
15. "Powered by" footer platform (non-blocking, optional)
16. `PROJECT_BRIEF.md` (non-blocking, administrative)

### C. SOURCE CONFLICTS
None found. Cross-checking the PDF's own internal repetitions (e.g. the Pink Blush Cleanser Exfoliator Mask's full detail appears twice, word-for-word identical; the Trial Collection's stated savings of "$4.00 (20%)" is arithmetically consistent with $19.99 → $15.99) turned up no contradictions within the supplied material itself. Section 6 items are gaps (information not present), not conflicts (information present in two contradictory forms).

### D. DESIGN BLOCKERS
These items must be resolved before the corresponding part of Phase 2 (design system / UX) can proceed without risking fabricated or misleading output:
- **Item 11 (product image resolution/availability)** — blocks final visual design of the Shop grid and all Product Detail Pages for 8 of 10 products; a premium site cannot be designed around placeholder-quality 180×180px crops.
- **Item 1 (hero headline/subtext)** — blocks finalizing the homepage hero, the brief's stated top design priority ("strong premium first impression").
- **Item 10 (checkout/payment flow)** — blocks any implementation work on the Shop/cart/checkout experience; this is an architecture decision, not a styling detail.
- **Item 9 (cart behaviour)** — blocks designing the add-to-cart interaction/drawer.
- **Items 7 & 8 (Privacy Policy / Terms and Conditions)** — block those two pages entirely; they cannot be designed with placeholder legal text.

### E. NON-BLOCKING ITEMS
Design/build can proceed in other areas while these remain open, since they affect only minor copy details or administrative housekeeping rather than page structure or legal content:
- Item 2 (full navigation menu) — can proceed with the two-item nav (HOME/SHOP) already evidenced, revisited if verification reveals more items.
- Item 3 (Body Oils size) — page can be built with the size field left visibly blank/pending rather than omitted or guessed.
- Item 4 (Geranium Lip Balm 10ml price) — page can be built with the size selector present and the 10ml price marked pending.
- Item 5 (Trial Collection sample sizes) — bundle description can ship without sizes; not a structural blocker.
- Item 6 (Body Butter photography) — can proceed with the single available photo for both variants until clarified.
- Item 12 (founder's name) — "our founder" copy can be used as-is per the source.
- Item 13 (street address) — city-level address and map pin can be used as-is per the source.
- Item 14 (shipping/returns/variants) — can proceed without a Shipping/Returns page until content is supplied; simply won't be linked from nav/footer yet.
- Item 15 ("Powered by" platform) — irrelevant to the rebuild.
- Item 16 (`PROJECT_BRIEF.md`) — administrative only.

---

## Next Step

Per your instruction, stopping here. Phase 2 (design system / UX) should not begin until:
1. The Design Blockers above (Section D) are resolved by the client, or the client explicitly authorizes proceeding around them (e.g. "start the design system now, leave hero copy/product photos as placeholders"), and
2. Live-site access is either restored in this environment, or the client supplies the verified answers directly (whichever is faster on their end).
