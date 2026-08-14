import type { ReactNode } from "react";

/** Screen-reader-only text — for icon-only controls, etc. (docs/design-system.md §9). */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
