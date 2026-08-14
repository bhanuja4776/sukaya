import { Container } from "@/components/layout/container";
import { FadeUp } from "@/components/motion/fade-up";
import { Button } from "@/components/ui/button";
import { contact } from "@/content/site";

/**
 * Contact Us — verified copy only (docs/source-of-truth.md §B). No phone
 * number, opening hours, or street address is shown because none is
 * verified anywhere in the source material — "Melbourne VIC, Australia"
 * plus a map centered on the city is the confirmed, complete level of
 * detail (docs/verification-checklist.md item 13).
 */
export function Contact() {
  const mapQuery = encodeURIComponent(`${contact.addressLine}, ${contact.cityLine}`);

  return (
    <section id="contact" className="py-16 desktop:py-24 desktop-lg:py-32">
      <Container width="default">
        <div className="grid gap-10 desktop:grid-cols-2 desktop:gap-16">
          <FadeUp>
            <h2 className="text-heading-1 text-ink-900">{contact.heading}</h2>
            <h3 className="mt-6 text-heading-3 text-ink-900">{contact.subheading}</h3>
            <p className="mt-2 max-w-prose text-body text-ink-600">{contact.body}</p>

            <address className="mt-6 not-italic text-body text-ink-900">
              <p>{contact.addressLine}</p>
              <p>{contact.cityLine}</p>
              <a href={`mailto:${contact.email}`} className="text-sage-700 underline">
                {contact.email}
              </a>
            </address>

            <div className="mt-6">
              <Button
                href={`https://www.google.com/maps?q=${mapQuery}`}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.directionsLabel}
              </Button>
            </div>
          </FadeUp>

          <FadeUp>
            <iframe
              title="SUKAYA location — Melbourne VIC, Australia"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-80 w-full rounded-lg border-0 shadow-rest desktop:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
