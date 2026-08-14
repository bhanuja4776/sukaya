"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { duration, easing } from "@/lib/motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cookieBanner } from "@/content/site";

const STORAGE_KEY = "sukaya-cookie-consent";

/**
 * Cookie consent banner — verbatim verified copy
 * (docs/source-of-truth.md §A.12). Non-blocking bottom bar, matching the
 * verified live-site pattern (not a full-page modal).
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Reading localStorage (an external, non-reactive browser API) on mount
    // and syncing it into state is the documented exception to
    // react-hooks/set-state-in-effect ("subscribe for updates from some
    // external system") — it can't be read during SSR/the initial render,
    // so there's no way to derive this without an effect.
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!stored) setVisible(true);
  }, []);

  function respond(choice: "accepted" | "declined") {
    window.localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-label={cookieBanner.heading}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: duration.base, ease: easing.standard }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-sand-200 bg-cream-0 shadow-float"
        >
          <Container width="wide">
            <div className="flex flex-col items-center gap-4 py-4 tablet:flex-row tablet:justify-between">
              <p className="text-body-sm text-ink-900">
                <span className="font-medium">{cookieBanner.heading}</span> {cookieBanner.body}
              </p>
              <div className="flex shrink-0 gap-3">
                <Button variant="ghost" onClick={() => respond("declined")}>
                  {cookieBanner.declineLabel}
                </Button>
                <Button variant="primary" onClick={() => respond("accepted")}>
                  {cookieBanner.acceptLabel}
                </Button>
              </div>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
