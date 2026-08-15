import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { AwaitingAssetPlaceholder } from "@/components/ui/awaiting-asset-placeholder";
import { ProductCardCta } from "@/components/commerce/product-card-cta";
import type { Product } from "@/content/products";

/**
 * docs/component-system.md §3 — Product Card. Only verified fields
 * (docs/product-inventory.md): name, exact price string, category,
 * CTA. No rating/badge/urgency copy is invented.
 *
 * Links to its product detail page (Phase 4 built /shop/[slug]). The CTA
 * (`ProductCardCta`, Phase 6) is a separate client component kept as a
 * sibling of the link rather than nested inside it (an `<a>` wrapping a
 * `<button>` is invalid/inaccessible nesting) — extracting just the CTA
 * lets this card stay a Server Component.
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
      <Link href={`/shop/${product.slug}`} className="block">
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
              // 6x+ past the source and fails; `unoptimized` serves the
              // real file at native resolution instead of masking the gap
              // with a request that 404s.
              unoptimized
              className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
            />
          ) : (
            <AwaitingAssetPlaceholder label={product.name} className="aspect-square rounded-none" />
          )}
        </div>

        <div className="px-4 pt-4">
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
        </div>
      </Link>
      <div className="px-4 pb-4">
        <ProductCardCta product={product} />
      </div>
    </div>
  );
}
