"use client";

import { useMemo, useState } from "react";
import { RevealGroup } from "@/components/motion/reveal-group";
import { FadeUp } from "@/components/motion/fade-up";
import { ProductCard } from "@/components/products/product-card";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import type { Product } from "@/content/products";
import { cn } from "@/lib/utils";

/**
 * Category filtering — implemented because it's supported by verified
 * website requirements: the live site's own sitemap confirms 9 real
 * product categories (docs/website-architecture.md), and each product's
 * category is a verified field (docs/product-inventory.md). No sorting
 * UI is added — nothing in the source material evidences a sort control
 * existing on the live site, so one isn't invented here.
 *
 * Name search is a lightweight client-side addition (the brief's "optional
 * in-catalog search") — it filters the same already-loaded verified product
 * list by name, no backend or external service involved.
 */
export function ShopGrid({ products }: { products: Product[] }) {
  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))).sort(),
    [products],
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const visible = products.filter((product) => {
    if (activeCategory && product.category !== activeCategory) return false;
    if (query.trim() && !product.name.toLowerCase().includes(query.trim().toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
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

        <div className="max-w-xs">
          <label htmlFor="shop-search" className="sr-only">
            Search products
          </label>
          <input
            id="shop-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products…"
            autoComplete="off"
            className="min-h-11 w-full rounded-pill border border-sand-200 bg-cream-0 px-5 py-2.5 text-body-sm text-ink-900 outline-none focus-visible:border-sage-500"
          />
        </div>
      </div>

      <h2>
        <VisuallyHidden>All products</VisuallyHidden>
      </h2>
      <RevealGroup className="mt-8 grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
        {visible.map((product) => (
          <FadeUp key={product.slug}>
            <ProductCard product={product} />
          </FadeUp>
        ))}
      </RevealGroup>

      {visible.length === 0 && (
        <p className="mt-8 text-body text-ink-600">No products match your filters.</p>
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
