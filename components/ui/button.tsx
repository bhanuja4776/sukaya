"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { duration, easing } from "@/lib/motion";

/** Button variants — docs/design-system.md §6.1. */
const VARIANT_CLASSES = {
  primary:
    "bg-sage-700 text-cream-0 hover:bg-sage-900 disabled:bg-sage-200 disabled:text-ink-600",
  secondary:
    "border-[1.5px] border-sage-700 text-sage-700 bg-transparent hover:bg-sage-100 disabled:border-sand-200 disabled:text-ink-600",
  ghost:
    "bg-transparent text-sage-700 underline-offset-4 hover:underline disabled:text-ink-600",
} as const;

export type ButtonVariant = keyof typeof VARIANT_CLASSES;

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 " +
  "font-sans text-label font-medium uppercase tracking-wide " +
  "disabled:cursor-not-allowed disabled:opacity-40 " +
  "min-h-11 min-w-11"; // 44px minimum touch target, docs/design-system.md §9

/** docs/motion-system.md §3.7 `button-interaction` — hover lift + press scale. */
const buttonMotionProps = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.98 },
  transition: { duration: duration.fast, ease: easing.standard },
} as const;

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<HTMLMotionProps<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsAnchor = CommonProps &
  Omit<HTMLMotionProps<"a">, "className" | "children"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <motion.a href={href} className={classes} {...buttonMotionProps} {...anchorProps}>
        {children}
      </motion.a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <motion.button className={classes} {...buttonMotionProps} {...buttonProps}>
      {children}
    </motion.button>
  );
}
