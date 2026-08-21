import Image from "next/image";
import { Container } from "@/components/layout/container";
import { FadeUp } from "@/components/motion/fade-up";
import { aboutSukaya } from "@/content/site";
import { products } from "@/content/products";

/**
 * "Our Philosophy" — split out of the former AboutSukaya section (Phase 3B)
 * into its own narrative beat, so the homepage reads as a sequence of
 * distinct moments rather than one long stacked block. Verified copy,
 * unmodified (docs/source-of-truth.md §B).
 */
export function Philosophy() {
  const productsWithImage = products.filter((product) => product.image !== null);

  return (
    <section id="philosophy" className="py-16 desktop:py-24 desktop-lg:py-32">
      <Container width="default">
        <FadeUp>
          <h2 className="text-heading-1 text-ink-900">Our Philosophy</h2>
          <p className="mt-4 max-w-prose text-body text-ink-600">{aboutSukaya.philosophy}</p>
          {productsWithImage.length > 0 && (
            <div className="mt-8 flex gap-4">
              {productsWithImage.map((product) => (
                <div key={product.slug} className="w-24 overflow-hidden rounded-md shadow-rest">
                  <Image
                    src={product.image as string}
                    alt={product.name}
                    width={200}
                    height={200}
                    unoptimized
                    className="h-auto w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </FadeUp>
      </Container>
    </section>
  );
}
