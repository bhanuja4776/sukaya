/**
 * Product data — structured from docs/product-inventory.md (which is
 * itself sourced entirely from docs/sukaya-content.pdf; the live-site
 * archive contributed no product content, docs/source-of-truth.md).
 *
 * Scope note (Phase 3A): populated here are the fields the Product Card /
 * Shop grid need (docs/component-system.md §3) — name, price, size,
 * category, variants, image. Long-form PDP copy (full description,
 * ingredients-with-benefits, What It Does, How to Use, Safety Notes) is
 * intentionally NOT transcribed into this file yet, since building product
 * detail pages is explicitly out of scope for this phase. Each product
 * carries a `sourceRef` pointing to the exact verbatim section in
 * docs/content-inventory.md §2 to wire in without transcription risk when
 * PDPs are built.
 *
 * NEEDS_VERIFICATION marks a field with no verified value anywhere in the
 * source material (docs/verification-checklist.md) — never filled with a
 * guess.
 */

export const NEEDS_VERIFICATION = "NEEDS VERIFICATION" as const;
export type VerifiedOr<T> = T | typeof NEEDS_VERIFICATION;

export interface ProductPrice {
  /** Exact verified display string — never reconstructed from a number. */
  display: string;
  /** Numeric value for sorting/filtering only, derived from `display`. */
  amount: number;
  /** Set only for a verified sale price (Trial Collection). */
  originalDisplay?: string;
  originalAmount?: number;
  saleLabel?: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  price: ProductPrice;
  size: VerifiedOr<string>;
  /** Verified fragrance/size variant names, where the product has them. */
  variants?: string[];
  /** Path under /public/images/products, or null — see content/assets.ts. */
  image: string | null;
  /** Pointer to the verbatim long-form copy, not duplicated here. */
  sourceRef: string;
}

export const products: Product[] = [
  {
    slug: "cleanser-exfoliator-mask---pink-blush",
    name: "Cleanser Exfoliator Mask – Pink Blush",
    category: "Cleanser Exfoliator Mask",
    price: { display: "$31.99", amount: 31.99 },
    size: "40 gm",
    image: "/images/products/cleanser-exfoliator-mask-pink-blush.jpg",
    sourceRef: "docs/content-inventory.md §2.1",
  },
  {
    slug: "super-fruits-face-elixir",
    name: "Super Fruits Face Elixir",
    category: "Face Serums",
    price: { display: "$36.99", amount: 36.99 },
    size: "30 ml",
    image: null,
    sourceRef: "docs/content-inventory.md §2.3",
  },
  {
    slug: "berry-light-soothe-serum",
    name: "Berry Light Soothe Serum",
    category: "Face Serums",
    price: { display: "$36.99", amount: 36.99 },
    size: "30 ml",
    image: null,
    sourceRef: "docs/content-inventory.md §2.4",
  },
  {
    slug: "body-oil",
    name: "Body Oils",
    category: "Body Oils",
    price: { display: "$31.99", amount: 31.99 },
    size: NEEDS_VERIFICATION,
    variants: ["Calming Body Oil", "Uplifting Body Oil"],
    image: null,
    sourceRef: "docs/content-inventory.md §2.2",
  },
  {
    slug: "original-body-butter",
    name: "Body Butters",
    category: "Body Butters",
    price: { display: "$31.99", amount: 31.99 },
    size: "80 ml",
    variants: ["Original Body Butter", "Calming Body Butter"],
    image: null,
    sourceRef: "docs/content-inventory.md §2.5",
  },
  {
    slug: "patchouli-face-cleansing-oil",
    name: "Patchouli Face Cleansing Oil",
    category: "Face Cleansing Oil",
    price: { display: "$31.99", amount: 31.99 },
    size: "50 ml",
    image: null,
    sourceRef: "docs/content-inventory.md §2.6",
  },
  {
    slug: "all-in-one-lavender-balm",
    name: "All in One Lavender Balm",
    category: "Balms",
    price: { display: "$26.99", amount: 26.99 },
    size: "40 ml",
    image: null,
    sourceRef: "docs/content-inventory.md §2.7",
  },
  {
    slug: "trial-collection",
    name: "Trial Collection",
    category: "Samples Minis",
    price: {
      display: "$15.99",
      amount: 15.99,
      originalDisplay: "$19.99",
      originalAmount: 19.99,
      saleLabel: "Save 20%",
    },
    size: NEEDS_VERIFICATION,
    image: null,
    sourceRef: "docs/content-inventory.md §2.8",
  },
  {
    slug: "geranium-lip-balm",
    name: "Geranium Lip Balm",
    category: "Accessories & Essentials",
    price: { display: "From $5.99", amount: 5.99 },
    size: "Tube 5 ml / Tin 10 ml",
    image: "/images/products/geranium-lip-balm.jpg",
    sourceRef: "docs/content-inventory.md §2.9",
  },
  {
    slug: "rosewood-spoon",
    name: "Rosewood Spoon (Handcrafted)",
    category: "Accessories & Essentials",
    price: { display: "$2.99", amount: 2.99 },
    size: NEEDS_VERIFICATION,
    image: null,
    sourceRef: "docs/content-inventory.md §2.10",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
