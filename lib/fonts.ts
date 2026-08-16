import { Josefin_Sans } from "next/font/google";

/**
 * Verified brand typefaces (docs/source-of-truth.md §A.13).
 * Usage split is an explicit Phase 2 approval decision (docs/design-system.md §3.2):
 * Josefin Sans is the primary interface/editorial face everywhere; Righteous is
 * restricted to the logo wordmark and no other default UI use.
 *
 * Righteous is NOT loaded here (Phase 9, docs/phase-9-visual-conversion-
 * audit.md §10): the SUKAYA wordmark is only ever rendered as the existing
 * photographed logo image (components/layout/header.tsx), never as live
 * text — `--font-brand`/`text-display-brand` (styles/globals.css) had zero
 * usages anywhere in the codebase. Loading a webfont that's never rendered
 * is a pure performance cost with no visual benefit. This doesn't reverse
 * the Phase 2 decision — the logo image still carries the Righteous
 * wordmark exactly as documented. If a live-text brand moment is ever
 * added, reinstate `Righteous` from `next/font/google` here.
 */

export const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-josefin",
  display: "swap",
});
