import Image from "next/image";
import { Container } from "@/components/layout/container";
import { RevealGroup } from "@/components/motion/reveal-group";
import { FadeUp } from "@/components/motion/fade-up";
import { PullQuote } from "@/components/ui/pull-quote";
import { aboutSukaya } from "@/content/site";
import { products } from "@/content/products";

/**
 * "About Sukaya" — Our Philosophy + Our Commitment. Verified copy,
 * unmodified (docs/source-of-truth.md §B). Editorial two-column rhythm
 * per docs/ux-architecture.md §2.3; the 0%-water line is pulled out as a
 * large callout using the exact verified sentence, not new copy.
 *
 * Philosophy pairs with a small teaser of the two available real product
 * photos (docs/product-inventory.md) rather than reusing the hero's
 * lifestyle image again on the same page.
 */
export function AboutSukaya() {
  const productsWithImage = products.filter((product) => product.image !== null);

  return (
    <section id="about-sukaya" className="py-16 desktop:py-24 desktop-lg:py-32">
      <Container width="default">
        <RevealGroup>
          <FadeUp>
            <h2 className="text-heading-1 text-ink-900">About Sukaya</h2>
          </FadeUp>

          <div className="mt-12 grid gap-16 tablet:grid-cols-2">
            <FadeUp>
              <h3 className="text-heading-2 text-ink-900">Our Philosophy</h3>
              <p className="mt-4 max-w-prose text-body text-ink-600">{aboutSukaya.philosophy}</p>
              {productsWithImage.length > 0 && (
                <div className="mt-8 flex gap-4">
                  {productsWithImage.map((product) => (
                    <div
                      key={product.slug}
                      className="w-24 overflow-hidden rounded-md shadow-rest"
                    >
                      <Image
                        src={product.image as string}
                        alt={product.name}
                        width={200}
                        height={200}
                        // See components/products/product-card.tsx — same
                        // low-resolution source photo, same fix.
                        unoptimized
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </FadeUp>

            <FadeUp>
              <h3 className="text-heading-2 text-ink-900">Our Commitment</h3>
              <p className="mt-4 max-w-prose text-body text-ink-600">{aboutSukaya.commitment}</p>
              <div className="mt-6">
                <PullQuote>Most skincare products are 80% water but ours is 0%.</PullQuote>
              </div>
            </FadeUp>
          </div>
        </RevealGroup>
      </Container>
    </section>
  );
}
