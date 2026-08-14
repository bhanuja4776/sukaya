import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ShopGrid } from "@/components/products/shop-grid";
import { products } from "@/content/products";
import { brand } from "@/content/site";

export const metadata: Metadata = {
  title: `Shop — ${brand.name}`,
  description: "Browse the full SUKAYA product range.",
};

/**
 * Shop / product listing — Phase 4. All 10 verified products
 * (docs/product-inventory.md), category filtering only (verified to
 * exist via the live site's category taxonomy — docs/website-architecture.md;
 * no sort control, since none is evidenced in the source material).
 */
export default function ShopPage() {
  return (
    <Container width="wide" as="section" className="py-16 desktop:py-24">
      <h1 className="text-heading-1 text-ink-900">Shop</h1>
      <ShopGrid products={products} />
    </Container>
  );
}
