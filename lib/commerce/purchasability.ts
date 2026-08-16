/**
 * Single source of truth for "can this be added to the cart" — Phase 6
 * (docs/phase-6-commerce-layer-report.md §4/§5). Reads only the existing,
 * already-verified content layer (content/products.ts); nothing here
 * invents a price or size.
 *
 * Rule: a specific product/size configuration is purchasable only if the
 * data a customer would need to make that purchase is itself verified —
 * price always, and size where the product model records one. This blocks
 * exactly the combinations that already carry a NEEDS_VERIFICATION
 * sentinel: Body Oils (size), Trial Collection (size), Rosewood Spoon
 * (size), and the Geranium Lip Balm 10 ML size variant (price) — see
 * docs/verification-checklist.md and docs/commerce-investigation.md.
 * Missing photography is deliberately NOT a purchase blocker here: that gap
 * was already reviewed and accepted in Phase 3A/4 (docs/asset-inventory.md)
 * as a known, non-blocking state represented by AwaitingAssetPlaceholder —
 * this phase doesn't relitigate that decision.
 */

import { NEEDS_VERIFICATION, type Product, type ProductPrice } from "@/content/products";

export type PurchaseState =
  | { status: "purchasable" }
  | { status: "pending"; reason: string };

/**
 * Evaluates one purchasable configuration of a product. Pass `sizeLabel`
 * for products with `sizeVariants` (currently only Geranium Lip Balm) —
 * omit it for everything else, since fragrance `variants` (Body Oils, Body
 * Butters) don't carry their own price/size and don't change this result.
 */
export function getPurchaseState(product: Product, sizeLabel?: string): PurchaseState {
  if (product.sizeVariants) {
    const variant = sizeLabel
      ? product.sizeVariants.find((candidate) => candidate.label === sizeLabel)
      : product.sizeVariants[0];

    if (!variant) return { status: "pending", reason: "Select a size" };
    if (variant.price === NEEDS_VERIFICATION) {
      return { status: "pending", reason: "Price pending verification" };
    }
    return { status: "purchasable" };
  }

  if (product.size === NEEDS_VERIFICATION) {
    return { status: "pending", reason: "Size pending verification" };
  }

  return { status: "purchasable" };
}

/**
 * True for products where a fragrance/style variant or a size variant must
 * be chosen before "Add to Cart" makes sense (Body Oils, Body Butters,
 * Geranium Lip Balm) — the Product Card routes these to the PDP instead of
 * guessing a default.
 */
export function requiresSelectionBeforeCart(product: Product): boolean {
  return Boolean(product.variants?.length || product.sizeVariants?.length);
}

/** Resolves the real unit price for a line, without duplicating it anywhere. */
export function getUnitPrice(
  product: Product,
  sizeLabel?: string,
): ProductPrice | typeof NEEDS_VERIFICATION {
  if (product.sizeVariants) {
    const variant = sizeLabel
      ? product.sizeVariants.find((candidate) => candidate.label === sizeLabel)
      : product.sizeVariants[0];
    return variant ? variant.price : NEEDS_VERIFICATION;
  }
  return product.price;
}

/**
 * Looser than `getPurchaseState` — used only by the Phase 8 GoDaddy handoff
 * CTA (docs/phase-8-godaddy-product-handoff.md), which links to a page
 * GoDaddy itself renders. An unverified `size` doesn't block the handoff
 * there, because the customer sees GoDaddy's own correct size on that page
 * (this is why Body Oil, whose `size` is NEEDS_VERIFICATION, can still get
 * a working handoff link). An unverified *price* still blocks it, exactly
 * like `getPurchaseState` — this project has never implied a price it
 * hasn't verified, and an enabled link is exactly that kind of implication
 * (this is why Geranium Lip Balm's 10 ML stays blocked).
 */
export function isPriceVerifiedForHandoff(product: Product, sizeLabel?: string): boolean {
  return getUnitPrice(product, sizeLabel) !== NEEDS_VERIFICATION;
}
