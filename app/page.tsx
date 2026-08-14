import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AwaitingAssetPlaceholder } from "@/components/ui/awaiting-asset-placeholder";
import { FadeUp } from "@/components/motion/fade-up";
import { ImageReveal } from "@/components/motion/image-reveal";
import { brandAssets } from "@/content/assets";
import { products } from "@/content/products";

/**
 * PHASE 3A FOUNDATION PREVIEW — not the SUKAYA homepage.
 *
 * This page exists only to verify the design tokens, layout/motion/UI
 * primitives, and content data layer render and typecheck together. The
 * real homepage (docs/ux-architecture.md §2) is built in a later phase.
 * No marketing copy, product-page layout, or final section design appears
 * here — labels below are plain technical labels, not SUKAYA content.
 */
export default function FoundationPreviewPage() {
  const productWithImage = products.find((product) => product.image !== null);
  const productWithoutImage = products.find((product) => product.image === null);

  return (
    <Container width="wide">
      <Section spacing="tight">
        <p className="text-label uppercase tracking-wide text-ink-600">
          Phase 3A — Foundation Preview (internal, not the live homepage)
        </p>
      </Section>

      <Section spacing="tight" as="div">
        <FadeUp>
          <h1 className="text-display-hero font-medium text-ink-900">Type scale sample</h1>
          <p className="text-body-lg text-ink-600">body-lg sample paragraph text.</p>
          <p className="text-body text-ink-900">body sample paragraph text.</p>
        </FadeUp>
      </Section>

      <Section spacing="tight">
        <h2 className="text-heading-2 text-ink-900">Buttons</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </Section>

      <Section spacing="tight">
        <h2 className="text-heading-2 text-ink-900">Badges</h2>
        <div className="mt-4 flex gap-3">
          <Badge variant="neutral">Category</Badge>
          <Badge variant="sage">Save 20%</Badge>
        </div>
      </Section>

      <Section spacing="tight">
        <h2 className="text-heading-2 text-ink-900">Brand logo (verified asset)</h2>
        <Image
          src={brandAssets.logo.path}
          alt={brandAssets.logo.alt}
          width={brandAssets.logo.width}
          height={brandAssets.logo.height}
          className="mt-4 h-24 w-auto rounded-md"
        />
      </Section>

      <Section spacing="tight">
        <h2 className="text-heading-2 text-ink-900">Image reveal motion primitive</h2>
        <ImageReveal className="mt-4 max-w-md overflow-hidden rounded-lg shadow-float">
          <Image
            src={brandAssets.logo.path}
            alt={brandAssets.logo.alt}
            width={brandAssets.logo.width}
            height={brandAssets.logo.height}
            className="h-auto w-full"
          />
        </ImageReveal>
      </Section>

      <Section spacing="tight">
        <h2 className="text-heading-2 text-ink-900">Product data — available image</h2>
        {productWithImage && (
          <p className="mt-2 text-body text-ink-900">
            {productWithImage.name} — {productWithImage.price.display} ({productWithImage.size})
          </p>
        )}
      </Section>

      <Section spacing="tight">
        <h2 className="text-heading-2 text-ink-900">Awaiting-asset placeholder</h2>
        {productWithoutImage && (
          <div className="mt-4 max-w-xs">
            <AwaitingAssetPlaceholder label={productWithoutImage.name} />
          </div>
        )}
      </Section>
    </Container>
  );
}
