import { Hero } from "@/components/sections/hero";
import { Philosophy } from "@/components/sections/philosophy";
import { Commitment } from "@/components/sections/commitment";
import { StatCallout } from "@/components/sections/stat-callout";
import { Aromatherapy } from "@/components/sections/aromatherapy";
import { IngredientTeaser } from "@/components/sections/ingredient-teaser";
import { RitualTeaser } from "@/components/sections/ritual-teaser";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { Contact } from "@/components/sections/contact";
import { Newsletter } from "@/components/sections/newsletter";

/**
 * SUKAYA homepage — a deliberate ten-part narrative rather than a stack of
 * homogeneous sections: Hero (attract) → Philosophy (why we exist) →
 * Commitment (what we promise) → the 0%-water stat, given its own full-bleed
 * moment (proof) → Aromatherapy & Skincare (craft) → Ingredient Library
 * teaser (transparency) → Find Your Ritual teaser (personalized discovery)
 * → Featured Products (shop) → Contact → Newsletter.
 *
 * The homepage image gallery ("Explore our stunning range of natural
 * beauty", docs/phase-3b-homepage-report.md) is still deliberately omitted:
 * only two lifestyle photos and two low-resolution product photos are
 * verified real assets (docs/asset-inventory.md), and both lifestyle photos
 * are already placed (Hero, Aromatherapy). A gallery grid needs more
 * distinct images than exist — filling it with stock or repeated photos
 * would be exactly the kind of fabrication this project avoids, so the
 * section stays absent rather than faked.
 *
 * Header/Footer/CookieBanner are wired globally in app/layout.tsx.
 * "Raving Fans" stays omitted (docs/ux-architecture.md §4, Option A) — its
 * heading is verified but its content is confirmed empty
 * (docs/source-of-truth.md §A.11).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Commitment />
      <StatCallout />
      <Aromatherapy />
      <IngredientTeaser />
      <RitualTeaser />
      <FeaturedProducts />
      <Contact />
      <Newsletter />
    </>
  );
}
