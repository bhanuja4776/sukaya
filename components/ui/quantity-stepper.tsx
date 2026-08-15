"use client";

/**
 * Shared quantity control — extracted in Phase 6 so the PDP purchase panel
 * and Cart line items use one implementation instead of two copies
 * (docs/phase-6-commerce-layer-report.md §7). Same pattern as Phase 4's
 * original PDP stepper: labeled buttons, `aria-live` count, 44px targets.
 */
interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  /** Product/line name, for accessible button labels. */
  label: string;
}

export function QuantityStepper({ value, onChange, min = 1, label }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center rounded-pill border border-sand-200">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease quantity of ${label}`}
        className="flex h-11 w-11 items-center justify-center text-ink-900 hover:bg-sage-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        –
      </button>
      <span aria-live="polite" className="min-w-8 text-center text-body text-ink-900">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label={`Increase quantity of ${label}`}
        className="flex h-11 w-11 items-center justify-center text-ink-900 hover:bg-sage-100"
      >
        +
      </button>
    </div>
  );
}
