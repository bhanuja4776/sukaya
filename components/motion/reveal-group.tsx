"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { sectionRevealContainer } from "./variants";

/**
 * docs/motion-system.md §3.8 `section-reveal` — coordinates a group of
 * children (each using `fadeUpVariants`/`imageRevealVariants`) so a whole
 * homepage section enters as one staggered sequence rather than every
 * child firing independently. Wrap a section's children in this, then give
 * each child `variants={fadeUpVariants}` (no separate whileInView needed on
 * the children — this parent drives it).
 */
interface RevealGroupProps {
  className?: string;
  children: ReactNode;
}

export function RevealGroup({ className, children }: RevealGroupProps) {
  return (
    <motion.div
      className={className}
      variants={sectionRevealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
