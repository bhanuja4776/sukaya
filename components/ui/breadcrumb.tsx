import Link from "next/link";
import { Fragment } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** docs/ux-architecture.md §7 — Shop / [Category] / [Product Name], verified names only. */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-body-sm text-ink-600">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 && <span aria-hidden="true">/</span>}
            <li>
              {item.href ? (
                <Link href={item.href} className="hover:text-sage-700">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink-900">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
