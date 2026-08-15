"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, type EnrichedCartLine } from "@/components/commerce/cart-context";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { AwaitingAssetPlaceholder } from "@/components/ui/awaiting-asset-placeholder";
import { NEEDS_VERIFICATION } from "@/content/products";
import { PRODUCT_UNAVAILABLE_MESSAGE } from "@/lib/commerce/messages";

/**
 * One cart line — docs/phase-6-commerce-layer-report.md §2. Reads name/
 * image/price from `line` (already enriched from content/products.ts by
 * CartProvider) rather than looking anything up itself, so there's exactly
 * one place that resolves product data into a cart line.
 */
export function CartLineItem({ line }: { line: EnrichedCartLine }) {
  const { updateQuantity, removeItem } = useCart();

  const resolvedPrice =
    line.productExists && line.unitPrice !== null && line.unitPrice !== NEEDS_VERIFICATION
      ? line.unitPrice
      : null;
  const priceLabel = resolvedPrice ? resolvedPrice.display : "Price pending verification";
  const lineTotal = resolvedPrice ? `$${(resolvedPrice.amount * line.quantity).toFixed(2)}` : null;

  return (
    <li className="flex gap-4 border-b border-sand-200 py-4 last:border-b-0">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md">
        {line.image ? (
          <Image
            src={line.image}
            alt={line.displayName}
            width={160}
            height={160}
            unoptimized
            className="h-full w-full object-cover"
          />
        ) : (
          <AwaitingAssetPlaceholder className="aspect-square rounded-none" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1">
        {line.productExists ? (
          <Link
            href={`/shop/${line.slug}`}
            className="text-body font-medium text-ink-900 hover:text-sage-700"
          >
            {line.displayName}
          </Link>
        ) : (
          <span className="text-body font-medium text-ink-900">{line.displayName}</span>
        )}

        {line.sizeLabel && <span className="text-body-sm text-ink-600">{line.sizeLabel}</span>}

        {!line.productExists ? (
          <p className="text-body-sm text-error">{PRODUCT_UNAVAILABLE_MESSAGE}</p>
        ) : (
          <span className="text-body-sm text-ink-600">{priceLabel}</span>
        )}

        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          {line.productExists && (
            <QuantityStepper
              value={line.quantity}
              onChange={(next) => updateQuantity(line.lineId, next)}
              label={line.displayName}
            />
          )}
          <button
            type="button"
            onClick={() => removeItem(line.lineId)}
            aria-label={`Remove ${line.displayName} from cart`}
            className="min-h-11 text-label uppercase tracking-wide text-ink-600 underline-offset-2 hover:text-error hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      {lineTotal && (
        <span className="shrink-0 text-body-sm font-medium text-ink-900">{lineTotal}</span>
      )}
    </li>
  );
}
