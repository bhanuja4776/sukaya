# SUKAYA Phase 6 — Commerce Layer + Cart Architecture Report

**Status: Provider-agnostic cart architecture implemented and verified (lint/typecheck/build/runtime all pass). No payment provider selected. No checkout implemented. Awaiting review.**

## 0. Source material used

Re-read before building: `docs/source-of-truth.md`, `docs/product-inventory.md`, `docs/asset-inventory.md`, `docs/website-architecture.md`, `docs/commerce-investigation.md`, `docs/design-system.md`, `docs/ux-architecture.md`, `docs/motion-system.md`, `docs/component-system.md`, `docs/phase-4-product-experience-report.md`, `content/products.ts`, `content/product-details.ts`. (`docs/phase-5-commerce-investigation.md`, named in the brief, doesn't exist as a separate file — the Phase 5 deliverable was written to `docs/commerce-investigation.md`; that's the file used throughout.)

## 1. Commerce architecture

```
Product (content/products.ts)
  ↓
Product selection (variant / size — Product Card or PDP)
  ↓
Commerce adapter (lib/commerce/types.ts — CommerceAdapter interface)
  ↓
Cart (components/commerce/cart-context.tsx — React state over the adapter)
  ↓
Checkout adapter (adapter.beginCheckout())
  ↓
EXTERNAL/VERIFIED CHECKOUT — not connected (docs/commerce-investigation.md)
```

Every UI component (`ProductCardCta`, `ProductDetailView`, `CartDrawer`, `CartLineItem`) talks only to `useCart()`, which talks only to a `CommerceAdapter`. Nothing above that line knows what backend is behind it. The only implementation right now, `LocalCartAdapter` (`lib/commerce/local-cart-adapter.ts`), keeps the cart in the visitor's own browser (`localStorage`) and never contacts any network endpoint. Swapping in a real backend later — the verified GoDaddy Online Store, or something else the client specifies — means writing one new class that implements `CommerceAdapter` and changing one line where `CartProvider` constructs it; no product/cart UI changes.

## 2. Cart architecture

- **State layer**: `components/commerce/cart-context.tsx` — a `CartProvider` wraps the whole app (`app/layout.tsx`) and exposes `useCart()`. It holds the raw cart (`{ lines: [] }`) from the adapter and enriches each line with live data from `content/products.ts` at render time (name, image, category, unit price) — see §7 (Data safety) for why this matters.
- **Cart trigger**: `components/commerce/cart-trigger.tsx` — header icon button, item-count badge (only shown once the cart has finished its client-only load, so it never flashes "0").
- **Cart drawer**: `components/commerce/cart-drawer.tsx` — slide-in panel from the right, same `AnimatePresence` + focus-trap pattern as the existing `MobileNavDrawer` (Phase 3B), not reinvented.
- **Line item**: `components/commerce/cart-line-item.tsx` — image or `AwaitingAssetPlaceholder`, name (links to the PDP), size/variant label, unit price, `QuantityStepper`, Remove button, line total.
- **Quantity control**: extracted into `components/ui/quantity-stepper.tsx`, shared by the PDP purchase panel and every cart line — the two places quantity ever gets picked, one implementation.
- **Subtotal**: computed in `CartProvider` from real `content/products.ts` prices only. If any line's price can't be resolved (defensive — see §6), the subtotal renders "Price pending verification" instead of a partial/fabricated number.
- **Checkout CTA**: `Button` with `disabled`, label "Checkout — Coming Soon", plus a static caption underneath — see §6.
- **Empty state**: centered message + a real `Link` to `/shop` (not a dead-end).

## 3. Commerce adapter

`lib/commerce/types.ts` defines `CommerceAdapter`: `getProduct`, `getCart`, `addToCart`, `updateCartItem`, `removeFromCart`, `clearCart`, `beginCheckout` — every call returns a `CommerceResult<T>` (`status: "ok" | "unavailable" | "error"`), so every call site is forced to handle "not connected" and "something broke" as real states rather than an assumed happy path.

`lib/commerce/local-cart-adapter.ts` (`LocalCartAdapter`) is the only implementation:
- `connected = false` — a literal, explicit flag, not a comment.
- Cart lines live in `localStorage` under `sukaya-local-cart`, keyed by `slug::variantName::sizeLabel`.
- `addToCart` / `updateCartItem` / `removeFromCart` / `clearCart` genuinely work — this is real local cart state, not a mock that no-ops.
- `beginCheckout()` **always** returns `{ status: "unavailable", message: "Checkout isn't connected yet…" }`. It never redirects, never simulates success, and doesn't call any external endpoint (no GoDaddy Online Store URL, no invented API, no credentials) — see §12 for what would actually replace this.

This is the "development-safe implementation" the brief asked for: it lets the cart architecture be built and tested honestly, with nothing pretending to be a production checkout.

## 4. Product purchase states

`lib/commerce/purchasability.ts` is the single function (`getPurchaseState`) every "Add to Cart" control calls — Product Card and PDP alike — so the rule lives in exactly one place. Rule: a product/size configuration is purchasable only if the data a customer would need to buy it is itself verified — price always, and size wherever the product model records one (missing photography is **not** a blocker; that gap was already reviewed and accepted in Phase 3A/4 via `AwaitingAssetPlaceholder`, and this phase doesn't relitigate it).

Reviewed all 10 products against that rule:

| Product | Purchasable? | Why |
|---|---|---|
| Cleanser Exfoliator Mask – Pink Blush | Yes | price + size verified |
| Super Fruits Face Elixir | Yes | price + size verified |
| Berry Light Soothe Serum | Yes | price + size verified |
| Body Oils (both fragrance variants) | **No** | size NEEDS VERIFICATION |
| Body Butters (both fragrance variants) | Yes | price + size (80 ml) verified |
| Patchouli Face Cleansing Oil | Yes | price + size verified |
| All in One Lavender Balm | Yes | price + size verified |
| Trial Collection | **No** | size NEEDS VERIFICATION |
| Geranium Lip Balm — 5 ML | Yes | price ($5.99) verified |
| Geranium Lip Balm — 10 ML | **No** | price NEEDS VERIFICATION |
| Rosewood Spoon | **No** | size NEEDS VERIFICATION |

Where a product isn't purchasable, "Add to Cart" is a real `disabled` button whose `aria-label` states the exact reason ("… — Size pending verification" / "… — Price pending verification") — never hidden, never a guessed value.

"Buy Now" is **always** disabled, on every product, regardless of the table above — see §6. It implies going straight to checkout, and no checkout exists to go to.

## 5. Variant handling

Reused the exact three product shapes Phase 4 already established — no new variant types created:

- **Single-config products** (7 of 10): `getPurchaseState(product)`, no selection needed.
- **Fragrance variants** (Body Oils, Body Butters — `product.variants` + `detailEntry.variantDetails`): the PDP's existing variant selector now feeds `variantName` into the cart line. Fragrance choice doesn't change price/size verification status — Body Oils stays blocked on every variant, Body Butters is purchasable on every variant.
- **Size variants** (Geranium Lip Balm — `product.sizeVariants`): `getPurchaseState(product, sizeLabel)` evaluates the *selected* size independently. 5 ML is purchasable; 10 ML shows "Price pending verification" and stays non-purchasable, exactly as the brief's own example specifies.
- **Product Card** (no PDP context to pick a variant): for anything with `variants` or `sizeVariants`, the card's CTA is a real `Link` to the PDP labeled "Select Options" — it never guesses a default fragrance or size to add directly.
- **Trial Collection / bundle**: unchanged bundle-contents rendering from Phase 4; its own Add to Cart follows the same single-config rule (blocked — size unverified).

No price was invented for any missing variant.

## 6. Pending / unknown states

Every state the brief listed is implemented and distinguishable:

| State | Where | How it reads |
|---|---|---|
| Commerce/checkout unavailable | PDP caption + Cart Drawer footer | "Checkout isn't connected yet — this site can't process real orders. See docs/commerce-investigation.md…" (`lib/commerce/messages.ts`, one shared string) |
| Product unavailable | Cart line item | If a cart line's slug no longer resolves in `content/products.ts`, the line shows "This item is no longer available." with only a Remove action |
| Price pending verification | PDP, Product Card, Cart line | Exact phrase, never a number |
| Variant/size pending verification | PDP (size selector area), Product Card | "Size pending verification" |
| Empty cart | Cart Drawer | Centered message + Continue Shopping link |
| Loading | Cart Drawer | "Loading your cart…" while the adapter's first `getCart()` resolves (client-only, localStorage) |
| Error | Cart Drawer | If the adapter's `localStorage` read/write throws, `CartProvider` surfaces "Something went wrong loading your cart." rather than silently swallowing it |

No button anywhere links to `#`, no invented checkout URL exists, and no "success" state was built for an order that can't actually be placed.

## 7. Accessibility

- Cart trigger: `aria-haspopup="dialog"`, `VisuallyHidden` label stating the live item count.
- Cart Drawer: `role="dialog"`, `aria-modal="true"`, `aria-label="Your cart"`, reuses `hooks/use-focus-trap.ts` (Tab/Shift+Tab cycling, Escape to close, focus returns to the trigger on close).
- **Real bug found and fixed this phase**: the focus trap's `FOCUSABLE_SELECTOR` included a bare `[tabindex]:not([tabindex="-1"])` clause. Motion's `motion.button` (`components/ui/button.tsx`) renders `tabindex="0"` even on a `disabled` button, so the disabled Checkout button was still being treated as focusable — Tab would walk into it, then fall out of the drawer entirely into the page behind it instead of wrapping. Fixed by tightening the clause to `[tabindex]:not([tabindex="-1"]):not([disabled])` in `hooks/use-focus-trap.ts`, with a comment explaining why. This is a shared hook, so `MobileNavDrawer` benefits too (it had no disabled focusable elements before, so the bug never manifested there — this is a strict fix, not a behavior change for it).
- Quantity stepper: labeled `Increase/Decrease quantity of {name}` buttons, `aria-live="polite"` count, decrement disabled (not hidden) at the minimum.
- Remove button: `aria-label="Remove {name} from cart"`, 44px minimum target.
- Cart updates are announced via one shared `aria-live="polite"` region in `CartProvider` ("Added X to cart.", "Cart quantity updated.", "Item removed from cart.") — not left to animation alone to communicate state changes.
- All interactive controls meet the 44px minimum touch target already established by `components/ui/button.tsx` and the Phase 4 selector pattern; the shared `:focus-visible` ring (`styles/globals.css`) is untouched and applies here too.

## 8. Mobile behaviour

Verified at 390×844: drawer is `w-full` capped at `max-w-md`, so it never exceeds the viewport; no horizontal overflow with the drawer open on `/shop`; quantity/remove controls meet touch-target size; the checkout footer's bottom padding uses `max(1.25rem, env(safe-area-inset-bottom))` so it clears a device's home-indicator area. No text inputs exist in the cart, so on-screen-keyboard interaction isn't a factor here.

## 9. Motion

Reused Phase 3B's existing tokens (`lib/motion.ts`) and the `MobileNavDrawer` pattern exactly — no new motion primitives:
- Drawer open/close: overlay fade + panel slide, `duration.base` / `easing.standard`, identical to the mobile nav drawer.
- Quantity change / Add-to-Cart confirmation: a plain text swap ("Add to Cart" ↔ "Added ✓"), not a flashy transition — kept deliberately restrained per the brief's "avoid flashy effects" instruction.
- Respects `prefers-reduced-motion` the same way everything else in the app does: `MotionConfig reducedMotion="user"` (global, `app/layout.tsx`) plus the CSS-level fallback in `styles/globals.css`. Verified directly in QC with `page.emulateMedia({ reducedMotion: "reduce" })` — the cart still opens and functions correctly.

## 10. Favicon fix

`/favicon.ico` 404'd because no icon file existed anywhere in the project (confirmed pre-existing and site-wide in Phase 5 QC, not something this phase introduced). Fixed using Next's file-convention icon (`node_modules/next/dist/docs/01-app/.../app-icons.md` — `.jpg` is a supported `icon` file type, just not for the literal `favicon.ico` name): copied the existing, already-verified `public/images/brand/sukaya-logo.jpg` (recovered original, `docs/asset-inventory.md` §1) to `app/icon.jpg` — a straight file copy, no new image generated. Build output confirms `○ /icon.jpg` is produced and served; QC confirmed `GET /icon.jpg → 200`.

**Caveat worth flagging**: the live site's own `<link rel="apple-touch-icon">` tags point to a square-cropped version of this same logo (`img1.wsimg.com/isteam/ip/.../d6e7e453-....jpeg`), but that specific cropped file was never downloaded into the preserved archive — only the URL reference exists (`raw/html/sukaya.com.au.html`). Rather than generate a new crop myself (which would be creating a derived asset not present in the verified source material), this phase uses the full existing logo file as-is. If the client can supply that exact square crop later, it's a one-file swap.

## 11. What remains unimplemented

Exactly what the brief said not to build, and nothing more:
- Payment processing of any kind — no Stripe, PayPal, Shopify, Square, Afterpay, or GoDaddy payment integration, referenced or implied anywhere in code.
- Real order creation, order history, customer accounts.
- Credit card / payment-detail collection.
- Shipping and tax calculation (none is evidenced by the source material — `docs/commerce-investigation.md` items 7/8).
- Any connection, scraping, or reverse-engineering of the existing GoDaddy Online Store cart/checkout/API.
- `beginCheckout()` exists on the adapter interface and is implemented, but is never reachable from the UI (the only button that would call it is permanently `disabled`).

## 12. Exact information required before real checkout integration

Directly from `docs/commerce-investigation.md` Part 2 §9, restated here because it's the literal blocker for the next phase:

1. What currently powers checkout/payment on sukaya.com.au today (provider name, hosted vs. embedded)?
2. Should the rebuilt site link out to the existing live GoDaddy Online Store checkout, or should a new cart/checkout be built from scratch?
3. If new: which payment processor?
4. Real shipping rates/carriers/timeframes (none are published on the live site today).
5. Is there a Return and Refund Policy to publish, or does that heading keep shipping with no body text?
6. Confirmation that `/ols/products/{slug}` URLs actually resolve for a real visitor (the archive crawler got 404/429 on all of them; unresolved whether that's a crawler limitation or a real break).

Until those are answered, `LocalCartAdapter` stays the only adapter, and `beginCheckout()` stays honestly unavailable.

## QC results

- **`npm run lint`** — clean, 0 errors/warnings (one real error — a React Compiler "ref accessed during render" violation in the first draft of `CartProvider` — was fixed by replacing a `useRef`-based lazy singleton with `useState(() => new LocalCartAdapter())`).
- **`npx tsc --noEmit`** — clean, 0 errors (one real type error — `ProductPrice | typeof NEEDS_VERIFICATION` not narrowing through a boolean flag in `CartLineItem` — fixed by narrowing through a single `resolvedPrice` variable instead).
- **`npm run build`** — succeeds; 17 routes generated including the new `/icon.jpg`.
- **Browser QC** (Playwright, pre-installed Chromium, transient install removed afterward) — covered every item the brief listed: homepage cart trigger, PDP add-to-cart (purchasable and pending products), variant selection (Body Oils fragrance, Geranium size), cart open/close (click, Escape, overlay), quantity increase/decrease and recalculated subtotal, remove item → empty state, pending/unavailable states, checkout CTA (confirmed disabled, no `href="#"`, honest message present), mobile cart (390px, no overflow, drawer fits viewport), desktop cart, keyboard navigation (Tab cycling caught the focus-trap bug in §7, verified fixed), `prefers-reduced-motion`. Final run: **0 failures.** Broken-image/overflow sweep across `/`, `/shop`, and three representative PDPs at 390px and 1440px: 0 broken images, 0 overflow, 0 page errors (using the project's established real-incremental-scroll methodology for `loading="lazy"` images).
- **No fake checkout destination** — confirmed zero `href="#"` in the cart drawer; the Checkout button is a genuinely `disabled` `<button>`, not a styled link.
- **No fabricated product data** — confirmed cart line prices exactly match `content/products.ts` (e.g., $26.99 → $53.98 at quantity 2), and the subtotal is computed from that same source, not duplicated or invented.

---

Stopping here per your instruction. Not implementing real checkout or selecting a payment provider until explicitly asked.
