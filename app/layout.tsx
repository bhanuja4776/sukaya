import type { Metadata } from "next";
import { MotionConfig } from "motion/react";
import { josefinSans, righteous } from "@/lib/fonts";
import { SkipLink } from "@/components/ui/skip-link";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "SUKAYA",
  description: "SUKAYA — natural skincare (site under refurbishment).",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} ${righteous.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {/*
          Framer Motion's own reduced-motion handling — respects the OS-level
          prefers-reduced-motion setting for every Motion-driven animation in
          the tree (docs/motion-system.md §1, §6). Backed by the CSS-level
          fallback in styles/globals.css for non-Motion transitions.
        */}
        <MotionConfig reducedMotion="user">
          <SkipLink />
          <main id="main-content" className="flex flex-1 flex-col">
            {children}
          </main>
        </MotionConfig>
      </body>
    </html>
  );
}
