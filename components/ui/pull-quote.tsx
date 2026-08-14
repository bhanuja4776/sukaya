import type { ReactNode } from "react";

/**
 * docs/component-system.md §2 `PullQuote` — highlights one verified line of
 * copy at large scale. Content must always be existing verified text, never
 * new copy (docs/ux-architecture.md §2.3).
 */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <p className="text-heading-1 text-sage-700" style={{ fontWeight: 500 }}>
      {children}
    </p>
  );
}
