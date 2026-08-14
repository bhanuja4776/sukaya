"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { imageRevealVariants } from "./variants";

/**
 * docs/motion-system.md §3.3 `image-reveal` — for large hero/section
 * imagery. Fires once on viewport entry.
 */
interface ImageRevealProps {
  className?: string;
  children: ReactNode;
}

export function ImageReveal({ className, children }: ImageRevealProps) {
  return (
    <motion.div
      className={className}
      variants={imageRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
