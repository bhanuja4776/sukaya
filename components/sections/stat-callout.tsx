import { Container } from "@/components/layout/container";
import { FadeUp } from "@/components/motion/fade-up";

/**
 * Two verified sentences, pulled verbatim from the tail of
 * `aboutSukaya.commitment` (content/site.ts, docs/source-of-truth.md §B),
 * given their own full-bleed moment for editorial pacing rather than being
 * retyped or reworded — same source string this project always quotes
 * exactly.
 */
const STAT_SENTENCE = "Most skincare products are 80% water but ours is 0%.";
const STAT_DETAIL =
  "That means our products are packed with 5x more vitamins, antioxidants, and essential fatty acids — giving your skin pure nourishment with less product, less waste, and more results.";

export function StatCallout() {
  return (
    <section className="bg-sage-900 py-20 desktop:py-28">
      <Container width="narrow">
        <FadeUp className="text-center">
          <p className="text-display-hero font-medium text-cream-0">{STAT_SENTENCE}</p>
          <p className="mt-6 text-body-lg text-cream-0/80">{STAT_DETAIL}</p>
        </FadeUp>
      </Container>
    </section>
  );
}
