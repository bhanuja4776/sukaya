import { cn } from "@/lib/utils";

/**
 * Awaiting-Asset Placeholder — docs/component-system.md §5.
 *
 * Used wherever a verified product/section has no usable photography yet
 * (currently 8 of 10 products — docs/product-inventory.md). Deliberately
 * NOT a photo: no stock image, no AI-generated substitute, no blurred
 * stretch of an unrelated image. Must read as an obvious placeholder at a
 * glance. Static — no shimmer/skeleton-loading animation
 * (docs/motion-system.md §4).
 */
interface AwaitingAssetPlaceholderProps {
  /** Short context for screen-reader users, e.g. a product name. */
  label?: string;
  className?: string;
}

export function AwaitingAssetPlaceholder({
  label,
  className,
}: AwaitingAssetPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label ? `${label} — photography coming soon` : "Photography coming soon"}
      className={cn(
        "flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-md border border-sand-200 bg-sage-100 p-6 text-center",
        className,
      )}
    >
      <svg
        aria-hidden="true"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-sage-500"
      >
        {/* Single-stroke leaf glyph — decorative only, not a product likeness. */}
        <path d="M12 21c-4.5-1-8-4.8-8-10 5 0 9 3 9 8 0-6 4-9 8-9-.5 6-4 10-9 11Z" />
      </svg>
      <p className="text-body-sm text-ink-600">Product photography coming soon</p>
    </div>
  );
}
