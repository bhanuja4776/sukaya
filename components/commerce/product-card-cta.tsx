"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/commerce/cart-context";
import { getPurchaseState, requiresSelectionBeforeCart } from "@/lib/commerce/purchasability";
import type { Product } from "@/content/products";

/**
 * Product Card's CTA — docs/phase-6-commerce-layer-report.md §4. Three real
 * states, no fake ones:
 * - Products needing a variant/size choice (Body Oils, Body Butters,
 *   Geranium Lip Balm) route to the PDP via a real link — never an assumed
 *   default variant.
 * - Products whose price/size isn't verified show the honest pending
 *   reason, not a button.
 * - Everything else is a real, working Add to Cart action against the
 *   local cart architecture (see lib/commerce/local-cart-adapter.ts).
 */
export function ProductCardCta({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  if (requiresSelectionBeforeCart(product)) {
    return (
      <Link
        href={`/shop/${product.slug}`}
        className="mt-3 inline-flex min-h-11 items-center text-label uppercase tracking-wide text-sage-700 hover:underline"
      >
        Select Options
      </Link>
    );
  }

  const state = getPurchaseState(product);
  if (state.status === "pending") {
    return (
      <span className="mt-3 inline-flex min-h-11 items-center text-label uppercase tracking-wide text-ink-600">
        {state.reason}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={async () => {
        await addItem({ slug: product.slug }, 1);
        setJustAdded(true);
        window.setTimeout(() => setJustAdded(false), 1500);
      }}
      aria-label={`Add ${product.name} to cart`}
      className="mt-3 inline-flex min-h-11 items-center text-label uppercase tracking-wide text-sage-700 transition-opacity duration-200 hover:underline motion-reduce:transition-none"
    >
      {justAdded ? "Added ✓" : "Add to Cart"}
    </button>
  );
}
