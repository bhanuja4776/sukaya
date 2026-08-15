/**
 * Commerce abstraction — Phase 6 (docs/phase-6-commerce-layer-report.md).
 *
 * This is the seam between the product UI and whatever actually processes
 * an order. Nothing in this file (or in local-cart-adapter.ts, its only
 * implementation right now) knows about GoDaddy Online Store, Stripe,
 * PayPal, or any other processor — none of those is established by the
 * source material (docs/commerce-investigation.md). A future adapter that
 * DOES connect to a verified backend implements this same interface, and
 * every component that calls `useCart()` keeps working unchanged.
 */

import type { ProductPrice } from "@/content/products";

/** Identifies one purchasable configuration of a product. */
export interface CommerceProductRef {
  slug: string;
  /** Fragrance/style variant name, where the product has one (Body Oils, Body Butters). */
  variantName?: string;
  /** Size-variant label, where the product has one (Geranium Lip Balm). */
  sizeLabel?: string;
}

export interface CartLine extends CommerceProductRef {
  lineId: string;
  quantity: number;
}

export interface Cart {
  lines: CartLine[];
}

/**
 * Every adapter method returns this shape rather than throwing or resolving
 * a bare value, so every call site is forced to handle "it's not connected"
 * and "something broke" as real, renderable states instead of an assumed
 * happy path.
 */
export type CommerceResult<T> =
  | { status: "ok"; data: T }
  | { status: "unavailable"; message: string }
  | { status: "error"; message: string };

/**
 * The conceptual pipeline this interface exists to support (docs/phase-6-
 * commerce-layer-report.md §1):
 *
 *   Product → Product selection → Commerce adapter → Cart → Checkout
 *   adapter → EXTERNAL/VERIFIED CHECKOUT
 *
 * `beginCheckout` is the handoff point to that external/verified checkout.
 * The only implementation of this interface right now (LocalCartAdapter)
 * always returns `status: "unavailable"` from it — see that file's header
 * comment for why, and docs/commerce-investigation.md for what's actually
 * known about the existing GoDaddy Online Store checkout.
 */
export interface CommerceAdapter {
  readonly name: string;
  /** False for every adapter until a real backend is verified and wired in. */
  readonly connected: boolean;

  getProduct(ref: CommerceProductRef): Promise<CommerceResult<CommerceProductRef>>;
  getCart(): Promise<CommerceResult<Cart>>;
  addToCart(ref: CommerceProductRef, quantity: number): Promise<CommerceResult<Cart>>;
  updateCartItem(lineId: string, quantity: number): Promise<CommerceResult<Cart>>;
  removeFromCart(lineId: string): Promise<CommerceResult<Cart>>;
  clearCart(): Promise<CommerceResult<Cart>>;
  beginCheckout(): Promise<CommerceResult<never>>;
}

export type { ProductPrice };
