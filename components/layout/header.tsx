"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { navItems } from "@/content/navigation";
import { brandAssets } from "@/content/assets";
import { brand } from "@/content/site";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { CartTrigger } from "@/components/commerce/cart-trigger";

/**
 * docs/ux-architecture.md §2.1 — sticky header, transparent-over-hero
 * transitioning to a solid bar on scroll (docs/motion-system.md §3.6
 * `nav-transition`). Nav items come from content/navigation.ts — Home/Shop
 * are the live site's verified nav (docs/source-of-truth.md §A.4);
 * Ingredients/Find Your Ritual are new pages this redesign adds, each fully
 * built and content-backed, not placeholders. The inline nav only appears
 * at `desktop:` and up — four items plus "Find Your Ritual" don't fit
 * comfortably at tablet width, so 768–1023px uses the mobile drawer instead.
 * The cart trigger (Phase 6, docs/phase-6-commerce-layer-report.md) is
 * commerce architecture, not a nav item, so it sits outside `navItems`.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-sand-200 bg-cream-50/95 backdrop-blur-sm"
          : "bg-transparent",
      )}
    >
      <Container width="wide">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={brandAssets.logo.path}
              alt={brand.name}
              width={brandAssets.logo.width}
              height={brandAssets.logo.height}
              priority
              // The source photo has a plain white backdrop, which reads as
              // a hard-edged card against the cream page background —
              // mix-blend-multiply optically drops the white out against
              // any cream/light surface without altering the image file
              // itself (Phase 9 visual polish, docs/phase-9-visual-
              // conversion-audit.md §3).
              className="h-10 w-auto mix-blend-multiply"
            />
          </Link>

          <nav aria-label="Primary" className="hidden desktop:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-label uppercase tracking-wide text-ink-900 transition-colors hover:text-sage-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <CartTrigger />

            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setMenuOpen(true)}
              className="rounded-md p-2 text-ink-900 hover:bg-sage-100 desktop:hidden"
            >
              <VisuallyHidden>Open menu</VisuallyHidden>
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      <div id="mobile-nav-drawer">
        <MobileNavDrawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          triggerRef={menuButtonRef}
        />
      </div>
    </header>
  );
}
