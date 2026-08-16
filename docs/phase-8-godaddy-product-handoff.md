# SUKAYA Phase 8 — Verified GoDaddy Product Handoff Report

**Status: Verified-URL commerce handoff implemented for 3 of 10 products (4 configurations). No payment processing, GoDaddy API integration, or new checkout was built. No product content or imagery was touched. Awaiting review.**

## Table

| Product | Variant | Verified GoDaddy URL | Purchase enabled |
|---|---|---|---|
| Body Oil | Calming Body Oil (CBO) | `https://sukaya.com.au/shop/ols/products/body-oil/v/CBO` | YES |
| Body Oil | Uplifting Body Oil (UBO) | `https://sukaya.com.au/shop/ols/products/body-oil/v/UBO` | YES |
| Original Body Butter | Original Body Butter | `https://sukaya.com.au/shop/ols/products/original-body-butter` | YES |
| Original Body Butter | Calming Body Butter | NOT VERIFIED | NO |
| Geranium Lip Balm | 5 ML | `https://sukaya.com.au/shop/ols/products/geranium-lip-balm` | YES |
| Geranium Lip Balm | 10 ML | NOT VERIFIED (price also still NEEDS VERIFICATION) | NO |
| Cleanser Exfoliator Mask – Pink Blush | — | NOT VERIFIED | NO |
| Super Fruits Face Elixir | — | NOT VERIFIED | NO |
| Berry Light Soothe Serum | — | NOT VERIFIED | NO |
| Patchouli Face Cleansing Oil | — | NOT VERIFIED | NO |
| All in One Lavender Balm | — | NOT VERIFIED | NO |
| Trial Collection | — | NOT VERIFIED | NO |
| Rosewood Spoon | — | NOT VERIFIED | NO |

## 1. Verified product URLs

Exactly the four URLs you supplied, copied into `content/product-commerce.ts` character-for-character — none constructed, guessed, or derived from a slug:

```
Body Oil — Calming Body Oil (CBO):  https://sukaya.com.au/shop/ols/products/body-oil/v/CBO
Body Oil — Uplifting Body Oil (UBO): https://sukaya.com.au/shop/ols/products/body-oil/v/UBO
Original Body Butter:                https://sukaya.com.au/shop/ols/products/original-body-butter
Geranium Lip Balm:                   https://sukaya.com.au/shop/ols/products/geranium-lip-balm
```

## 2. Variant mapping

- **Body Oil**: `CBO`/`UBO` are matched to the already-verified fragrance variant names in `content/product-details.ts` — "Calming Body Oil" and "Uplifting Body Oil" — because `CBO`/`UBO` are literally the first letters of those two exact, already-verified names, and Body Oil has no other variants they could plausibly refer to. This is a mechanical match against existing verified content, not a new guess, but it's called out explicitly here per your instruction not to silently assume what the initials mean.
- **Original Body Butter**: mapped only to the "Original Body Butter" variant. "Calming Body Butter" has no supplied URL and gets none invented — it stays on the standard "not yet available" treatment.
- **Geranium Lip Balm**: mapped only to the 5 ML size (`content/products.ts`: `sizeVariants[0]`, price verified at $5.99). 10 ML is deliberately left unmapped — see §8 for why this is enforced two independent ways, not just one.

## 3. Products still lacking URLs

Seven products (Cleanser Exfoliator Mask – Pink Blush, Super Fruits Face Elixir, Berry Light Soothe Serum, Patchouli Face Cleansing Oil, All in One Lavender Balm, Trial Collection, Rosewood Spoon) plus the two unmapped configurations above (Calming Body Butter, Geranium 10 ML) have no entry in `content/product-commerce.ts`. Nothing changed for them this phase — they keep the exact Phase 6 local-cart behavior (Add to Cart enabled where price+size are verified, honest pending state otherwise, Buy Now always disabled).

## 4. CTA architecture

`content/product-commerce.ts` exports `hasCommerceMapping(slug)` and `getCommerceUrl(slug, { variantName?, sizeLabel? })`. `components/products/product-detail-view.tsx` branches on `hasCommerceMapping(product.slug)`:

- **Handoff mode** (Body Oil, Original Body Butter, Geranium Lip Balm): the purchase-actions area becomes a single CTA, **"Continue to Shop"** — a neutral, functional label (not invented marketing copy; chosen from the brief's own suggested fallback wording since no source material provides brand-specific purchase-CTA copy). When the current selection has a verified URL and a verified price, it's a real `<a>` link to that exact URL (`Button` component's anchor mode, same visual treatment as every other primary button — no `href="#"`, no constructed URL). A caption underneath reads "You'll complete your purchase on our shop." — stating plainly that the purchase happens elsewhere, not inside this frontend, per your explicit instruction. When the selection isn't eligible (see §8), it's a real `disabled` `<button>` with the same label, plus "This option isn't available to purchase yet." — never a disabled-looking link that still navigates if clicked.
- **Local-cart mode** (the other 7 products): unchanged from Phase 6 — "Add to Cart" / "Buy Now" as before.
- The Quantity stepper is **omitted** in handoff mode. It fed `useCart().addItem`'s quantity argument in local-cart mode; the GoDaddy handoff doesn't accept a transferred quantity (`docs/phase-7-godaddy-integration-investigation.md` §9), so showing a stepper that does nothing would itself be a small dishonesty. The customer sets quantity on GoDaddy's own page.
- The Product Card grid needed no changes: Body Oil, Body Butter, and Geranium Lip Balm all already have `variants`/`sizeVariants`, so `ProductCardCta` (Phase 6) already routes them to the PDP via a real "Select Options" link rather than offering a direct add — that behavior is exactly right for handoff mode too, since a variant/size must be chosen before the correct verified URL can be resolved.

## 5. Local cart relationship

Chose **Option B for verified-URL products specifically** (not a blanket hybrid): where a verified GoDaddy URL exists, the local cart is not offered as an option at all for that product — no "Add to Cart," so there is nothing to conflate with the external link. Where no verified URL exists, the Phase 6 local cart stays exactly as it was (Option A) — it remains legitimate architecture for a future real provider integration, and nothing about it changed or was removed.

This was chosen over a strict hybrid (local cart *and* an external link on the same product) because that combination is exactly what your brief warned against: a customer could add Body Oil to the local cart, later find the local checkout disabled, and never notice the working external link — or add items to both and end up with two disconnected carts. Removing the local "Add to Cart" specifically where a real alternative exists is the version of "don't imply synchronization" that can't be misread.

One pre-existing, non-issue edge case: a visitor who added (say) Geranium Lip Balm to the local cart in a Phase 6 session, before this phase, will still see that line item in their cart drawer if they return — `CartLineItem` doesn't know or care whether its product has since gained a handoff mapping, it just renders the name/price/quantity from `content/products.ts` as always. The cart drawer's own checkout button was already disabled before this phase and stays disabled now, so this doesn't create a new false promise — it's the same "your local cart doesn't check out yet" state as everything else in it.

## 6. GoDaddy checkout relationship

Not touched, not rebuilt, not reimplemented. `https://sukaya.com.au/checkout` (verified, `docs/phase-7-godaddy-integration-investigation.md`) is reached the same way it always has been — by a customer navigating GoDaddy's own product page and using its own cart/checkout, which this phase links to but never talks to programmatically. No card form, no PayPal SDK, no order-creation call, no query parameters appended to any of the four verified URLs.

## 7. Security/accessibility

- **Same-tab navigation**, per your instruction to prefer it — no `target="_blank"`. `rel="noopener noreferrer"` is still applied as a standard defensive practice for any external-origin link, independent of tab behavior.
- Every enabled CTA has an explicit `aria-label` stating what it does and that it leaves for "our shop" (e.g., "Continue to shop to purchase Body Oil — Calming Body Oil — opens our shop").
- Every disabled CTA is a real `<button disabled>`, never a styled/disabled-looking `<a>` (an `<a>` with a `disabled` attribute is not actually inert in HTML — it would still navigate on click, which would be exactly the "misleading" outcome the brief prohibits). This was checked deliberately, not assumed.
- The visible caption under each CTA states in plain language whether the purchase happens elsewhere or isn't available yet — accessibility doesn't rely on the `aria-label` alone to communicate the destination.
- No change to the existing focus-trap, keyboard-navigation, or `prefers-reduced-motion` behavior verified in Phases 6–7 — confirmed by re-running the same checks (§ QC below).

## 8. What is verified

- The four URLs themselves, exactly as supplied.
- That `CBO`/`UBO` correspond to the two already-verified Body Oil fragrance names (by direct initials match, documented above).
- That Geranium Lip Balm 5 ML's price ($5.99) is verified (`content/products.ts`, unchanged since Phase 3A).
- **Two independent, redundant checks** keep Geranium's 10 ML non-purchasable: (1) `content/product-commerce.ts` simply has no entry for it, so `getCommerceUrl` returns `null`; (2) even if an entry existed, `isPriceVerifiedForHandoff` would still block it, because `sizeVariants[1].price === NEEDS_VERIFICATION`. Both would have to be wrong at once for this to slip through.

## 9. What remains unknown

Everything Phase 7 already flagged as unknown is still unknown — this phase didn't investigate further, only implemented what's now verified: the exact processor behind GoDaddy's Credit/Debit Card option, whether the Commerce "Stores" API is relevant here, and — most directly relevant to future work — the original product URLs for the other 7 products (Pink Blush, Super Fruits, Berry Light, Patchouli, Lavender Balm, Trial Collection, Rosewood Spoon) and Calming Body Butter / Geranium 10 ML specifically.

## 10. Recommended production architecture

Keep exactly this shape: `content/product-commerce.ts` as the single, append-only source of truth for verified handoff URLs; `hasCommerceMapping`/`getCommerceUrl` as the only way any component reads from it; the PDP's handoff-mode branch as the only place a customer is ever sent externally. When more product URLs are verified, they're added as new entries — no other code changes needed, and no product goes from "not purchasable" to "purchasable" without an explicit new verified URL landing in that one file. The Product Card / Shop grid needs no further changes as more mappings are added, for the same reason it needed none this phase: any product with variants already routes to its PDP first.

---

## QC results

- **`npm run lint`** — clean, 0 errors/warnings.
- **`npx tsc --noEmit`** — clean, 0 errors.
- **`npm run build`** — succeeds; all 17 routes generated, unchanged from Phase 7.
- **Browser QC** (Playwright, pre-installed Chromium, transient install removed afterward) — homepage, `/shop`, Body Oil (CBO and UBO fragrance selection), Original Body Butter (both variants — Original enabled, Calming honestly pending), Geranium Lip Balm (5 ML enabled, 10 ML honestly pending), mobile (390px) and desktop (1440px) viewports, keyboard navigation. Confirmed for every enabled CTA: the link's `href` is **exactly** the verified URL supplied in this phase (byte-for-byte compared, not just "looks right"); zero `href="#"` anywhere; zero constructed/guessed URLs; zero fake checkout; zero broken images; zero horizontal overflow; zero runtime/page errors. Confirmed the disabled CTAs (Calming Body Butter, Geranium 10 ML, and every non-mapped product) are real `disabled` buttons with no `href` at all. No real order was placed — every enabled link was verified by inspecting its resolved `href` attribute, not by following it through to GoDaddy's live checkout.
- **Regression**: local-cart mode (the 7 unaffected products) re-verified unchanged — Add to Cart, quantity, cart drawer open/close, focus trap, and the honestly-disabled local checkout CTA all behave exactly as in Phase 6/7.

---

Stopping here per your instruction. Not implementing payment processing, a GoDaddy API integration, or any further commerce URL beyond the four supplied this phase. Waiting for approval before any further commerce changes.
