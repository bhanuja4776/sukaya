/**
 * Image asset registry — docs/asset-inventory.md. Single place mapping a
 * verified image to where it lives, so no path is duplicated/hardcoded
 * across components.
 */

export interface ImageAsset {
  path: string;
  width: number;
  height: number;
  alt: string;
  sourceNote: string;
}

export const brandAssets = {
  logo: {
    path: "/images/brand/sukaya-logo.jpg",
    width: 1310,
    height: 768,
    alt: "SUKAYA",
    sourceNote: "docs/asset-inventory.md §1 — recovered high-resolution original",
  } satisfies ImageAsset,
};

export const lifestyleAssets = {
  philosophyBotanicals: {
    path: "/images/lifestyle/philosophy-botanicals.jpg",
    width: 2560,
    height: 1754,
    alt: "Dried lavender, geranium, strawberry and botanicals arranged on a light stone surface",
    sourceNote: "docs/asset-inventory.md §1 — About Sukaya / Our Philosophy section image",
  } satisfies ImageAsset,
  aromatherapyOilBottle: {
    path: "/images/lifestyle/aromatherapy-oil-bottle.jpg",
    width: 1367,
    height: 1200,
    alt: "A bottle of essential oil beside fresh lavender sprigs",
    sourceNote: "docs/asset-inventory.md §1 — Aromatherapy & Skincare section image",
  } satisfies ImageAsset,
};

/**
 * EXISTING LIVE-SITE ASSETS — CLIENT DECISION REQUIRED
 * (docs/asset-inventory.md §4). Deliberately NOT copied into /public and
 * NOT wired into any component by default. Left exactly where they are in
 * reference/sukaya-site-archive/ pending your decision on each. Listed
 * here only so the decision isn't lost, not as usable image paths.
 */
export const flaggedExistingAssets = {
  heroOgImage: {
    location:
      "reference/sukaya-site-archive/assets/images/Gemini_Generated_Image_j5auh1j5auh1j5au__df6875d6830f.png",
    flag: "EXISTING LIVE-SITE ASSET — CLIENT DECISION REQUIRED",
    reason:
      "Filename indicates Google Gemini generation; the image itself shows visibly distorted text on several product labels — independent evidence of AI generation, not just the filename.",
    docsRef: "docs/asset-inventory.md §4.1",
  },
  serumDropletStock: {
    location: "reference/sukaya-site-archive/assets/images/rs_w_450_m__8583dcad96bc.jpg",
    flag: "EXISTING LIVE-SITE ASSET — CLIENT DECISION REQUIRED",
    reason: "Confirmed licensed Getty Images stock photography (Getty ID 1570519591), not an original SUKAYA photo.",
    docsRef: "docs/asset-inventory.md §4.2",
  },
  ingredientsFlatlayStock: {
    location: "reference/sukaya-site-archive/assets/images/cr_t_0___5ffa6d03198d.jpg",
    flag: "EXISTING LIVE-SITE ASSET — CLIENT DECISION REQUIRED",
    reason: "Confirmed licensed Getty Images stock photography (Getty ID 665238744), not an original SUKAYA photo.",
    docsRef: "docs/asset-inventory.md §4.3",
  },
} as const;
