"use client";

import { useMemo, useState } from "react";
import { RevealGroup } from "@/components/motion/reveal-group";
import { FadeUp } from "@/components/motion/fade-up";
import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/content/products";
import { cn } from "@/lib/utils";

/**
 * Category filtering — implemented because it's supported by verified
 * website requirements: the live site's own sitemap confirms 9 real
 * product categories (docs/website-architecture.md), and each product's
 * category is a verified field (docs/product-inventory.md). No sorting
 * UI is added — nothing in the source material evidences a sort control
 * existing on the live site, so one isn't invented here.
 */
export function ShopGrid({ products }: { products: Product[] }) {
  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))).sort(),
    [products],
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const visible = activeCategory
    ? products.filter((product) => product.category === activeCategory)
    : products;

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-3">
        <FilterPill active={activeCategory === null} onClick={() => setActiveCategory(null)}>
          All
        </FilterPill>
        {categories.map((category) => (
          <FilterPill
            key={category}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </FilterPill>
        ))}
      </div>

      <RevealGroup className="mt-8 grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
        {visible.map((product) => (
          <FadeUp key={product.slug}>
            <ProductCard product={product} />
          </FadeUp>
        ))}
      </RevealGroup>

      {visible.length === 0 && (
        <p className="mt-8 text-body text-ink-600">No products in this category.</p>
      )}
    </div>
  );
}

function FilterPill({
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
        "min-h-11 rounded-pill border px-4 py-2 text-label uppercase tracking-wide transition-colors duration-200",
        active
          ? "border-sage-700 bg-sage-700 text-cream-0"
          : "border-sand-200 bg-transparent text-ink-900 hover:border-sage-500",
      )}
    >
      {children}
    </button>
  );
}
