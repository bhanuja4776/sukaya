import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ImageReveal } from "@/components/motion/image-reveal";
import { FadeUp } from "@/components/motion/fade-up";
import { hero } from "@/content/site";
import { lifestyleAssets } from "@/content/assets";

/**
 * Hero — docs/ux-architecture.md §2.2. Verified headline/subhead/CTA,
 * unmodified (docs/source-of-truth.md §A.1–A.3). Side-by-side layout so
 * text never sits on top of a darkened photo.
 *
 * Image note: the only "hero" image scraped from the live site is the
 * AI-generation-flagged asset (docs/asset-inventory.md §4.1) — excluded
 * per instructions. In its place this uses the verified, unflagged
 * "Our Philosophy" lifestyle photo (docs/asset-inventory.md §1) as the
 * hero's visual — an authentic recovered asset, not a fabricated one.
 */
export function Hero() {
  return (
    <section className="pt-8 pb-16 tablet:pt-12 desktop:pt-16 desktop:pb-24">
      <Container width="wide">
        <div className="flex flex-col gap-10 desktop:flex-row desktop:items-center desktop:gap-16">
          <ImageReveal className="order-1 overflow-hidden rounded-lg shadow-float desktop:order-2 desktop:w-1/2">
            <Image
              src={lifestyleAssets.philosophyBotanicals.path}
              alt={lifestyleAssets.philosophyBotanicals.alt}
              width={lifestyleAssets.philosophyBotanicals.width}
              height={lifestyleAssets.philosophyBotanicals.height}
              priority
              className="h-auto w-full object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </ImageReveal>

          <div className="order-2 desktop:order-1 desktop:w-1/2">
            <FadeUp>
              <h1 className="text-display-hero font-medium text-ink-900">{hero.headline}</h1>
              <p className="mt-4 max-w-md text-body-lg text-ink-600">{hero.subheadline}</p>
              <div className="mt-8">
                <Button href="/shop" variant="primary">
                  {hero.ctaLabel}
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </Container>
    </section>
  );
}
