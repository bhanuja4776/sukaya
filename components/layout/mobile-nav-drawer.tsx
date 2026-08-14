"use client";

import { useRef, type RefObject } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { duration, easing } from "@/lib/motion";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { navItems } from "@/content/navigation";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

/**
 * Mobile navigation drawer — docs/motion-system.md §3.6 `nav-transition`.
 * Hand-rolled (see hooks/use-focus-trap.ts) since the 21st.dev MCP server
 * is unavailable this session (docs/phase-3-foundation-report.md) and no
 * replacement dialog library is being installed to fill that gap.
 */
interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export function MobileNavDrawer({ open, onClose, triggerRef }: MobileNavDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(open, panelRef, triggerRef, onClose);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink-900/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base, ease: easing.standard }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col gap-8 bg-cream-50 p-6 shadow-float"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: duration.base, ease: easing.standard }}
          >
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-2 text-ink-900 hover:bg-sage-100"
              >
                <VisuallyHidden>Close menu</VisuallyHidden>
                <svg
                  aria-hidden="true"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <nav aria-label="Primary">
              <ul className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-heading-2 text-ink-900 hover:text-sage-700"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
