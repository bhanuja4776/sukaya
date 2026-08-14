"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Accordion — docs/component-system.md §4 candidate #2. Hand-rolled since
 * the 21st.dev MCP server remains unauthenticated (unchanged this phase,
 * per instruction not to touch it) and no replacement library was
 * installed. Height animation is pure CSS (`grid-template-rows`), so it
 * respects the global `prefers-reduced-motion` fallback in
 * styles/globals.css without any extra JS.
 */
export interface AccordionItemData {
  title: string;
  content: ReactNode;
}

export function Accordion({ items }: { items: AccordionItemData[] }) {
  return (
    <div className="divide-y divide-sand-200 border-y border-sand-200">
      {items.map((item) => (
        <AccordionRow key={item.title} item={item} />
      ))}
    </div>
  );
}

function AccordionRow({ item }: { item: AccordionItemData }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between py-4 text-left text-heading-3 text-ink-900"
        >
          {item.title}
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={cn("shrink-0 transition-transform duration-300", open && "rotate-45")}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-hidden={!open}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pb-4 text-body text-ink-600">{item.content}</div>
        </div>
      </div>
    </div>
  );
}
