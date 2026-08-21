import Link from "next/link";
import { Container } from "@/components/layout/container";
import { RevealGroup } from "@/components/motion/reveal-group";
import { FadeUp } from "@/components/motion/fade-up";
import { ritualMoods, ritualMatches } from "@/content/rituals";

/**
 * Homepage teaser for /ritual (components/ritual/ritual-explorer.tsx). Each
 * chip links straight to that mood via `?mood=`, so the choice made here
 * carries through instead of dropping the visitor back at the default tab.
 */
export function RitualTeaser() {
  return (
    <section className="bg-sage-100 py-16 desktop:py-24 desktop-lg:py-32">
      <Container width="default">
        <FadeUp className="text-center">
          <h2 className="text-heading-1 text-ink-900">Find Your Ritual</h2>
          <p className="mx-auto mt-3 max-w-prose text-body text-ink-600">
            Choose the mood you&rsquo;re after, and we&rsquo;ll point you to the right products.
          </p>
        </FadeUp>

        <RevealGroup className="mt-8 flex flex-wrap justify-center gap-3">
          {ritualMoods.map((mood) => {
            const count = ritualMatches[mood.slug]?.length ?? 0;
            if (count === 0) return null;
            return (
              <FadeUp key={mood.slug}>
                <Link
                  href={`/ritual?mood=${mood.slug}`}
                  className="inline-flex min-h-11 items-center rounded-pill border border-sage-700 bg-cream-0 px-5 py-2.5 text-label uppercase tracking-wide text-sage-700 transition-colors duration-200 hover:bg-sage-700 hover:text-cream-0"
                >
                  {mood.label}
                </Link>
              </FadeUp>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
