# SUKAYA Product Inventory — Phase 1.6 (Consolidated)

**Status: DRAFT — reference only.**

This consolidates product facts from both sources into one table. **Full verbatim descriptions, ingredient lists, "What It Does"/"Key Benefits", "How to Use", and "Safety Notes" text are not repeated here** — they already exist word-for-word in `docs/content-inventory.md` Section 2, and repeating them risks transcription drift from that verified original. This document adds what the archive contributed that the PDF-only inventory didn't have: confirmed product URLs/slugs, category assignments, and an explicit per-product image-asset status.

## Source statement (repeated from `docs/source-of-truth.md` — important)

Every individual product page on the live site (`/ols/products/*`) returned HTTP 404 or 429 during the archive crawl. **The archive contributes zero descriptive product content.** All descriptions, ingredients, benefits, sizes, prices, skin type, aroma/texture, usage, and safety notes below come exclusively from `docs/sukaya-content.pdf`, exactly as already recorded in `docs/content-inventory.md` Section 2. The archive's only contribution to this table is the confirmed URL slug (from `sitemap.ols.xml`, which *did* return 200) and category/collection names, plus the image-asset status cross-referenced against `docs/asset-inventory.md`.

## Consolidated table

| # | Product | Price (A$) | Size | Confirmed URL slug | Category (from sitemap) | Image assets available | Full detail |
|---|---|---|---|---|---|---|---|
| 1 | Cleanser Exfoliator Mask – Pink Blush | 31.99 | 40 gm | `/ols/products/cleanser-exfoliator-mask---pink-blush` | Cleanser Exfoliator Mask | One clean but low-res photo (201×221, PDF only) | content-inventory.md §2.1 |
| 2 | Super Fruits Face Elixir | 36.99 | 30 ml | `/ols/products/super-fruits-face-elixir` | Face Serums | Thumbnail only (~180×180, PDF grid) — **NEEDS ORIGINAL** | content-inventory.md §2.3 |
| 3 | Berry Light Soothe Serum | 36.99 | 30 ml | `/ols/products/berry-light-soothe-serum` | Face Serums | Thumbnail only — **NEEDS ORIGINAL** | content-inventory.md §2.4 |
| 4a | Body Oils — Calming Body Oil | 31.99 | NEEDS VERIFICATION | `/ols/products/body-oil` (single page, fragrance variant) | Body Oils | Lifestyle thumbnail only — **NEEDS ORIGINAL** | content-inventory.md §2.2 |
| 4b | Body Oils — Uplifting Body Oil | 31.99 | NEEDS VERIFICATION | `/ols/products/body-oil` (same page, other variant) | Body Oils | No photo in either source — **NEEDS ORIGINAL** | content-inventory.md §2.2 |
| 5a | Body Butters — Original Body Butter | 31.99 | 80 ml | `/ols/products/original-body-butter` (single page, fragrance variant) | Body Butters | Thumbnail shows a jar labeled "Calming Body Butter" — unclear if Original has its own photo — **NEEDS ORIGINAL / NEEDS VERIFICATION** | content-inventory.md §2.5 |
| 5b | Body Butters — Calming Body Butter | 31.99 | 80 ml | `/ols/products/original-body-butter` (same page, other variant) | Body Butters | Same thumbnail as above (likely this variant) — still low-res — **NEEDS ORIGINAL** | content-inventory.md §2.5 |
| 6 | Patchouli Face Cleansing Oil | 31.99 | 50 ml | `/ols/products/patchouli-face-cleansing-oil` | Face Cleansing Oil | Thumbnail only — **NEEDS ORIGINAL** | content-inventory.md §2.6 |
| 7 | All in One Lavender Balm | 26.99 | 40 ml | `/ols/products/all-in-one-lavender-balm` | Balms | Thumbnail only — **NEEDS ORIGINAL** | content-inventory.md §2.7 |
| 8 | Trial Collection (bundle) | ~~19.99~~ 15.99 (save $4.00 / 20%) | sample sizes: NEEDS VERIFICATION | `/ols/products/trial-collection` | Samples Minis | Bundle photo exists but embedded in a text screenshot, not isolated — **NEEDS ORIGINAL** | content-inventory.md §2.8 |
| 9 | Geranium Lip Balm | From 5.99 (10 ml price: NEEDS VERIFICATION) | Tube 5 ml / Tin 10 ml | `/ols/products/geranium-lip-balm` | Accessories & Essentials | One clean but low-res photo (347×313, PDF only) | content-inventory.md §2.9 |
| 10 | Rosewood Spoon (Handcrafted) | 2.99 | — | `/ols/products/rosewood-spoon` | Accessories & Essentials | Thumbnail only — **NEEDS ORIGINAL** | content-inventory.md §2.10 |

*(Category "Face" also appears in the sitemap with no product mapped to it in our 10-item inventory — possibly an empty/parent category. Not something to resolve by assumption; noted as-is.)*

## What "NEEDS VERIFICATION" means here (unchanged from `docs/verification-checklist.md`)

- Body Oils fill size (ml) — not stated in either source.
- Body Butter jar photo / variant match — ambiguous in the PDF, and the archive has no product images at all to disambiguate with.
- Trial Collection sample sizes — not stated in either source.
- Geranium Lip Balm 10 ml tin price — not stated in either source.

None of these have been inferred, estimated, or filled in. They are carried forward exactly as flagged in `docs/verification-checklist.md`.

## What "NEEDS ORIGINAL" means here

The product has descriptive content (verbatim, verified, complete) but **no usable production-quality photograph** exists in either source. Do not substitute stock or AI-generated imagery for these — see the brief's Image Rule and `docs/asset-inventory.md` Section 5.

## No new product facts from the archive

To be explicit, since this document's purpose was partly to check whether the archive added or contradicted any product fact: it did not. Every price, size, ingredient, and claim in this table traces to the PDF alone, and the archive independently corroborates only the product *names* and *category names* (both via the successfully-crawled sitemap), with zero conflicts.
