import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Section vertical rhythm — docs/design-system.md §4.1: generous whitespace
 * between major sections (96–160px desktop, 64px mobile) is a deliberate
 * part of the "premium editorial" feeling, not a default.
 */
const SECTION_SPACING = {
  default: "py-16 desktop:py-24 desktop-lg:py-32",
  tight: "py-10 desktop:py-16",
} as const;

export type SectionSpacing = keyof typeof SECTION_SPACING;

interface SectionProps {
  as?: ElementType;
  spacing?: SectionSpacing;
  className?: string;
  children: ReactNode;
}

export function Section({
  as: Tag = "section",
  spacing = "default",
  className,
  children,
}: SectionProps) {
  return (
    <Tag className={cn(SECTION_SPACING[spacing], className)}>{children}</Tag>
  );
}
