"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Accordion, type AccordionItemData } from "@/components/ui/accordion";
import { AwaitingAssetPlaceholder } from "@/components/ui/awaiting-asset-placeholder";
import { ImageReveal } from "@/components/motion/image-reveal";
import { FadeUp } from "@/components/motion/fade-up";
import type { Product } from "@/content/products";
import { NEEDS_VERIFICATION } from "@/content/products";
import type { ProductDetail, ProductDetailEntry } from "@/content/product-details";
import { cn } from "@/lib/utils";

/**
 * Product Detail Page architecture — docs/ux-architecture.md §6,
 * docs/component-system.md. Built so a missing image, missing size/price,
 * or missing long-form content slots in cleanly without redesigning this
 * component: every optional field is checked and simply omitted from the
 * render when absent, rather than the layout assuming it's always there.
 */
export function ProductDetailView({
  product,
  detailEntry,
}: {
  product: Product;
  detailEntry: ProductDetailEntry | undefined;
}) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const hasVariants = !!detailEntry?.variantDetails?.length;
  const activeDetail: ProductDetail | undefined = hasVariants
    ? detailEntry!.variantDetails![variantIndex].detail
    : detailEntry?.details;

  const activeSizeVariant = product.sizeVariants?.[sizeIndex];
  const displayPrice = activeSizeVariant ? activeSizeVariant.price : product.price;

  return (
    <Container width="wide" className="py-10 desktop:py-16">
      <Breadcrumb
        items={[
          { label: "Shop", href: "/shop" },
          { label: product.category, href: `/shop?category=${encodeURIComponent(product.category)}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 flex flex-col gap-10 desktop:flex-row desktop:items-start desktop:gap-16">
        {/* Image — sticky on desktop */}
        <div className="desktop:sticky desktop:top-28 desktop:w-1/2">
          <ImageReveal className="overflow-hidden rounded-lg shadow-float">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={800}
                height={800}
                unoptimized
                priority
                className="h-auto w-full object-cover"
              />
            ) : (
              <AwaitingAssetPlaceholder label={product.name} className="aspect-square rounded-none" />
            )}
          </ImageReveal>
        </div>

        {/* Purchase + info column */}
        <FadeUp className="desktop:w-1/2">
          <Badge variant="neutral">{product.category}</Badge>
          <h1 className="mt-3 text-heading-1 text-ink-900">{product.name}</h1>

          {displayPrice === NEEDS_VERIFICATION ? (
            <p className="mt-2 text-body-lg text-ink-600">Price pending verification</p>
          ) : (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-heading-2 text-ink-900">{displayPrice.display}</span>
              {product.price.originalDisplay && !activeSizeVariant && (
                <>
                  <span className="text-body text-ink-600 line-through">
                    {product.price.originalDisplay}
                  </span>
                  {product.price.saleLabel && <Badge variant="sage">{product.price.saleLabel}</Badge>}
                </>
              )}
            </div>
          )}

          {product.size !== NEEDS_VERIFICATION && !product.sizeVariants && (
            <p className="mt-1 text-body-sm text-ink-600">{product.size}</p>
          )}
          {product.size === NEEDS_VERIFICATION && (
            <p className="mt-1 text-body-sm text-ink-600">Size pending verification</p>
          )}

          {/* Fragrance/variant selector */}
          {hasVariants && (
            <div className="mt-6">
              <span className="text-label uppercase tracking-wide text-ink-600">Fragrance</span>
              <div role="group" aria-label="Select fragrance" className="mt-2 flex flex-wrap gap-2">
                {detailEntry!.variantDetails!.map((variant, index) => (
                  <SelectorPill
                    key={variant.variantName}
                    active={index === variantIndex}
                    onClick={() => setVariantIndex(index)}
                  >
                    {variant.variantName}
                  </SelectorPill>
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {product.sizeVariants && (
            <div className="mt-6">
              <span className="text-label uppercase tracking-wide text-ink-600">Size</span>
              <div role="group" aria-label="Select size" className="mt-2 flex flex-wrap gap-2">
                {product.sizeVariants.map((variant, index) => (
                  <SelectorPill
                    key={variant.label}
                    active={index === sizeIndex}
                    onClick={() => setSizeIndex(index)}
                  >
                    {variant.label}
                  </SelectorPill>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6">
            <span className="text-label uppercase tracking-wide text-ink-600">Quantity</span>
            <div className="mt-2 inline-flex items-center rounded-pill border border-sand-200">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                aria-label="Decrease quantity"
                className="flex h-11 w-11 items-center justify-center text-ink-900 hover:bg-sage-100"
              >
                –
              </button>
              <span aria-live="polite" className="min-w-8 text-center text-body text-ink-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                aria-label="Increase quantity"
                className="flex h-11 w-11 items-center justify-center text-ink-900 hover:bg-sage-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Purchase actions — disabled, honest: no checkout built yet */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              type="button"
              variant="primary"
              disabled
              aria-label={`Buy ${product.name} now — coming soon`}
            >
              Buy Now
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled
              aria-label={`Add ${product.name} to cart — coming soon`}
            >
              Add to Cart
            </Button>
          </div>

          {/* Tagline + description */}
          {activeDetail?.tagline && (
            <p className="mt-8 text-heading-3 text-sage-700">{activeDetail.tagline}</p>
          )}
          {activeDetail?.description && (
            <p className="mt-3 text-body text-ink-600">{activeDetail.description}</p>
          )}

          {activeDetail?.benefits && activeDetail.benefits.length > 0 && (
            <div className="mt-6">
              <h2 className="text-heading-3 text-ink-900">
                {activeDetail.benefitsHeading ?? "What It Does"}
              </h2>
              <ul className="mt-2 list-inside list-disc space-y-1 text-body text-ink-600">
                {activeDetail.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {(activeDetail?.skinType || activeDetail?.aromaAndTexture) && (
            <dl className="mt-6 space-y-3 border-t border-sand-200 pt-6">
              {activeDetail?.skinType && (
                <div>
                  <dt className="text-label uppercase tracking-wide text-ink-600">Skin Type</dt>
                  <dd className="mt-1 text-body text-ink-900">{activeDetail.skinType}</dd>
                </div>
              )}
              {activeDetail?.aromaAndTexture && (
                <div>
                  <dt className="text-label uppercase tracking-wide text-ink-600">Aroma & Texture</dt>
                  <dd className="mt-1 text-body text-ink-900">{activeDetail.aromaAndTexture}</dd>
                </div>
              )}
            </dl>
          )}

          {/* Ingredients / How to Use / Safety Notes — accordion on all sizes */}
          {activeDetail && <DetailAccordion detail={activeDetail} />}

          {/* Trial Collection bundle contents */}
          {detailEntry?.bundleContents && (
            <BundleContents note={detailEntry.bundleNote} items={detailEntry.bundleContents} />
          )}
        </FadeUp>
      </div>
    </Container>
  );
}

function DetailAccordion({ detail }: { detail: ProductDetail }) {
  const items: AccordionItemData[] = [];

  if (detail.ingredients?.length) {
    items.push({
      title: "Ingredients",
      content: (
        <ul className="space-y-2">
          {detail.ingredients.map((ingredient) => (
            <li key={ingredient.name}>
              <span className="font-medium text-ink-900">{ingredient.name}</span> – {ingredient.benefit}
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (detail.howToUse) {
    items.push({ title: "How to Use", content: <p>{detail.howToUse}</p> });
  }

  if (detail.safetyNotes) {
    items.push({ title: "Safety Notes", content: <p>{detail.safetyNotes}</p> });
  }

  if (items.length === 0) return null;

  return (
    <div className="mt-6">
      <Accordion items={items} />
    </div>
  );
}

const BUNDLE_SLUG_MAP: Record<string, string> = {
  "Pink Blush - Cleanser Exfoliator Mask": "cleanser-exfoliator-mask---pink-blush",
  "Berry Light Soothe Serum": "berry-light-soothe-serum",
  "Super Fruits Face Elixir": "super-fruits-face-elixir",
  "Original Body Butter": "original-body-butter",
};

function BundleContents({
  note,
  items,
}: {
  note?: string;
  items: { name: string; blurb: string }[];
}) {
  return (
    <div className="mt-8 border-t border-sand-200 pt-6">
      {note && <p className="text-body text-ink-600">{note}</p>}
      <h2 className="mt-4 text-heading-3 text-ink-900">This set contains</h2>
      <ul className="mt-3 space-y-4">
        {items.map((item) => {
          const slug = BUNDLE_SLUG_MAP[item.name];
          return (
            <li key={item.name}>
              {slug ? (
                <Link href={`/shop/${slug}`} className="font-medium text-sage-700 underline">
                  {item.name}
                </Link>
              ) : (
                <span className="font-medium text-ink-900">{item.name}</span>
              )}
              <p className="mt-1 text-body-sm text-ink-600">{item.blurb}</p>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-body-sm text-ink-600">
        For detailed description and list of ingredients please refer to individual products.
      </p>
    </div>
  );
}

function SelectorPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-pill border px-4 py-2 text-body-sm transition-colors duration-200",
        active
          ? "border-sage-700 bg-sage-700 text-cream-0"
          : "border-sand-200 bg-transparent text-ink-900 hover:border-sage-500",
      )}
    >
      {children}
    </button>
  );
}
