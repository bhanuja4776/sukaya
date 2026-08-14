import { Josefin_Sans, Righteous } from "next/font/google";

/**
 * Verified brand typefaces (docs/source-of-truth.md §A.13).
 * Usage split is an explicit Phase 2 approval decision (docs/design-system.md §3.2):
 * Josefin Sans is the primary interface/editorial face everywhere; Righteous is
 * restricted to the logo wordmark and no other default UI use.
 */

export const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-josefin",
  display: "swap",
});

export const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
  display: "swap",
});
