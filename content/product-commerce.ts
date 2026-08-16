/**
 * Verified GoDaddy commerce handoff URLs — Phase 8
 * (docs/phase-8-godaddy-product-handoff.md).
 *
 * Every URL below was manually copied from the live site by the site
 * owner and supplied verbatim in the Phase 8 instructions — none is
 * constructed from a slug, guessed, or inferred. A product/variant with no
 * entry here has no verified purchase destination and stays on the
 * existing honest "not yet available" treatment, regardless of anything
 * else that might be true about it (docs/commerce-investigation.md,
 * docs/phase-7-godaddy-integration-investigation.md §7).
 *
 * Body Oil's two entries are keyed to `variantName`, matching the fragrance
 * variant names already verified in content/product-details.ts ("Calming
 * Body Oil", "Uplifting Body Oil") — CBO/UBO in the verified URLs are the
 * first-letter initials of those exact two names, not a new guess (see the
 * Phase 8 report for how this was reasoned about, since the brief warned
 * not to assume their meaning).
 *
 * Geranium Lip Balm has only its 5 ML entry — 10 ML is deliberately absent.
 * Its price is still NEEDS_VERIFICATION (content/products.ts), and the
 * Phase 8 brief is explicit that an existing product URL must not make an
 * unverified-price size purchasable. Leaving it unmapped enforces that
 * independently of the price check in lib/commerce/purchasability.ts.
 *
 * Original Body Butter has only the "Original Body Butter" entry — the
 * "Calming Body Butter" variant has no verified URL and is not invented
 * one here.
 */

export interface CommerceUrlEntry {
  /** Matches a variantName from content/product-details.ts, for fragrance-variant products. */
  variantName?: string;
  /** Matches a sizeVariants[].label from content/products.ts, for size-variant products. */
  sizeLabel?: string;
  /** The exact, verified GoDaddy product URL — never modified or parameterized. */
  url: string;
}

export const productCommerceUrls: Record<string, CommerceUrlEntry[]> = {
  "body-oil": [
    { variantName: "Calming Body Oil", url: "https://sukaya.com.au/shop/ols/products/body-oil/v/CBO" },
    { variantName: "Uplifting Body Oil", url: "https://sukaya.com.au/shop/ols/products/body-oil/v/UBO" },
  ],
  "original-body-butter": [
    {
      variantName: "Original Body Butter",
      url: "https://sukaya.com.au/shop/ols/products/original-body-butter",
    },
  ],
  "geranium-lip-balm": [
    { sizeLabel: "5 ML", url: "https://sukaya.com.au/shop/ols/products/geranium-lip-balm" },
  ],
};

/** True if this product has at least one verified GoDaddy commerce URL for any of its configurations. */
export function hasCommerceMapping(slug: string): boolean {
  return slug in productCommerceUrls;
}

/**
 * Resolves the verified GoDaddy URL for one specific product configuration,
 * or null if that exact configuration has no verified URL — never a
 * fallback/guessed URL.
 */
export function getCommerceUrl(
  slug: string,
  selection: { variantName?: string; sizeLabel?: string } = {},
): string | null {
  const entries = productCommerceUrls[slug];
  if (!entries) return null;
  const match = entries.find(
    (entry) =>
      (entry.variantName ?? null) === (selection.variantName ?? null) &&
      (entry.sizeLabel ?? null) === (selection.sizeLabel ?? null),
  );
  return match?.url ?? null;
}
