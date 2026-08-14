# Sukaya website preservation inventory

## Website overview

- Domain: https://sukaya.com.au/
- Crawl date: 2026-08-14 (Australia/Sydney)
- Platform: GoDaddy Website Builder 8.0.0000
- Recorded URL responses: 29
- Sitemap page/product/category URLs: 20
- Product URLs: 10
- Category URLs: 9
- Downloaded/recorded assets: 78
- Image records: 57
- Missing/error records: 25

## Preservation status

The server-rendered pages, robots file, sitemap index, website sitemap, store sitemap, exact visible/source text, metadata, navigation, downloadable JS/CSS/images/fonts and original URLs were preserved. Product and category sitemap URLs returned 404 or 429, and the storefront API returned 403 when requested directly. Those failures are explicit in `MISSING-DATA.md` and the JSON inventories.

## URL and page inventory

- `200` https://sukaya.com.au/ — SUKAYA SKIN CARE (page)
- `200` https://sukaya.com.au/robots.txt —  (resource)
- `200` https://sukaya.com.au/sitemap.xml —  (resource)
- `200` https://sukaya.com.au/shop?olsPage=cart — SUKAYA SKIN CARE (page)
- `200` https://sukaya.com.au/shop — SUKAYA SKIN CARE (page)
- `200` https://sukaya.com.au/privacy-policy — SUKAYA SKIN CARE (policy)
- `200` https://sukaya.com.au/terms-and-conditions — SUKAYA SKIN CARE (policy)
- `200` https://sukaya.com.au/sitemap.website.xml —  (resource)
- `200` https://sukaya.com.au/sitemap.ols.xml —  (resource)
- `404` https://sukaya.com.au/ols/products —  (resource)
- `404` https://sukaya.com.au/ols/products/berry-light-soothe-serum —  (resource)
- `404` https://sukaya.com.au/ols/products/cleanser-exfoliator-mask---pink-blush —  (resource)
- `404` https://sukaya.com.au/ols/products/rosewood-spoon —  (resource)
- `404` https://sukaya.com.au/ols/products/patchouli-face-cleansing-oil —  (resource)
- `429` https://sukaya.com.au/ols/products/geranium-lip-balm —  (resource)
- `404` https://sukaya.com.au/ols/products/original-body-butter —  (resource)
- `404` https://sukaya.com.au/ols/products/super-fruits-face-elixir —  (resource)
- `404` https://sukaya.com.au/ols/products/trial-collection —  (resource)
- `404` https://sukaya.com.au/ols/products/all-in-one-lavender-balm —  (resource)
- `404` https://sukaya.com.au/ols/products/body-oil —  (resource)
- `404` https://sukaya.com.au/ols/categories/face —  (resource)
- `404` https://sukaya.com.au/ols/categories/cleanser-exfoliator-mask —  (resource)
- `404` https://sukaya.com.au/ols/categories/body-oils —  (resource)
- `404` https://sukaya.com.au/ols/categories/balms —  (resource)
- `404` https://sukaya.com.au/ols/categories/samples--minis —  (resource)
- `429` https://sukaya.com.au/ols/categories/face-serums —  (resource)
- `404` https://sukaya.com.au/ols/categories/body-butters —  (resource)
- `404` https://sukaya.com.au/ols/categories/face-cleansing-oil —  (resource)
- `404` https://sukaya.com.au/ols/categories/accessories--essentials —  (resource)

## Products

- Berry Light Soothe Serum — https://sukaya.com.au/ols/products/berry-light-soothe-serum — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)
- Cleanser Exfoliator Mask Pink Blush — https://sukaya.com.au/ols/products/cleanser-exfoliator-mask---pink-blush — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)
- Rosewood Spoon — https://sukaya.com.au/ols/products/rosewood-spoon — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)
- Patchouli Face Cleansing Oil — https://sukaya.com.au/ols/products/patchouli-face-cleansing-oil — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)
- Geranium Lip Balm — https://sukaya.com.au/ols/products/geranium-lip-balm — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)
- Original Body Butter — https://sukaya.com.au/ols/products/original-body-butter — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)
- Super Fruits Face Elixir — https://sukaya.com.au/ols/products/super-fruits-face-elixir — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)
- Trial Collection — https://sukaya.com.au/ols/products/trial-collection — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)
- All In One Lavender Balm — https://sukaya.com.au/ols/products/all-in-one-lavender-balm — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)
- Body Oil — https://sukaya.com.au/ols/products/body-oil — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)

## Collections

- Face — https://sukaya.com.au/ols/categories/face — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)
- Cleanser Exfoliator Mask — https://sukaya.com.au/ols/categories/cleanser-exfoliator-mask — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)
- Body Oils — https://sukaya.com.au/ols/categories/body-oils — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)
- Balms — https://sukaya.com.au/ols/categories/balms — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)
- Samples Minis — https://sukaya.com.au/ols/categories/samples--minis — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)
- Face Serums — https://sukaya.com.au/ols/categories/face-serums — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)
- Body Butters — https://sukaya.com.au/ols/categories/body-butters — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)
- Face Cleansing Oil — https://sukaya.com.au/ols/categories/face-cleansing-oil — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)
- Accessories Essentials — https://sukaya.com.au/ols/categories/accessories--essentials — NOT ACCESSIBLE (HTTP 404/429 during preservation crawl)

## Asset content types

- application/javascript: 9
- application/manifest+json: 1
- font/woff2: 5
- image/jpeg: 57
- text/javascript: 1
- unknown: 5

## Component architecture

See `technical/component-map.md`.

## Risks and reconstruction recommendations

- Highest risk: product descriptions, prices, variants, stock, and product-specific media were unavailable from the stale product routes/API. Manual recovery from the GoDaddy store owner account or an export is required.
- Raw implementation resources should be retained unchanged; they contain widget configuration and design values useful for reconstruction.
- Do not treat sitemap product names derived from slugs as complete product content.
