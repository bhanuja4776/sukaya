import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealGroup } from "@/components/motion/reveal-group";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { ingredientLibrary, getIngredientBySlug, ORGANIC_MARK_NOTE } from "@/content/ingredients";
import { brand } from "@/content/site";

export function generateStaticParams() {
  return ingredientLibrary.map((ingredient) => ({ slug: ingredient.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ingredient = getIngredientBySlug(slug);
  if (!ingredient) return {};
  return {
    title: `${ingredient.name} — Ingredient Library — ${brand.name}`,
    description: `Which SUKAYA products contain ${ingredient.name} and why.`,
  };
}

export default async function IngredientDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ingredient = getIngredientBySlug(slug);
  if (!ingredient) notFound();

  return (
    <Container width="default" className="py-10 desktop:py-16">
      <Breadcrumb
        items={[
          { label: "Ingredients", href: "/ingredients" },
          { label: ingredient.name },
        ]}
      />

      <FadeUp className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-heading-1 text-ink-900">{ingredient.name}</h1>
          {ingredient.organicMarked && <Badge variant="sage">Organic</Badge>}
        </div>
        {ingredient.organicMarked && (
          <p className="mt-3 max-w-prose text-body-sm text-ink-600">{ORGANIC_MARK_NOTE}</p>
        )}
      </FadeUp>

      <h2 className="mt-10 text-heading-3 text-ink-900">
        Used in {ingredient.usages.length} {ingredient.usages.length === 1 ? "product" : "products"}
      </h2>

      <RevealGroup className="mt-4 grid grid-cols-1 gap-4 tablet:grid-cols-2">
        {ingredient.usages.map((usage) => (
          <FadeUp key={`${usage.productSlug}-${usage.productLabel}`}>
            <Link
              href={usage.productHref}
              className="group block h-full rounded-md bg-cream-0 p-5 shadow-rest transition-shadow duration-300 hover:shadow-hover"
            >
              <h3 className="text-heading-3 text-ink-900 group-hover:text-sage-700">
                {usage.productLabel}
              </h3>
              <p className="mt-2 text-body-sm text-ink-600">{usage.benefit}</p>
            </Link>
          </FadeUp>
        ))}
      </RevealGroup>
    </Container>
  );
}
