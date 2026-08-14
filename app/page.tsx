import { Hero } from "@/components/sections/hero";
import { AboutSukaya } from "@/components/sections/about-sukaya";
import { Aromatherapy } from "@/components/sections/aromatherapy";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { Contact } from "@/components/sections/contact";
import { Newsletter } from "@/components/sections/newsletter";

/**
 * SUKAYA homepage — Phase 3B. Section order follows the verified homepage
 * structure (docs/website-architecture.md, docs/ux-architecture.md §2):
 * Hero → About Sukaya (Philosophy, Commitment) → Aromatherapy & Skincare →
 * Featured Products → Contact → Newsletter. Header/Footer/CookieBanner are
 * wired globally in app/layout.tsx.
 *
 * "Raving Fans" is omitted this phase (docs/ux-architecture.md §4, Option
 * A) — the section's heading is verified but its content is confirmed
 * empty (docs/source-of-truth.md §A.11), and no testimonial content is
 * invented to fill it. See docs/phase-3b-homepage-report.md for the full
 * rationale and how to switch to Option B (minimal placeholder) instead.
 *
 * The homepage image gallery ("Explore our stunning range of natural
 * beauty") is also deferred this phase — see the same report for why.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSukaya />
      <Aromatherapy />
      <FeaturedProducts />
      <Contact />
      <Newsletter />
    </>
  );
}
