/**
 * "Find Your Ritual" — a discovery layer over the catalog, not a new set of
 * claims. Each mood below is matched against products mechanically, by
 * scanning the same verified tagline/description/benefit sentences already
 * in content/product-details.ts for a small set of literal keyword stems
 * that actually occur in that verified copy. A product is tagged into a
 * mood only when its own real words match — nothing here asserts a new
 * skin-feel, medical, or efficacy claim beyond what the product copy
 * already verifiably says. Products with no long-form detail entry (the
 * Trial Collection bundle, the Rosewood Spoon accessory) correctly appear
 * in zero moods rather than being force-fit into one.
 */

import { productDetails, type ProductDetail } from "./product-details";
import { getProductBySlug } from "./products";

export interface RitualMood {
  slug: string;
  label: string;
  /** Short editorial framing — describes the mood, makes no product claim of its own. */
  description: string;
  keywords: string[];
}

export const ritualMoods: RitualMood[] = [
  {
    slug: "calm-and-soothe",
    label: "Calm & Soothe",
    description: "For when skin — or the moment — needs to unwind.",
    keywords: ["calm", "sooth", "relax"],
  },
  {
    slug: "hydrate-and-nourish",
    label: "Hydrate & Nourish",
    description: "Deep, lasting moisture for thirsty skin.",
    keywords: ["hydrat", "nourish", "moistur"],
  },
  {
    slug: "brighten-and-renew",
    label: "Brighten & Renew",
    description: "Formulas described for a fresher, more radiant look.",
    keywords: ["bright", "radian", "renew", "glow", "regenerat"],
  },
  {
    slug: "energize-and-uplift",
    label: "Energize & Uplift",
    description: "A refreshing lift for skin and senses alike.",
    keywords: ["energiz", "uplift", "refresh"],
  },
  {
    slug: "cleanse-and-purify",
    label: "Cleanse & Purify",
    description: "Clear away impurities without stripping skin.",
    keywords: ["cleanse", "purify", "detox", "exfoliat"],
  },
];

export interface RitualProductMatch {
  productSlug: string;
  productHref: string;
  /** Fragrance/variant name when the match is variant-specific, else the product name. */
  productLabel: string;
  category: string;
  image: string | null;
  /** Which real keyword stem(s) from this product's own copy triggered the match — for transparency, not shown as marketing copy. */
  matchedOn: string[];
}

function textOf(detail: ProductDetail): string {
  return [detail.tagline, detail.description, ...(detail.benefits ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function buildMatches(): Record<string, RitualProductMatch[]> {
  const result: Record<string, RitualProductMatch[]> = {};
  for (const mood of ritualMoods) result[mood.slug] = [];

  for (const [productSlug, entry] of Object.entries(productDetails)) {
    const product = getProductBySlug(productSlug);
    if (!product) continue;

    const candidates: { label: string; detail: ProductDetail }[] = [];
    if (entry.details) candidates.push({ label: product.name, detail: entry.details });
    if (entry.variantDetails) {
      for (const variant of entry.variantDetails) {
        candidates.push({ label: variant.variantName, detail: variant.detail });
      }
    }

    for (const candidate of candidates) {
      const haystack = textOf(candidate.detail);
      for (const mood of ritualMoods) {
        const matchedOn = mood.keywords.filter((keyword) => haystack.includes(keyword));
        if (matchedOn.length === 0) continue;
        result[mood.slug].push({
          productSlug,
          productHref: `/shop/${productSlug}`,
          productLabel: candidate.label,
          category: product.category,
          image: product.image,
          matchedOn,
        });
      }
    }
  }

  return result;
}

export const ritualMatches = buildMatches();

export function getProductsForMood(slug: string): RitualProductMatch[] {
  return ritualMatches[slug] ?? [];
}
