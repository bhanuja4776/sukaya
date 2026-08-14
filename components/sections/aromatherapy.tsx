import Image from "next/image";
import { Container } from "@/components/layout/container";
import { ImageReveal } from "@/components/motion/image-reveal";
import { FadeUp } from "@/components/motion/fade-up";
import { aromatherapy } from "@/content/site";
import { lifestyleAssets } from "@/content/assets";

/**
 * Aromatherapy & Skincare — verified copy (docs/source-of-truth.md §B),
 * paired with its documented section image (docs/asset-inventory.md §1).
 * Founder is referenced but not named anywhere in the source material —
 * "our founder" is used exactly as verified, not filled in.
 */
export function Aromatherapy() {
  return (
    <section className="bg-sage-100 py-16 desktop:py-24 desktop-lg:py-32">
      <Container width="default">
        <div className="flex flex-col gap-10 desktop:flex-row-reverse desktop:items-center desktop:gap-16">
          <ImageReveal className="overflow-hidden rounded-lg shadow-float desktop:w-1/2">
            <Image
              src={lifestyleAssets.aromatherapyOilBottle.path}
              alt={lifestyleAssets.aromatherapyOilBottle.alt}
              width={lifestyleAssets.aromatherapyOilBottle.width}
              height={lifestyleAssets.aromatherapyOilBottle.height}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              loading="lazy"
            />
          </ImageReveal>

          <FadeUp className="desktop:w-1/2">
            <h2 className="text-heading-1 text-ink-900">{aromatherapy.heading}</h2>
            <p className="mt-4 max-w-prose text-body text-ink-600">{aromatherapy.body}</p>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
