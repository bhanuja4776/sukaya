import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { FadeUp } from "@/components/motion/fade-up";
import { IngredientExplorer } from "@/components/ingredients/ingredient-explorer";
import { ingredientLibrary, ORGANIC_MARK_NOTE } from "@/content/ingredients";
import { brand } from "@/content/site";

export const metadata: Metadata = {
  title: `Ingredient Library — ${brand.name}`,
  description: "Every ingredient across the SUKAYA range, and exactly which products use it.",
};

/**
 * Ingredient Library index. Every entry and every product cross-reference
 * comes from content/ingredients.ts, which derives them directly from the
 * already-verified ingredient lists in content/product-details.ts — nothing
 * on this page is authored copy.
 */
export default function IngredientsPage() {
  return (
    <Container width="wide" as="section" className="py-16 desktop:py-24">
      <FadeUp>
        <h1 className="text-heading-1 text-ink-900">Ingredient Library</h1>
        <p className="mt-4 max-w-prose text-body text-ink-600">
          Every ingredient that appears in a SUKAYA formula, together with the products it&rsquo;s
          used in and why. Nothing here is a new claim — each entry is drawn directly from our own
          product ingredient lists.
        </p>
        <p className="mt-3 max-w-prose text-body-sm text-ink-600">{ORGANIC_MARK_NOTE}</p>
      </FadeUp>

      <div className="mt-10">
        <IngredientExplorer ingredients={ingredientLibrary} />
      </div>
    </Container>
  );
}
