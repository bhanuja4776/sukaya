"use client";

import { useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { duration, easing } from "@/lib/motion";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useCart } from "@/components/commerce/cart-context";
import { CartLineItem } from "@/components/commerce/cart-line-item";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { CHECKOUT_UNAVAILABLE_MESSAGE } from "@/lib/commerce/messages";

/**
 * Cart drawer — docs/phase-6-commerce-layer-report.md §2/§7/§8. Same
 * slide-in-panel pattern as MobileNavDrawer (AnimatePresence + the
 * hand-rolled focus trap from hooks/use-focus-trap.ts), reused rather than
 * reinvented. Covers every required state: loading, error, empty, and
 * populated with an honestly-disabled checkout CTA — never a fake
 * destination (docs/commerce-investigation.md; no checkout URL exists to
 * link to).
 */
export function CartDrawer() {
  const { isOpen, closeCart, status, error, lines, subtotalDisplay, triggerRef } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isOpen, panelRef, triggerRef, closeCart);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            aria-hidden="true"
            onClick={closeCart}
            className="fixed inset-0 z-40 bg-ink-900/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base, ease: easing.standard }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream-50 shadow-float"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: duration.base, ease: easing.standard }}
          >
            <div className="flex items-center justify-between border-b border-sand-200 px-6 py-5">
              <h2 className="text-heading-3 text-ink-900">Your Cart</h2>
              <button
                type="button"
                onClick={closeCart}
                className="rounded-md p-2 text-ink-900 hover:bg-sage-100"
              >
                <VisuallyHidden>Close cart</VisuallyHidden>
                <svg
                  aria-hidden="true"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {error && <p className="mb-4 text-body-sm text-error">{error}</p>}

              {status === "loading" ? (
                <p className="text-body text-ink-600">Loading your cart…</p>
              ) : lines.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-16 text-center">
                  <p className="text-body text-ink-600">Your cart is empty.</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="text-label uppercase tracking-wide text-sage-700 hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <ul>
                  {lines.map((line) => (
                    <CartLineItem key={line.lineId} line={line} />
                  ))}
                </ul>
              )}
            </div>

            {status === "ready" && lines.length > 0 && (
              <div
                className="border-t border-sand-200 px-6 py-5"
                style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
              >
                <div className="mb-4 flex items-center justify-between text-body font-medium text-ink-900">
                  <span>Subtotal</span>
                  <span>{subtotalDisplay ?? "Price pending verification"}</span>
                </div>
                <Button
                  type="button"
                  variant="primary"
                  disabled
                  aria-label={`Checkout — ${CHECKOUT_UNAVAILABLE_MESSAGE}`}
                  className="w-full"
                >
                  Checkout — Coming Soon
                </Button>
                <p className="mt-3 text-body-sm text-ink-600">{CHECKOUT_UNAVAILABLE_MESSAGE}</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
