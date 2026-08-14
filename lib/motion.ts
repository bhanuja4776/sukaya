/**
 * Motion tokens — docs/motion-system.md §2.
 * Single source of truth for durations/easings so components never hardcode
 * raw animation values.
 */

export const duration = {
  fast: 0.15,
  base: 0.3,
  slow: 0.6,
  slower: 0.9,
} as const;

export const easing = {
  standard: [0.4, 0, 0.2, 1],
  outSoft: [0.16, 1, 0.3, 1],
  inOutSoft: [0.45, 0, 0.15, 1],
} as const;

/** docs/motion-system.md §2 — delay between staggered sibling reveals. */
export const staggerBase = 0.08;
