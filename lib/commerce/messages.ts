/**
 * Shared, honest microcopy for commerce states that don't have a real
 * backend behind them yet. Centralized so the same wording is used
 * everywhere the same state applies (PDP Buy Now, Cart Drawer checkout CTA)
 * rather than drifting across components — docs/phase-6-commerce-layer-
 * report.md §6.
 */

export const CHECKOUT_UNAVAILABLE_MESSAGE =
  "Checkout isn't connected yet — this site can't process real orders. See docs/commerce-investigation.md for what's needed before it can.";

export const CART_LOAD_ERROR_MESSAGE = "Something went wrong loading your cart.";

export const PRODUCT_UNAVAILABLE_MESSAGE = "This item is no longer available.";
