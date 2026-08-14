/**
 * "Skip to content" link — docs/ux-architecture.md §11. Visually hidden
 * until focused, so keyboard users don't have to tab through the full
 * header/nav on every page.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus-visible:not-sr-only
        focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50
        focus-visible:rounded-md focus-visible:bg-cream-0 focus-visible:px-4 focus-visible:py-2
        focus-visible:text-ink-900 focus-visible:shadow-float
      "
    >
      Skip to content
    </a>
  );
}
