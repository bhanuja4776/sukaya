/**
 * Ingredient Library — derived, not transcribed. Every entry here is built
 * at module-load time directly from the ingredient lists already verified
 * in content/product-details.ts (itself sourced from docs/sukaya-content.pdf,
 * docs/content-inventory.md §2). No ingredient, benefit sentence, or
 * ingredient-to-product relationship is invented — this file only
 * re-indexes what's already there, the same way components/commerce/
 * cart-context.tsx enriches cart lines from content/products.ts instead of
 * duplicating a second copy of the data.
 *
 * The trailing "^" convention on some ingredient names is a verified
 * footnote from the source PDF (docs/content-inventory.md §1.10): it means
 * "Certified Organic, Organic or Wild-Harvested" and is an ingredient-
 * sourcing note, not a product-wide certification claim. It's stripped from
 * the display name and tracked as `organicMarked` instead of left inline.
 */

import { productDetails, type Ingredient } from "./product-details";
import { getProductBySlug } from "./products";

export interface IngredientUsage {
  productSlug: string;
  productHref: string;
  /** Fragrance/variant name if this usage is variant-specific, else the product name. */
  productLabel: string;
  /** Verbatim benefit sentence exactly as sourced for this product/variant. */
  benefit: string;
}

export interface IngredientEntry {
  slug: string;
  /** Display name with the sourcing footnote stripped. */
  name: string;
  organicMarked: boolean;
  usages: IngredientUsage[];
}

export const ORGANIC_MARK_NOTE =
  'Ingredient names marked with "^" in the original product listings are Certified Organic, Organic, or Wild-Harvested — an ingredient-sourcing note, not a product-wide certification claim (docs/content-inventory.md §1.10).';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Resolves the ingredient-library slug for a raw ingredient name as it appears in content/product-details.ts (trailing "^" included or not). */
export function ingredientSlugFromName(rawName: string): string {
  const trimmed = rawName.trim();
  const clean = trimmed.endsWith("^") ? trimmed.slice(0, -1).trim() : trimmed;
  return slugify(clean);
}

function buildIndex(): IngredientEntry[] {
  const bySlug = new Map<string, IngredientEntry>();

  function ingest(productSlug: string, productName: string, ingredients: Ingredient[] | undefined, variantName?: string) {
    if (!ingredients) return;
    const label = variantName ?? productName;
    for (const ingredient of ingredients) {
      const organicMarked = ingredient.name.trim().endsWith("^");
      const cleanName = organicMarked ? ingredient.name.trim().slice(0, -1).trim() : ingredient.name.trim();
      const key = slugify(cleanName);
      let record = bySlug.get(key);
      if (!record) {
        record = { slug: key, name: cleanName, organicMarked, usages: [] };
        bySlug.set(key, record);
      } else if (organicMarked) {
        record.organicMarked = true;
      }
      record.usages.push({
        productSlug,
        productHref: `/shop/${productSlug}`,
        productLabel: label,
        benefit: ingredient.benefit,
      });
    }
  }

  for (const [productSlug, entry] of Object.entries(productDetails)) {
    const product = getProductBySlug(productSlug);
    if (!product) continue;

    if (entry.details) ingest(productSlug, product.name, entry.details.ingredients);
    if (entry.variantDetails) {
      for (const variant of entry.variantDetails) {
        ingest(productSlug, product.name, variant.detail.ingredients, variant.variantName);
      }
    }
  }

  return Array.from(bySlug.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export const ingredientLibrary: IngredientEntry[] = buildIndex();

export function getIngredientBySlug(slug: string): IngredientEntry | undefined {
  return ingredientLibrary.find((ingredient) => ingredient.slug === slug);
}

/** All ingredient entries that appear anywhere in the given product's verified ingredient list(s). */
export function getIngredientsForProduct(productSlug: string): IngredientEntry[] {
  return ingredientLibrary.filter((ingredient) =>
    ingredient.usages.some((usage) => usage.productSlug === productSlug),
  );
}
