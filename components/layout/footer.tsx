import Link from "next/link";
import { Container } from "@/components/layout/container";
import { navItems } from "@/content/navigation";
import { footer } from "@/content/site";

/**
 * Footer — verified copyright line only (docs/source-of-truth.md §B).
 * Privacy Policy / Terms and Conditions link to routes not built in this
 * phase (Phase 3B is homepage-only) — they will 404 until a later phase
 * builds those pages; not fabricating placeholder legal pages here.
 */
export function Footer() {
  return (
    <footer className="border-t border-sand-200 bg-cream-50 py-12">
      <Container width="wide">
        <div className="flex flex-col gap-6 tablet:flex-row tablet:items-center tablet:justify-between">
          <nav aria-label="Footer">
            <ul className="flex gap-6 text-body-sm text-ink-600">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-sage-700">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy-policy" className="hover:text-sage-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-sage-700">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </nav>
          <p className="text-body-sm text-ink-600">{footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
