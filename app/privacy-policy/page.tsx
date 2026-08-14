import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { legal, brand } from "@/content/site";

export const metadata: Metadata = {
  title: `${legal.privacyPolicy.heading} — ${brand.name}`,
  description: legal.privacyPolicy.body,
};

/**
 * Privacy Policy — Phase 5. Verified live-site state is "Privacy Policy
 * coming soon", no policy body text exists yet (docs/source-of-truth.md
 * §A.6). Preserved verbatim, not filled in with generated legal copy.
 */
export default function PrivacyPolicyPage() {
  return (
    <Container width="narrow" as="section" className="py-16 desktop:py-24">
      <h1 className="text-heading-1 text-ink-900">{legal.privacyPolicy.heading}</h1>
      <p className="mt-4 text-body text-ink-600">{legal.privacyPolicy.body}</p>
    </Container>
  );
}
