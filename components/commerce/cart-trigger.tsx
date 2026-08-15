"use client";

import { useCart } from "@/components/commerce/cart-context";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

/**
 * Cart trigger — header icon button. Count badge only renders once the
 * cart has finished its initial (client-only) load, so it never flashes a
 * "0" before localStorage has been read (docs/phase-6-commerce-layer-
 * report.md §2).
 */
export function CartTrigger() {
  const { itemCount, status, openCart, triggerRef } = useCart();
  const showCount = status === "ready" && itemCount > 0;

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={openCart}
      aria-haspopup="dialog"
      className="relative rounded-md p-2 text-ink-900 hover:bg-sage-100"
    >
      <VisuallyHidden>
        {showCount ? `Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}` : "Open cart"}
      </VisuallyHidden>
      <svg
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M6 8h12l-1 12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1L6 8Z" />
        <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      </svg>
      {showCount && (
        <span
          aria-hidden="true"
          className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-pill bg-sage-700 px-1 text-[11px] font-medium text-cream-0"
        >
          {itemCount}
        </span>
      )}
    </button>
  );
}
