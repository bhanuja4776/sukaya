import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { FadeUp } from "@/components/motion/fade-up";
import { RitualExplorer } from "@/components/ritual/ritual-explorer";
import { brand } from "@/content/site";

export const metadata: Metadata = {
  title: `Find Your Ritual — ${brand.name}`,
  description: "Explore the SUKAYA range by how you want your skin — and your moment — to feel.",
};

/**
 * "Find Your Ritual" — a mood-based way into the catalog, built for
 * browsing rather than diagnosis. No skin-condition or medical claim is
 * made anywhere on this page; see components/ritual/ritual-explorer.tsx and
 * content/rituals.ts for how matches are derived from existing verified
 * product copy.
 */
export default async function RitualPage({
  searchParams,
}: {
  searchParams: Promise<{ mood?: string }>;
}) {
  const { mood } = await searchParams;

  return (
    <Container width="wide" as="section" className="py-16 desktop:py-24">
      <FadeUp>
        <h1 className="text-heading-1 text-ink-900">Find Your Ritual</h1>
        <p className="mt-4 max-w-prose text-body text-ink-600">
          Not sure where to start? Choose the mood you&rsquo;re after, and we&rsquo;ll surface the
          products described that way. This isn&rsquo;t a skin diagnosis — just a gentler way to
          browse.
        </p>
      </FadeUp>

      <div className="mt-10">
        <RitualExplorer initialMood={mood} />
      </div>
    </Container>
  );
}
