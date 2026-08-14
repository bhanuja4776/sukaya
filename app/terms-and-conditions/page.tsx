import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { legal, brand } from "@/content/site";

export const metadata: Metadata = {
  title: `${legal.termsAndConditions.heading} — ${brand.name}`,
  description: legal.termsAndConditions.body,
};

/**
 * Terms and Conditions — Phase 5. Verified live-site state is "Coming
 * soon!" followed by a "Return and Refund Policy" heading with no body
 * text underneath it at all (docs/source-of-truth.md §A.7, §D.8).
 * Preserved verbatim, including the empty returns section — not filled
 * in with generated legal copy.
 */
export default function TermsAndConditionsPage() {
  return (
    <Container width="narrow" as="section" className="py-16 desktop:py-24">
      <h1 className="text-heading-1 text-ink-900">{legal.termsAndConditions.heading}</h1>
      <p className="mt-4 text-body text-ink-600">{legal.termsAndConditions.body}</p>

      <h2 className="mt-10 text-heading-3 text-ink-900">
        {legal.termsAndConditions.returnsHeading}
      </h2>
    </Container>
  );
}
