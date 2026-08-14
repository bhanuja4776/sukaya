import { Container } from "@/components/layout/container";
import { RevealGroup } from "@/components/motion/reveal-group";
import { FadeUp } from "@/components/motion/fade-up";
import { ProductCard } from "@/components/products/product-card";
import { products } from "@/content/products";

/**
 * Featured Products — docs/ux-architecture.md §2.5. Verified section
 * heading; a subset of the full 10-product catalog (the PDF shows a
 * subset featured on the homepage, full catalog reserved for the Shop
 * page, not built this phase).
 */
export function FeaturedProducts() {
  const featured = products.slice(0, 6);

  return (
    <section className="py-16 desktop:py-24 desktop-lg:py-32">
      <Container width="wide">
        <FadeUp>
          <h2 className="text-heading-1 text-ink-900">Featured Products</h2>
        </FadeUp>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
          {featured.map((product) => (
            <FadeUp key={product.slug}>
              <ProductCard product={product} />
            </FadeUp>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
