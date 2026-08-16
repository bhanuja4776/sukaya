# SUKAYA Phase 7 — Verified Commerce Integration + GoDaddy Checkout Handoff Investigation

**Status: Investigation only. No cart-sync, checkout handoff, or payment integration is implemented in this phase. The commerce architecture built in Phase 6 (`lib/commerce/`, `components/commerce/`) is unchanged. The checkout CTA remains honestly disabled.**

This document uses: your newly-supplied verified live-site evidence (quoted exactly as you described it, not embellished); the existing repository documentation (`docs/source-of-truth.md`, `docs/commerce-investigation.md`, `docs/website-architecture.md`, `docs/product-inventory.md`); the preserved archive (`reference/sukaya-site-archive/`); and public GoDaddy documentation reachable via web search from this environment. Where external GoDaddy pages could not actually be fetched (see §5), that limitation is stated rather than papered over with a guess.

---

## Capability summary

| Capability | Verified | Evidence | Safe to implement |
|---|---|---|---|
| Cart (native GoDaddy) | **Yes** | Your live-site evidence: real cart with product name/price/quantity/total, "CHECKOUT", "Continue shopping", "Update cart" | N/A — already live on the original site; nothing for us to build |
| Checkout (native GoDaddy) | **Yes** | Your live-site evidence: `https://sukaya.com.au/checkout` with Contact/Delivery/Shipping/Seller notes/Payment sections, Subtotal/Shipping/Coupon/Total Due | N/A — already live; not to be rebuilt (explicitly out of scope) |
| Card payment (option shown) | **Yes** | Your evidence: "Credit or Debit Card" listed at Payment | No — native to GoDaddy's checkout, not ours to implement |
| PayPal (option shown) | **Yes** | Your evidence: "PayPal" listed at Payment | No — native to GoDaddy's checkout, not ours to implement |
| Shipping (native calculation) | **Yes**, behavior only | Your evidence: "Enter your address to see available shipping methods" | No — GoDaddy calculates this once a customer is in its native checkout; we don't reproduce it |
| Product handoff (frontend → GoDaddy cart) | **No** | No documented/public mechanism found (§6, §7) | No |
| Variant handoff (fragrance/size) | **No** | No public variant-identification mechanism found (§8) | No |
| Quantity handoff | **No** | No documented URL/query mechanism found (§9) | No |
| Cart API (public, third-party-callable) | **No** | `online-store.api.godaddy.com` returned HTTP 403 to the archive crawler (Phase 1.6); no public docs found describing third-party cart writes (§5, §6) | No |
| Checkout API (public, order-session creation) | **No** | No public documentation located for this (§5) | No |

---

## 1. New live-site evidence

You manually verified the live SUKAYA checkout flow and supplied the following (recorded here verbatim, not paraphrased into something more specific than what you reported):

- **Original cart**: real, contains product name/price/quantity/total, and has "CHECKOUT," "Continue shopping," and "Update cart" controls.
- **Original checkout URL**: `https://sukaya.com.au/checkout` — a real GoDaddy Online Store checkout, consistent with the already-verified GoDaddy Website Builder/Online Store platform (`docs/source-of-truth.md` §A.10).
- **Checkout fields**: Contact (Email); Delivery (method, shipping, address block — Country/First Name/Last Name/Address/Apartment optional/City/State-Territory/Postcode/Phone); Shipping ("Enter your address to see available shipping methods," address-dependent); Seller notes ("Notes for seller (required)"); Payment ("All payments are secure and encrypted," Credit or Debit Card, PayPal, "Pay now").
- **Also shown**: existing-account sign-in option, Edit cart, Subtotal, Shipping, Coupon code, Total Due.

This is new, directly-verified information this project did not have before — Phase 5's `docs/commerce-investigation.md` had marked cart and checkout behavior **NEEDS CLIENT VERIFICATION** because the archive crawler couldn't reach either. That gap is now closed for *what the cart/checkout look like and contain*. It is **not** closed for *how an external frontend would populate that cart* — see §6.

## 2. Verified checkout architecture

The live checkout is a standard GoDaddy Online Store checkout: cart → `/checkout` → contact/delivery/shipping/notes/payment → order. It requires an address before shipping methods appear, and it supports guest checkout alongside an existing-account sign-in option. Nothing about this needs to be rebuilt — the brief is explicit that GoDaddy's own checkout already handles these functions, and this investigation agrees: there is no reason to reimplement contact/delivery/shipping/payment collection ourselves when a real, working implementation already exists at that URL.

## 3. Verified payment options

Two payment methods are confirmed to be **offered** at checkout: **Credit or Debit Card** and **PayPal**. This is a UI-level fact (what a customer sees and can choose), not a statement about what happens behind either option.

## 4. Unknown payment processor

The gateway/processor actually handling the "Credit or Debit Card" option (GoDaddy Payments, Stripe, Braintree, or something else) is **not verified** and this document does not guess at it, per your explicit instruction. Nothing in your evidence, the archive, or public GoDaddy documentation identifies it. This is a separate fact from "a card payment option exists," and the two must not be conflated — the capability table above keeps them apart deliberately.

## 5. GoDaddy commerce capabilities found (public documentation)

Web search was used to look for a public, documented way for an external site to interact with a GoDaddy Online Store's cart or checkout. Two things surfaced, and both turned out not to answer the question:

- **GoDaddy Website Builder API for third-party platforms** (announced October 2024). Per the available search summaries (the source press release itself, `prnewswire.com`, and `developer.godaddy.com`, could not actually be fetched from this environment — see the note below), this is a **reseller/provisioning API**: it lets a partner platform (the announcement names Tailor Brands) programmatically **create and manage new GoDaddy Website Builder sites on behalf of their own customers**. It is not about an existing, already-published site's storefront exposing cart/checkout operations to a separate frontend. This does not apply to SUKAYA's situation and is flagged here specifically so it isn't chased as a false lead.
- **GoDaddy Commerce "Stores" API** (`api.docs.commerce.godaddy.com`). Search summaries describe it in general terms — "programmatically access and manipulate data associated with various aspects of a store... creating, updating, retrieving, and deleting store-related information... synchronize store-related data with other applications." That phrasing is consistent with a merchant-side catalog/store-management API (e.g., for a store owner to sync inventory from an external system) as much as it is with a public storefront cart API — the summary does not disambiguate, and this document will not guess which. **This could not be confirmed** in either direction, because this environment's network egress blocks `api.docs.commerce.godaddy.com`, `developer.godaddy.com`, and `www.godaddy.com` directly (`WebFetch` returned `EGRESS_BLOCKED` / DNS failure on each attempt). This is exactly the kind of gap that needs the account owner, not an external investigation, to close — see §14.

No other public commerce/cart API for GoDaddy Online Store was found.

## 6. Cart synchronization findings

**No verified, public, or documented mechanism exists for populating GoDaddy's native cart from an external frontend.** Specifically:

- No documented query-parameter or URL scheme (e.g., something like `?add=slug&qty=2`) was found anywhere — not in the archive, not in public GoDaddy documentation, not in your new evidence.
- The one API endpoint this project has directly observed (`https://online-store.api.godaddy.com/v1/accounts/ef52d3fd-20a0-4d24-8277-f423cfb9cf9b`) returned **HTTP 403** to the archive's crawler (`docs/source-of-truth.md` line 17) — consistent with it being an internal API the store's own widget calls from within an authenticated/cookied session on GoDaddy's own hosted page, not a credential-free public integration surface.
- Per your explicit instruction, this investigation did not attempt to reverse-engineer that endpoint, guess at undocumented parameters, or test it further.

**Conclusion: `window.location = "/checkout"` (or any redirect to it) would not carry our `LocalCartAdapter`'s contents into GoDaddy's cart.** GoDaddy's cart is almost certainly session/cookie-scoped to its own hosted page; a separately-built frontend has no verified way to write to it. This confirms the brief's own warning was correct to raise, not just a formality.

## 7. Product URL findings

Per your instruction, each of the 10 products was checked individually. **None has a human-verified original product URL.** What's verified is narrower than that: `docs/source-of-truth.md` confirms the *pattern* `/ols/products/{slug}` exists — `sitemap.ols.xml` itself returned HTTP 200 and lists all 10 product slugs — but every individual URL returned HTTP 404 or 429 when the archive's crawler tried to fetch it directly (`reference/sukaya-site-archive/MISSING-DATA.md`). Your new evidence this phase covers the cart and checkout pages, not individual product pages, so it doesn't close this gap either.

| Product | Slug | Candidate URL (sitemap-derived, unconfirmed) | Verified? |
|---|---|---|---|
| Cleanser Exfoliator Mask – Pink Blush | `cleanser-exfoliator-mask---pink-blush` | `/ols/products/cleanser-exfoliator-mask---pink-blush` | NEEDS VERIFICATION |
| Super Fruits Face Elixir | `super-fruits-face-elixir` | `/ols/products/super-fruits-face-elixir` | NEEDS VERIFICATION |
| Berry Light Soothe Serum | `berry-light-soothe-serum` | `/ols/products/berry-light-soothe-serum` | NEEDS VERIFICATION |
| Body Oils | `body-oil` | `/ols/products/body-oil` | NEEDS VERIFICATION |
| Body Butters | `original-body-butter` | `/ols/products/original-body-butter` | NEEDS VERIFICATION |
| Patchouli Face Cleansing Oil | `patchouli-face-cleansing-oil` | `/ols/products/patchouli-face-cleansing-oil` | NEEDS VERIFICATION |
| All in One Lavender Balm | `all-in-one-lavender-balm` | `/ols/products/all-in-one-lavender-balm` | NEEDS VERIFICATION |
| Trial Collection | `trial-collection` | `/ols/products/trial-collection` | NEEDS VERIFICATION |
| Geranium Lip Balm | `geranium-lip-balm` | `/ols/products/geranium-lip-balm` | NEEDS VERIFICATION |
| Rosewood Spoon | `rosewood-spoon` | `/ols/products/rosewood-spoon` | NEEDS VERIFICATION |

These candidate URLs are **not invented** — every one is copied character-for-character from `sitemap.ols.xml`, a file the live server itself returned. But per your explicit instruction not to treat a URL pattern as a working URL, none is marked verified, and none is wired into the site's code this phase. Resolving this needs exactly one thing: a real visit, in an ordinary browser, to a couple of these URLs — see §14.

## 8. Variant findings

`sitemap.ols.xml` lists exactly **one** URL per product group — one `body-oil` slug (covering both Calming and Uplifting), one `original-body-butter` slug (covering both Original and Calming), one `geranium-lip-balm` slug, one `trial-collection` slug. There is no second URL, query parameter, or fragment anywhere in the archive or your new evidence that identifies a specific fragrance or size variant. This strongly suggests variant selection happens through an in-page selector on GoDaddy's own product page, keyed to internal variant IDs that aren't exposed anywhere we can see. **No public/stable variant-identification mechanism was found for Body Oils, Body Butters, Geranium Lip Balm, or Trial Collection.** No variant ID was guessed, and none should be.

## 9. Quantity-transfer findings

No documented URL or query-parameter mechanism for pre-setting a quantity on a GoDaddy Online Store product or cart page was found anywhere in the archive, the PDF, or your new evidence. **Not verified.**

## 10. Architecture options

**Option A — Native GoDaddy commerce** (our frontend writes directly into GoDaddy's cart, then redirects to `/checkout`). Blocked: no verified cart-write mechanism exists (§6).

**Option B — Redirect to existing GoDaddy product/cart URL.** The most promising option in principle — it doesn't require any API, only a real link — but currently blocked because no individual product URL is verified to resolve for a real visitor (§7). This is one confirmation away from being safely implementable.

**Option C — Supported GoDaddy commerce API.** No confirmed public API for this use case was found; the one candidate (Commerce "Stores" API) has unconfirmed scope and would require the account owner's own API credentials regardless — which this project is explicitly not to create or expose (§5, §14).

**Option D — Keep the refurbished frontend as an informational/presentation layer**, with "Continue to checkout" pointing at the existing verified GoDaddy commerce flow. Immediately safe from a technical-risk standpoint, but weaker UX (a customer's locally-built selection isn't carried over — they'd be starting over on the live site). This is closest to what Phase 6 already built, minus an actual outbound link — and per your closing instruction, adding even that link is being left for explicit approval rather than implemented now.

## 11. Recommended architecture

**Stay on Option D as the interim state; treat Option B as the concrete next upgrade once §14's product-URL verification is done.** Option A and C both depend on integration points (a cart-write mechanism, an API with confirmed public scope + credentials) that are not verified to exist and are not this project's to create speculatively. Option B needs only one piece of missing information — real confirmation that the `/ols/products/{slug}` URLs resolve — and if they do, it becomes a small, low-risk change: real `<a href>` links to the live GoDaddy product pages, no API, no guessed parameters, no cart sync required at all (the customer picks their variant/quantity on GoDaddy's own page, which already verifiably works).

## 12. What is safe to implement (once approved)

- Once §14's product-URL check comes back positive: real links from each PDP (and optionally the cart line items) to the corresponding verified GoDaddy product page, opening in a new tab, clearly labeled (e.g., "Buy on our current site") so it's never mistaken for a fully-integrated local checkout.
- Updating the existing honest pending message (`lib/commerce/messages.ts`) to reference the now-verified `https://sukaya.com.au/checkout` destination, once there's an actual path that gets a customer there with their real selection intact.

## 13. What must remain disabled

- The local cart's own "Checkout" button — stays disabled exactly as Phase 6 left it. No verified way exists to carry `LocalCartAdapter`'s contents into GoDaddy's cart, so enabling it would either do nothing or land a customer on an empty/foreign checkout — both misleading.
- Any card/PayPal payment UI, order creation, shipping calculation, or tax calculation — all of this is already handled by the verified live GoDaddy checkout and is explicitly out of scope to rebuild.
- Any code that calls `online-store.api.godaddy.com` or guesses at the Commerce "Stores" API — neither is confirmed safe or appropriate for this use case.

## 14. Client decisions required

1. Can you (or someone with access) open two or three of the candidate product URLs in §7 in an ordinary browser and confirm whether they load a real product page? This single check resolves the biggest open blocker.
2. Does your GoDaddy plan include API/developer access, and if so, is the Commerce "Stores" API (`api.docs.commerce.godaddy.com`) actually about storefront cart/checkout, or is it a catalog/inventory-sync API for merchants? You have dashboard access this investigation doesn't — you're positioned to answer this directly, or to open a GoDaddy support ticket asking specifically "does Online Store support a public API for adding items to a customer's cart from an external website?"
3. If Option B is confirmed viable: are you comfortable with customers being routed to the current live GoDaddy product pages to complete a purchase, as an interim measure while a fuller integration (or replacement commerce platform) is decided?
4. If you want Option C pursued at all: that requires you to generate your own GoDaddy API credentials from your account and provide them — this project will not create or request credentials on your behalf.

## 15. Exact next implementation step

Do nothing to the checkout button or cart-sync code until #1 in §14 is answered. Once you confirm at least one `/ols/products/{slug}` URL resolves for a real visitor, the next implementation step is small and low-risk: add a verified, direct outbound link from that product's PDP to its real GoDaddy page, honestly labeled, with no cart-sync, no API call, and no change to `LocalCartAdapter`'s local architecture — Option B, exactly as scoped in §10–§12.

---

Stopping here per your instruction. Not implementing any GoDaddy handoff, cart sync, or payment integration until a supported and verified mechanism is established and explicitly approved.
