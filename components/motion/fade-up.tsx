"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUpVariants } from "./variants";

/**
 * docs/motion-system.md §3.1 `fade-up` — fires once when the element enters
 * the viewport. Reduced-motion handling is inherited from the root
 * `MotionConfig reducedMotion="user"` (app/layout.tsx) — no per-component
 * check needed.
 *
 * Renders a `div`; wrap the semantic element you need (e.g. `<h2>`) as a
 * child rather than passing an `as` prop — dynamically creating a motion
 * component per render is flagged by react-hooks/static-components.
 */
interface FadeUpProps {
  className?: string;
  children: ReactNode;
}

export function FadeUp({ className, children }: FadeUpProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
