import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AwaitingAssetPlaceholder } from "@/components/ui/awaiting-asset-placeholder";
import type { Product } from "@/content/products";

/**
 * docs/component-system.md §3 — Product Card. Only verified fields
 * (docs/product-inventory.md): name, exact price string, category,
 * CTA. No rating/badge/urgency copy is invented.
 *
 * Not yet a link to a product page: PDPs are explicitly out of scope for
 * this phase (Phase 3B is homepage-only). Rather than link to a page that
 * doesn't exist, the CTA is a properly `disabled` button with a real
 * accessible label — honest about the pending state instead of faking a
 * navigable card. Swap to a link once product pages exist.
 *
 * Hover (`product-hover`, docs/motion-system.md §3.4) is implemented in
 * plain CSS via `group`/`group-hover`, not Framer Motion — this keeps the
 * card a Server Component (no client JS for a simple scale/opacity hover)
 * and the CTA is unconditionally visible on touch devices, matching the
 * pattern's documented mobile/reduced-motion fallback.
 */
export function ProductCard({ product }: { product: Product }) {
  const sizeSuffix = product.size !== "NEEDS VERIFICATION" ? ` — ${product.size}` : "";

  return (
    <div className="group overflow-hidden rounded-md bg-cream-0 shadow-rest transition-shadow duration-300 hover:shadow-hover">
      <div className="aspect-square overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={`${product.name}${sizeSuffix}`}
            width={600}
            height={600}
            loading="lazy"
            // These two source photos are documented low-resolution
            // placeholder-quality assets (docs/asset-inventory.md §1,
            // ~200–350px native). Next's optimizer generates a 2x/retina
            // srcset candidate from the given width/height that upscales
            // 6x+ past the source and fails; `unoptimized` serves the real
            // file at native resolution instead of masking the gap with a
            // request that 404s.
            unoptimized
            className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
          />
        ) : (
          <AwaitingAssetPlaceholder label={product.name} className="aspect-square rounded-none" />
        )}
      </div>

      <div className="p-4">
        <Badge variant="neutral" className="mb-2">
          {product.category}
        </Badge>
        <h3 className="text-heading-3 text-ink-900">{product.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-body font-semibold text-ink-900">{product.price.display}</span>
          {product.price.originalDisplay && (
            <>
              <span className="text-body-sm text-ink-600 line-through">
                {product.price.originalDisplay}
              </span>
              {product.price.saleLabel && <Badge variant="sage">{product.price.saleLabel}</Badge>}
            </>
          )}
        </div>
        <button
          type="button"
          disabled
          aria-label={`Add ${product.name} to cart — coming soon`}
          className="mt-3 inline-flex cursor-not-allowed text-label uppercase tracking-wide text-ink-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
