# SUKAYA Asset Inventory — Phase 1.6

**Status: DRAFT — reference only, no assets have been used in any implementation.**

Sources: `docs/sukaya-content.pdf` (extracted embedded images, see `docs/assets/reference/`) and `docs/archive/sukaya-site-archive.zip` (extracted to `docs/archive/sukaya-site-archive/`, both preserved unchanged in the repo). The archive's own `manifests/asset-manifest.json` records 78 downloaded asset records; deduplicating by canonical source URL reduces this to **28 genuinely distinct assets** (28 records vs. 78 — the difference is almost entirely GoDaddy's responsive image pipeline serving the same handful of source photos at dozens of width/crop variants, named `rs_w_###...`, `cr_t_#...`, `qt_q_##...` in the zip).

## 1. Images — unique source photos (6 total across the whole live site)

| # | Canonical source | Local file(s) in archive | Native size | Category | Pages it appears on | Notes |
|---|---|---|---|---|---|---|
| 1 | `Gemini_Generated_Image_j5auh1j5auh1j5au.png` | `assets/images/Gemini_Generated_Image_j5auh1j5auh1j5au__df6875d6830f.png` (+19 resized `.jpg` variants) | 960×1088 | Hero/OG background | All 5 crawled pages (site-wide `og:image`/background) | **AI-generated filename + visible label-text distortion in the image. Flagged — see Section 4. Not modified.** |
| 2 | Getty Images `1570519591` | `assets/images/rs_w_450_m__8583dcad96bc.jpg` (+18 variants) | 2560×2560 | Decorative/stock (CSS background) | Homepage only | **Confirmed Getty stock via `isteam/getty/` URL path. Flagged — see Section 4.** |
| 3 | `d6e7e453-e33d-4fc1-9767-84350d8310c7.jpeg` | `assets/images/qt_q_95__9d905af5b4a6.jpg` (+11 variants incl. favicons) | 1310×768 | **Brand logo** | Every page (`alt="SUKAYA"`) | Matches the logo already extracted from the PDF (`docs/assets/reference/logo-sukaya.jpg`). Same brand mark, this is a higher-fidelity/differently-cropped rendition. |
| 4 | `IMG_4010.jpeg` | `assets/images/cr_t_0___4909e511b9d9.jpg` (+1 variant) | 2560×1754 | Lifestyle photo (About/Philosophy section) | Homepage only | Camera-original filename pattern (consistent with an authentic uploaded photo, not stock/AI). Same botanicals + strawberry flatlay concept as the PDF's "Our Philosophy" image, now recovered at full native resolution. **Usable, high-res original recovered.** |
| 5 | Getty Images `665238744` | `assets/images/cr_t_0___5ffa6d03198d.jpg` (+1 variant) | 2303×1302 | Lifestyle photo (Our Commitment section) | Homepage only | **Confirmed Getty stock** via `isteam/getty/665238744` URL path — same visual concept as the PDF's "Our Commitment" ingredients flatlay, but this specific file is licensed stock photography, not an original SUKAYA photo. Flagged — see Section 4. |
| 6 | `bc23cfe9-bf93-48b1-89d9-82e5d5fce21c.jpeg` | `assets/images/cr_t_7__6cedc0c7672b.17_` (+1 variant, `rs_w_600_h_451__f9e3e5390850...`) | 1367×1200 | Lifestyle photo (Aromatherapy & Skincare section) | Homepage only | UUID upload filename under the site's own account path (not `/getty/`), consistent with — but not proof of — an original upload. Same lavender-oil-bottle concept as the PDF's "Aromatherapy & Skincare" image, now recovered at full native resolution. **Usable, high-res original recovered.** |

All 28 manifest records resolve to one of these 6 source images, plus non-image assets (fonts, JS, one `.webmanifest`) listed in Section 3.

### Net effect on the Phase 1 "Missing / Required Image Assets" table (`docs/content-inventory.md` Section 4)

- **Newly resolved to high-resolution originals:** the brand logo, the About/Philosophy botanicals photo, and the Aromatherapy lavender-oil photo. These can be sourced from `docs/archive/sukaya-site-archive/assets/images/` going forward instead of the low-res PDF crops.
- **Still entirely missing, in either source:** original photography for all 10 products (Cleanser Exfoliator Mask, Super Fruits Face Elixir, Berry Light Soothe Serum, Calming/Uplifting Body Oil, Original/Calming Body Butter, Patchouli Face Cleansing Oil, All in One Lavender Balm, Trial Collection, Geranium Lip Balm, Rosewood Spoon). The archive could not retrieve these because every product page 404'd/429'd before any product images were ever queued for download — this is a hard gap in both sources, not a resolution.
- **Two images newly identified as licensed stock, not SUKAYA originals** (Getty `1570519591`, Getty `665238744`) — flagged in Section 4, not to be treated as authentic brand photography if the rebuild is meant to showcase original SUKAYA imagery.

## 2. Images — from the PDF (`docs/sukaya-content.pdf`), for cross-reference

Unchanged from `docs/content-inventory.md` Section 3 — repeated here only as a pointer, not re-extracted:

- `docs/assets/reference/logo-sukaya.jpg` — same brand mark as archive item #3 above, lower resolution.
- `docs/assets/reference/product-pink-blush-mask-clean.jpg` — only standalone product photo for the Cleanser Exfoliator Mask (still low-res; archive has nothing better).
- `docs/assets/reference/product-geranium-lip-balm-clean.jpg` — only standalone product photo for the Geranium Lip Balm (still low-res; archive has nothing better).
- `docs/assets/reference/lifestyle-flatlay-1.jpg`, `-2.jpg`, `-pink-blush.jpg` — homepage gallery lifestyle shots; the archive did not independently recover higher-resolution versions of these specific frames (the gallery carousel's other slides were not captured by either source).
- `docs/assets/reference/grid-screenshot-*.jpg` — composite grid screenshots; the only source for 8 of 10 products' thumbnails, still at placeholder resolution only.

## 3. Non-image assets (from the archive)

| Type | Count | Detail |
|---|---|---|
| Fonts | 5 `.woff2` files | Support **Righteous** (display) and **Josefin Sans** (body), both Google Fonts — confirms `docs/technical/typography.md`'s finding. Reference only; not yet used in any implementation. |
| JavaScript | 9 files | GoDaddy Website Builder framework/runtime bundles (`UX.4.51.22.js`) and page-specific `script.js`/`scc-c2.min.js` (GoDaddy Signals analytics). Preserved for technical reference (e.g. confirms the Online Store API base URL); not reusable code for a rebuilt site on a different stack. |
| Web app manifest | 1 file | `manifest.webmanifest` — standard PWA manifest, GoDaddy default. |

## 4. Existing live-site assets — client decision required

Per your explicit instruction not to auto-replace anything that looks AI-generated or otherwise flagged, and to record it instead:

### 4.1 `Gemini_Generated_Image_j5auh1j5auh1j5au.png`
- **Where used:** site-wide `og:image`/`twitter:image` meta tag on every page, and as a repeating background/decorative element (20 resized variants downloaded, more than any other single asset in the archive).
- **Evidence it may be AI-generated:** (a) filename literally begins "Gemini_Generated_Image..."; (b) visually, the image shows all 10 SUKAYA products staged together, but several product labels have distorted/garbled text — "Super Fruits Fsts Eilser" instead of "Super Fruits Face Elixir", "Berry Light Soulite Serum" instead of "Berry Light Soothe Serum", "All ip ons Lavender Balm" instead of "All in One Lavender Balm" — a well-known AI image-generation artifact when synthesizing readable text on packaging.
- **Action taken:** none. File preserved unchanged in `docs/archive/sukaya-site-archive/assets/images/`.
- **EXISTING LIVE-SITE ASSET — CLIENT DECISION REQUIRED:** should this continue to be used as the site's hero/OG image in the rebuild, be replaced with real product photography (once available), or something else? Not our call to make.

### 4.2 Getty Images `1570519591` (clear gel/serum droplet macro shot, 2560×2560)
- **Where used:** homepage CSS background/decorative element only (no `alt` text, `srcset`/`css-url` occurrence).
- **Evidence:** source URL is `img1.wsimg.com/isteam/getty/1570519591/...` — the `/isteam/getty/` path segment is GoDaddy's own convention for Getty Images stock library assets.
- **Action taken:** none. Preserved unchanged.
- **EXISTING LIVE-SITE ASSET — CLIENT DECISION REQUIRED:** confirm the site's Getty/stock photo license still covers continued use in a rebuilt site, or replace with owned/licensed imagery — not decided here.

### 4.3 Getty Images `665238744` (ingredients flatlay, 2303×1302)
- **Where used:** homepage, "Our Commitment" section area (same visual slot/concept as the ingredients-bowls photo in the PDF).
- **Evidence:** source URL `img1.wsimg.com/isteam/getty/665238744` — same Getty path pattern as 4.2.
- **Action taken:** none. Preserved unchanged.
- **EXISTING LIVE-SITE ASSET — CLIENT DECISION REQUIRED:** same as above — this has been presenting as if it might be an authentic "our ingredients" photo, but it is licensed stock. Confirm intended usage/licensing before carrying it into the rebuild.

## 5. Explicit non-fabrication statement

No image in this inventory has been generated, modified, cropped-and-passed-off-as-original, upscaled, or otherwise altered by this process. Where an asset is small/low-resolution, it is reported as such rather than enhanced. Where a product has no available photo anywhere in either source, it is listed as missing (Section 1) rather than filled with a placeholder or stock substitute.
