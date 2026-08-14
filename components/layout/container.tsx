import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Container widths — docs/design-system.md §4.2. Tailwind v4's container
 * theme namespace isn't used here (its exact behavior wasn't something this
 * foundation could verify against the docs' precise pixel values without
 * live access to confirm), so widths are set directly as documented —
 * still one definition, reused everywhere, not scattered per-component.
 */
const CONTAINER_WIDTH = {
  wide: "max-w-[1280px]", // section outer bounds, image-heavy layouts
  default: "max-w-[1120px]", // standard content sections
  narrow: "max-w-[720px]", // long-form text columns
  product: "max-w-[960px]", // PDP copy column
} as const;

export type ContainerWidth = keyof typeof CONTAINER_WIDTH;

interface ContainerProps {
  as?: ElementType;
  width?: ContainerWidth;
  className?: string;
  children: ReactNode;
}

export function Container({
  as: Tag = "div",
  width = "default",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 tablet:px-8 desktop:px-12",
        CONTAINER_WIDTH[width],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
