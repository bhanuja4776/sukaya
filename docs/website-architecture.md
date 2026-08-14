# SUKAYA Website Architecture — Phase 1.6 (As Reconstructed from the Live-Site Archive)

**Status: DRAFT — reference/documentation only. No rebuild architecture decisions are being made here; this records what the *existing* site is, per your instruction to reconstruct structure "from the archive," not invent it.**

## Platform

- **Website builder:** GoDaddy Website Builder 8.0.0000 (`Starfield Technologies`), confirmed via `<meta name="generator">` on every crawled page.
- **Commerce:** GoDaddy Online Store widget (`widget-shop-shop-1` / `ols-shop-container` in the raw HTML), backed by a public API at `https://online-store.api.godaddy.com/v1/accounts/ef52d3fd-20a0-4d24-8277-f423cfb9cf9b`.
- **Image/CDN host:** `img1.wsimg.com`.
- **Fonts:** Google Fonts — Righteous (display) and Josefin Sans (body).
- **Analytics:** GoDaddy Signals (`scc-c2` telemetry bundle).
- **Cookie consent:** first-party GoDaddy Website Builder cookie banner (not a third-party consent-management platform).

## Pages (confirmed via `sitemap.website.xml`, HTTP 200)

| URL | Purpose | Notes |
|---|---|---|
| `/` | Homepage | Single scrolling page containing all brand/about/product-teaser/contact content — see Section "Homepage sections" below. |
| `/shop` | Shop / product catalog | Server response only contains the cookie-consent shell in this archive; actual product grid renders client-side via the Online Store widget. |
| `/shop?olsPage=cart` | Cart | Same platform pattern — cart contents render client-side; not captured. |
| `/privacy-policy` | Privacy Policy | Live content is literally "Privacy Policy coming soon" — no policy text exists yet. |
| `/terms-and-conditions` | Terms and Conditions | Live content is "Coming soon!" plus an empty "Return and Refund Policy" heading with no body text. |

**No separate About or Contact page exists.** The archive tool searched for both and recorded explicitly: *"NOT AVAILABLE — no separate public About/Contact page was discovered."* Both are homepage sections only.

## Navigation

Confirmed from `data/navigation.json` and raw header markup:

- **Home** → `/`
- **Shop** → `/shop`
- **"More"** — a responsive overflow-menu component (`MoreMenu`) that, on inspection of its raw markup, contains the identical Home/Shop links again. It is not a gateway to additional pages.
- Shopping cart icon → `/shop?olsPage=cart`
- Search field ("Search Products") present in the header on every page.
- Mobile: separate `MobileNavigationDrawer` component (hamburger icon), contents not independently verified beyond the same nav data.

## Homepage sections, in order

Reconstructed from `data/content.json` headings (`h1`/`h2`/`h3`) and confirmed against the full text extract in `content/homepage.md`:

1. **Hero** — H1 "Pure & Natural Skin Care Solutions", subheadline "Discover natural, minimalistic skincare for radiant skin.", "Shop Now" CTA.
2. **About Sukaya** (H2) — containing "Our Philosophy" and "Our Commitment" sub-sections, plus "Aromatherapy & Skincare".
3. **Featured Products** (H2) — product teaser section (subset of the 10, per the PDF).
4. **"Explore our stunning range of natural beauty"** (H2) — image gallery/carousel.
5. **Raving Fans** (H2) — testimonials section heading; **confirmed empty**, no review content behind it (consistent with `data/reviews.json` being `[]`).
6. **Contact Us** (H2) — "Questions or Comments" copy, address, email, "Get directions" button (Google Map).
7. **Subscribe** (H3) — newsletter signup, "Get 10% off your first purchase..." incentive copy.
8. **Footer** — copyright, "Powered by" (GoDaddy), Privacy Policy link, Terms and Conditions link.
9. **Cookie consent banner** — overlays the page on first visit; not a "section" in the scroll sense but a real, persistent UI element that must be accounted for in the rebuild.

## Shop / commerce structure

- **10 product pages**, one per product/product-group (Body Oils and Body Butters each host two fragrance variants on a single product page, consistent between the PDF and the sitemap's single slug per product).
- **9 named categories** (from `sitemap.ols.xml`): Face, Cleanser Exfoliator Mask, Body Oils, Balms, Samples Minis, Face Serums, Body Butters, Face Cleansing Oil, Accessories & Essentials. Category *pages* themselves were not retrievable (404) — only the names/slugs are confirmed, via the sitemap.
- **Product page UI pattern** (from the PDF, consistent across all 10): price → Quantity selector → Buy Now / Add to Cart / Share → headline → description → What It Does/Key Benefits → Ingredients → Skin Type → Aroma & Texture → How to Use → Safety Notes.
- **Cart/checkout:** UI pattern exists (Add to Cart, Buy Now, Quantity) but the actual cart contents view, checkout flow, and payment processor are **not accessible in either source** — see `docs/source-of-truth.md` Section G (Commerce Blockers).

## Component inventory (as observed by the archive tool)

From `technical/component-map.md`: Header, Logo, DesktopNavigation, MoreMenu, MobileNavigationDrawer, SearchControl, CartControl, PageSection, ShopContainer, Footer, LegalNavigation, CookieBanner, PopupContainer, MessagingWidget.

These are GoDaddy Website Builder's own component names/widget IDs, preserved for technical reference only — they describe the *existing* site's structure, not a prescription for how the rebuild should be componentized.

## Design reference (not implemented — reference only, per your instruction)

- **Primary brand color:** `#547d54` (dark sage green) — from the page's `theme-color` meta tag, repeated in observed CSS.
- **Other observed CSS colors:** `#000`, `#CCC`, `#ff0` (frequency 1 each — likely incidental/utility colors, not core brand palette).
- **Typography:** Righteous (headings/display — matches the stylized logo lettering), Josefin Sans (body).
- **Layout/responsive/animation:** GoDaddy's responsive class system and CSS transitions/keyframes are preserved verbatim in `raw/html` and the downloaded JS/CSS, but the archive could not verify *rendered* layout, computed responsive breakpoints, or animation timing — the archive tool's controlled browser failed (`ERR_NETWORK_CHANGED`) before it could screenshot or measure the live rendering. Anything about actual visual layout/spacing/motion beyond what's inferable from static markup remains unverified.

## What this document deliberately does not do

Per your instruction, this is reference/documentation only. It does not propose a rebuild architecture (that remains in `docs/content-inventory.md` Section 7, still open pending the commerce decision), does not implement any component, and does not alter navigation, page structure, or copy.
