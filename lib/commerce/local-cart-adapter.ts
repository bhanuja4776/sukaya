/**
 * LocalCartAdapter — Phase 6 (docs/phase-6-commerce-layer-report.md §3).
 *
 * COMMERCE BACKEND NOT YET CONNECTED.
 *
 * This is a development-safe implementation of `CommerceAdapter` that
 * manages a cart entirely in the visitor's own browser (localStorage). It
 * exists so the cart UI/architecture can be built and tested honestly
 * without pretending a real commerce backend is wired in — no order is
 * ever created anywhere else, no network request is made, and
 * `beginCheckout` always reports unavailable rather than redirecting
 * anywhere.
 *
 * The existing, verified commerce platform is GoDaddy Online Store
 * (docs/source-of-truth.md §A.10, docs/commerce-investigation.md Part 2
 * §1) — but its cart/checkout implementation is not accessible or
 * documented (docs/commerce-investigation.md items 1/5/6), so this adapter
 * does not attempt to reverse-engineer, scrape, or call it. When that
 * integration is verified, a new adapter implementing the same
 * `CommerceAdapter` interface replaces this one; no product/cart UI needs
 * to change.
 */

import type { Cart, CartLine, CommerceAdapter, CommerceProductRef, CommerceResult } from "./types";

const STORAGE_KEY = "sukaya-local-cart";

export function buildLineId(ref: CommerceProductRef): string {
  return [ref.slug, ref.variantName ?? "", ref.sizeLabel ?? ""].join("::");
}

function readCart(): Cart {
  if (typeof window === "undefined") return { lines: [] };
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return { lines: [] };
  const parsed = JSON.parse(raw) as Cart;
  if (!parsed || !Array.isArray(parsed.lines)) return { lines: [] };
  return parsed;
}

function writeCart(cart: Cart): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export class LocalCartAdapter implements CommerceAdapter {
  readonly name = "local-dev-cart";
  readonly connected = false;

  private ok(cart: Cart): CommerceResult<Cart> {
    return { status: "ok", data: cart };
  }

  private errorFrom(error: unknown): CommerceResult<never> {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unexpected cart error.",
    };
  }

  async getProduct(ref: CommerceProductRef): Promise<CommerceResult<CommerceProductRef>> {
    return { status: "ok", data: ref };
  }

  async getCart(): Promise<CommerceResult<Cart>> {
    try {
      return this.ok(readCart());
    } catch (error) {
      return this.errorFrom(error);
    }
  }

  async addToCart(ref: CommerceProductRef, quantity: number): Promise<CommerceResult<Cart>> {
    try {
      const cart = readCart();
      const lineId = buildLineId(ref);
      const existing = cart.lines.find((line) => line.lineId === lineId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        const newLine: CartLine = { ...ref, lineId, quantity };
        cart.lines.push(newLine);
      }
      writeCart(cart);
      return this.ok(cart);
    } catch (error) {
      return this.errorFrom(error);
    }
  }

  async updateCartItem(lineId: string, quantity: number): Promise<CommerceResult<Cart>> {
    try {
      const cart = readCart();
      if (quantity <= 0) {
        cart.lines = cart.lines.filter((line) => line.lineId !== lineId);
      } else {
        const line = cart.lines.find((candidate) => candidate.lineId === lineId);
        if (line) line.quantity = quantity;
      }
      writeCart(cart);
      return this.ok(cart);
    } catch (error) {
      return this.errorFrom(error);
    }
  }

  async removeFromCart(lineId: string): Promise<CommerceResult<Cart>> {
    try {
      const cart = readCart();
      cart.lines = cart.lines.filter((line) => line.lineId !== lineId);
      writeCart(cart);
      return this.ok(cart);
    } catch (error) {
      return this.errorFrom(error);
    }
  }

  async clearCart(): Promise<CommerceResult<Cart>> {
    try {
      const cart: Cart = { lines: [] };
      writeCart(cart);
      return this.ok(cart);
    } catch (error) {
      return this.errorFrom(error);
    }
  }

  async beginCheckout(): Promise<CommerceResult<never>> {
    return {
      status: "unavailable",
      message:
        "Checkout isn't connected yet — this site can't process real orders. See docs/commerce-investigation.md.",
    };
  }
}
