"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RevealGroup } from "@/components/motion/reveal-group";
import { FadeUp } from "@/components/motion/fade-up";
import { AwaitingAssetPlaceholder } from "@/components/ui/awaiting-asset-placeholder";
import { Badge } from "@/components/ui/badge";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { cn } from "@/lib/utils";
import { ritualMoods, ritualMatches } from "@/content/rituals";

/**
 * "Find Your Ritual" — mood picker over the catalog. Matches come from
 * content/rituals.ts's keyword scan of verified product copy; this
 * component only renders what that scan already found, it doesn't add any
 * matching logic of its own.
 */
export function RitualExplorer({ initialMood }: { initialMood?: string }) {
  const initialSlug =
    initialMood && ritualMoods.some((mood) => mood.slug === initialMood)
      ? initialMood
      : ritualMoods[0].slug;
  const [activeMood, setActiveMood] = useState(initialSlug);
  const mood = ritualMoods.find((candidate) => candidate.slug === activeMood) ?? ritualMoods[0];
  const matches = ritualMatches[activeMood] ?? [];

  return (
    <div>
      <div role="group" aria-label="Choose a ritual" className="flex flex-wrap gap-3">
        {ritualMoods.map((candidate) => (
          <button
            key={candidate.slug}
            type="button"
            aria-pressed={candidate.slug === activeMood}
            onClick={() => setActiveMood(candidate.slug)}
            className={cn(
              "min-h-11 rounded-pill border px-5 py-2.5 text-label uppercase tracking-wide transition-colors duration-200",
              candidate.slug === activeMood
                ? "border-sage-700 bg-sage-700 text-cream-0"
                : "border-sand-200 bg-transparent text-ink-900 hover:border-sage-500",
            )}
          >
            {candidate.label}
          </button>
        ))}
      </div>

      <FadeUp key={mood.slug} className="mt-6">
        <p className="max-w-prose text-body text-ink-600">{mood.description}</p>
      </FadeUp>

      <h2>
        <VisuallyHidden>{mood.label} products</VisuallyHidden>
      </h2>
      <RevealGroup
        key={`${mood.slug}-grid`}
        className="mt-8 grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-3"
      >
        {matches.map((match) => (
          <FadeUp key={`${match.productSlug}-${match.productLabel}`}>
            <Link
              href={match.productHref}
              className="group block overflow-hidden rounded-md bg-cream-0 shadow-rest transition-shadow duration-300 hover:shadow-hover"
            >
              <div className="aspect-square overflow-hidden">
                {match.image ? (
                  <Image
                    src={match.image}
                    alt={match.productLabel}
                    width={600}
                    height={600}
                    loading="lazy"
                    unoptimized
                    className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
                  />
                ) : (
                  <AwaitingAssetPlaceholder label={match.productLabel} className="aspect-square rounded-none" />
                )}
              </div>
              <div className="p-4">
                <Badge variant="neutral" className="mb-2">
                  {match.category}
                </Badge>
                <h3 className="text-heading-3 text-ink-900 group-hover:text-sage-700">
                  {match.productLabel}
                </h3>
              </div>
            </Link>
          </FadeUp>
        ))}
      </RevealGroup>

      {matches.length === 0 && (
        <p className="mt-8 text-body text-ink-600">No products matched to this ritual yet.</p>
      )}
    </div>
  );
}
