import Link from "next/link";
import { Container } from "@/components/layout/container";
import { RevealGroup } from "@/components/motion/reveal-group";
import { FadeUp } from "@/components/motion/fade-up";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ingredientLibrary } from "@/content/ingredients";

/**
 * Homepage teaser for the Ingredient Library (content/ingredients.ts). The
 * four ingredients shown are simply the first four in the derived,
 * alphabetically-sorted index — not hand-picked marketing choices, so
 * there's no implicit ranking being asserted.
 */
export function IngredientTeaser() {
  const featured = ingredientLibrary.slice(0, 4);

  return (
    <section className="py-16 desktop:py-24 desktop-lg:py-32">
      <Container width="wide">
        <div className="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
          <FadeUp>
            <h2 className="text-heading-1 text-ink-900">What&rsquo;s Really in Our Formulas</h2>
            <p className="mt-3 max-w-prose text-body text-ink-600">
              Every ingredient we use, and exactly which products it&rsquo;s in — no fine print,
              no guessing.
            </p>
          </FadeUp>
          <FadeUp>
            <Button href="/ingredients" variant="secondary">
              Explore the Ingredient Library
            </Button>
          </FadeUp>
        </div>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
          {featured.map((ingredient) => (
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
                <p className="mt-2 text-body-sm text-ink-600">{ingredient.usages[0]?.benefit}</p>
              </Link>
            </FadeUp>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
