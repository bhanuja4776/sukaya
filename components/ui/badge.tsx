import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Small label/tag — category tags on product cards, the Trial Collection's
 * sale indicator. docs/design-system.md §2.2: sale/discount styling uses
 * sage tones, not the (optional, unused-by-default) terracotta accent.
 */
const BADGE_VARIANT = {
  neutral: "bg-sand-200 text-ink-600",
  sage: "bg-sage-200 text-sage-900",
} as const;

export type BadgeVariant = keyof typeof BADGE_VARIANT;

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

export function Badge({ variant = "neutral", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 text-label font-medium uppercase tracking-wide",
        BADGE_VARIANT[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
