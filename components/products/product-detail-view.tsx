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
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { ImageReveal } from "@/components/motion/image-reveal";
import { FadeUp } from "@/components/motion/fade-up";
import { useCart } from "@/components/commerce/cart-context";
import { getPurchaseState, isPriceVerifiedForHandoff } from "@/lib/commerce/purchasability";
import { CHECKOUT_UNAVAILABLE_MESSAGE } from "@/lib/commerce/messages";
import { hasCommerceMapping, getCommerceUrl } from "@/content/product-commerce";
import type { Product } from "@/content/products";
import { NEEDS_VERIFICATION } from "@/content/products";
import type { ProductDetail, ProductDetailEntry } from "@/content/product-details";
import { ingredientSlugFromName } from "@/content/ingredients";
import { cn } from "@/lib/utils";

/**
 * Product Detail Page architecture — docs/ux-architecture.md §6,
 * docs/component-system.md. Built so a missing image, missing size/price,
 * or missing long-form content slots in cleanly without redesigning this
 * component: every optional field is checked and simply omitted from the
 * render when absent, rather than the layout assuming it's always there.
 *
 * Purchase actions:
 * - **Handoff mode** (Phase 8, docs/phase-8-godaddy-product-handoff.md) —
 *   products with a verified GoDaddy commerce URL (`content/product-
 *   commerce.ts`: Body Oils, Body Butters, Geranium Lip Balm) show a single
 *   "Continue to Shop" action that is a real external link to that verified
 *   URL, gated only on price being verified for the selected configuration
 *   (`isPriceVerifiedForHandoff`) — not on the local-cart `getPurchaseState`
 *   rule, since size is display-only here (GoDaddy's own page shows the
 *   real one). Local "Add to Cart"/"Buy Now" don't appear for these
 *   products — mixing a local cart with an external purchase link risked
 *   implying the two are connected, which they are not.
 * - **Local-cart mode** (Phase 6, docs/phase-6-commerce-layer-report.md
 *   §4/§5) — everything else. "Add to Cart" adds to the local cart
 *   architecture via `useCart()`, gated on `getPurchaseState` (price AND
 *   size verified). "Buy Now" stays honestly disabled: no checkout backend
 *   is connected for these (docs/commerce-investigation.md).
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
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  const hasVariants = !!detailEntry?.variantDetails?.length;
  const activeDetail: ProductDetail | undefined = hasVariants
    ? detailEntry!.variantDetails![variantIndex].detail
    : detailEntry?.details;

  const activeSizeVariant = product.sizeVariants?.[sizeIndex];
  const displayPrice = activeSizeVariant ? activeSizeVariant.price : product.price;
  const activeVariantName = hasVariants
    ? detailEntry!.variantDetails![variantIndex].variantName
    : undefined;
  const purchaseState = getPurchaseState(product, activeSizeVariant?.label);

  const inHandoffMode = hasCommerceMapping(product.slug);
  const commerceUrl = inHandoffMode
    ? getCommerceUrl(product.slug, { variantName: activeVariantName, sizeLabel: activeSizeVariant?.label })
    : null;
  const handoffEnabled = commerceUrl !== null && isPriceVerifiedForHandoff(product, activeSizeVariant?.label);
  const handoffSelectionLabel = [product.name, activeVariantName ?? activeSizeVariant?.label]
    .filter(Boolean)
    .join(" — ");

  async function handleAddToCart() {
    await addItem(
      { slug: product.slug, variantName: activeVariantName, sizeLabel: activeSizeVariant?.label },
      quantity,
    );
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

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

        {/* Purchase + info column — the purchase-critical block (name through
            CTA) stays sticky as the longer editorial content below it
            scrolls, mirroring the sticky image opposite it. */}
        <FadeUp className="desktop:w-1/2">
        <div className="desktop:sticky desktop:top-28">
          <Badge variant="neutral">{product.category}</Badge>
          <h1 className="mt-3 text-heading-1 text-ink-900">{product.name}</h1>
          {activeDetail?.tagline && (
            <p className="mt-2 text-heading-3 text-sage-700">{activeDetail.tagline}</p>
          )}

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

          {/* Quantity — only meaningful for the local cart; the GoDaddy
              handoff doesn't carry a quantity across (docs/phase-7-godaddy-
              integration-investigation.md §9), so it's omitted in handoff
              mode rather than shown non-functionally. */}
          {!inHandoffMode && (
            <div className="mt-6">
              <span className="text-label uppercase tracking-wide text-ink-600">Quantity</span>
              <div className="mt-2">
                <QuantityStepper value={quantity} onChange={setQuantity} label={product.name} />
              </div>
            </div>
          )}

          {/* Purchase actions */}
          {inHandoffMode ? (
            <div className="mt-6">
              {handoffEnabled ? (
                <Button
                  variant="primary"
                  href={commerceUrl!}
                  rel="noopener noreferrer"
                  aria-label={`Continue to shop to purchase ${handoffSelectionLabel} — opens our shop`}
                >
                  Continue to Shop
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  disabled
                  aria-label={`Continue to shop for ${handoffSelectionLabel} — not yet available`}
                >
                  Continue to Shop
                </Button>
              )}
              <p className="mt-2 text-body-sm text-ink-600">
                {handoffEnabled
                  ? "You'll complete your purchase on our shop."
                  : "This option isn't available to purchase yet."}
              </p>
            </div>
          ) : (
            <>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="primary"
                  disabled={purchaseState.status === "pending"}
                  onClick={handleAddToCart}
                  aria-label={
                    purchaseState.status === "pending"
                      ? `Add ${product.name} to cart — ${purchaseState.reason}`
                      : `Add ${product.name} to cart`
                  }
                >
                  {justAdded ? "Added ✓" : "Add to Cart"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  disabled
                  aria-label={`Buy ${product.name} now — checkout not yet available`}
                >
                  Buy Now
                </Button>
              </div>

              {purchaseState.status === "pending" && (
                <p className="mt-2 text-body-sm text-ink-600">
                  {purchaseState.reason} — not yet available to add to cart.
                </p>
              )}
              <p className="mt-1 text-body-sm text-ink-600">{CHECKOUT_UNAVAILABLE_MESSAGE}</p>
            </>
          )}
        </div>

        <div className="mt-10 border-t border-sand-200 pt-8 desktop:mt-8">
          {/* Description */}
          {activeDetail?.description && (
            <p className="text-body text-ink-600">{activeDetail.description}</p>
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
        </div>
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
              <Link
                href={`/ingredients/${ingredientSlugFromName(ingredient.name)}`}
                className="font-medium text-ink-900 underline decoration-sand-200 underline-offset-2 hover:text-sage-700 hover:decoration-sage-700"
              >
                {ingredient.name}
              </Link>{" "}
              – {ingredient.benefit}
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
