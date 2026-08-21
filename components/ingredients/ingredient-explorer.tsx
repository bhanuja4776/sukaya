"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { RevealGroup } from "@/components/motion/reveal-group";
import { FadeUp } from "@/components/motion/fade-up";
import { Badge } from "@/components/ui/badge";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import type { IngredientEntry } from "@/content/ingredients";

/**
 * Client-side name search over the ingredient index — same pattern as
 * components/products/shop-grid.tsx's category filter (no backend, no
 * external search service, just filtering an already-loaded verified list).
 */
export function IngredientExplorer({ ingredients }: { ingredients: IngredientEntry[] }) {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return ingredients;
    return ingredients.filter((ingredient) => ingredient.name.toLowerCase().includes(normalized));
  }, [ingredients, query]);

  return (
    <div>
      <div className="max-w-sm">
        <label htmlFor="ingredient-search" className="sr-only">
          Search ingredients
        </label>
        <input
          id="ingredient-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search ingredients…"
          autoComplete="off"
          className="min-h-11 w-full rounded-pill border border-sand-200 bg-cream-0 px-5 py-3 text-body text-ink-900 outline-none focus-visible:border-sage-500"
        />
      </div>

      <h2>
        <VisuallyHidden>All ingredients</VisuallyHidden>
      </h2>
      <RevealGroup className="mt-8 grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
        {visible.map((ingredient) => (
          <FadeUp key={ingredient.slug}>
            <Link
              href={`/ingredients/${ingredient.slug}`}
              className="group block h-full rounded-md bg-cream-0 p-5 shadow-rest transition-shadow duration-300 hover:shadow-hover"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-heading-3 text-ink-900 group-hover:text-sage-700">
                  {ingredient.name}
                </h3>
                {ingredient.organicMarked && (
                  <Badge variant="sage" className="shrink-0">
                    Organic
                  </Badge>
                )}
              </div>
              <p className="mt-2 text-body-sm text-ink-600">
                {ingredient.usages[0]?.benefit}
              </p>
              <p className="mt-3 text-label uppercase tracking-wide text-ink-600">
                Used in {ingredient.usages.length} {ingredient.usages.length === 1 ? "product" : "products"}
              </p>
            </Link>
          </FadeUp>
        ))}
      </RevealGroup>

      {visible.length === 0 && (
        <p className="mt-8 text-body text-ink-600">No ingredients match &ldquo;{query}&rdquo;.</p>
      )}
    </div>
  );
}
