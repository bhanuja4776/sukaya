import type { Variants } from "motion/react";
import { duration, easing } from "@/lib/motion";

/**
 * Framer Motion variant objects for every named pattern in
 * docs/motion-system.md §3. Centralized here rather than inlined per
 * component, so the animation system stays consistent and editable in one
 * place (docs/motion-system.md §6, implementation notes).
 */

/** §3.1 fade-up — the default reveal for most content blocks. */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.outSoft },
  },
};

/** §3.3 image-reveal — for large hero/section imagery. */
export const imageRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slower, ease: easing.outSoft },
  },
};

/** §3.2 soft-scale — hover-only, applied directly via whileHover, not a variant pair. */
export const softScaleHover = {
  scale: 1.02,
  transition: { duration: duration.base, ease: easing.standard },
} as const;

/** §3.4 product-hover — CTA reveal paired with soft-scale on the media element. */
export const productCardCtaVariants: Variants = {
  rest: { opacity: 0, y: 8 },
  hover: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing.standard },
  },
};

/**
 * §3.8 section-reveal — parent container for a staggered group of children.
 * Pair with `fadeUpVariants`/`imageRevealVariants` on each child.
 */
export const sectionRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }, // lib/motion.ts staggerBase
  },
};

/** §3.9 page-entrance — hero-only mount sequence. */
export const pageEntranceContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};
