import { Container } from "@/components/layout/container";
import { FadeUp } from "@/components/motion/fade-up";
import { aboutSukaya } from "@/content/site";

/**
 * "Our Commitment" — split out of the former AboutSukaya section (Phase 3B)
 * as its own homepage beat. The 0%-water line now gets its own full-bleed
 * moment in components/sections/stat-callout.tsx instead of being repeated
 * here as an inline PullQuote.
 */
export function Commitment() {
  return (
    <section id="commitment" className="py-16 desktop:py-24 desktop-lg:py-32">
      <Container width="narrow">
        <FadeUp className="text-center">
          <h2 className="text-heading-1 text-ink-900">Our Commitment</h2>
          <p className="mt-4 text-body text-ink-600">{aboutSukaya.commitment}</p>
        </FadeUp>
      </Container>
    </section>
  );
}
