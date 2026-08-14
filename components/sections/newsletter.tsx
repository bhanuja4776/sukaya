"use client";

import { useId, useState, type FormEvent } from "react";
import { Container } from "@/components/layout/container";
import { FadeUp } from "@/components/motion/fade-up";
import { Button } from "@/components/ui/button";
import { subscribe } from "@/content/site";

type SubmitState = "idle" | "submitting" | "success" | "error";

/**
 * Subscribe (newsletter) — verified copy only. No email provider is
 * connected (none is known/verified — docs/verification-checklist.md).
 * This implements the frontend state only, as instructed; the `onSubmit`
 * handler is a clearly-marked stand-in for a future real integration.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const fieldId = useId();
  const statusId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@")) {
      setState("error");
      return;
    }
    // TODO(integration): no newsletter/email provider is verified for
    // SUKAYA (docs/verification-checklist.md). Wire this to the real
    // provider once known — do not invent one in the meantime.
    setState("success");
  }

  return (
    <section className="bg-sage-900 py-16 desktop:py-20">
      <Container width="narrow">
        <FadeUp className="text-center">
          <h2 className="text-heading-1 text-cream-0">{subscribe.heading}</h2>
          <p className="mt-2 text-body text-cream-0/80">{subscribe.incentive}</p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 tablet:flex-row tablet:justify-center"
            noValidate
          >
            <label htmlFor={fieldId} className="sr-only">
              {subscribe.fieldLabel}
            </label>
            <input
              id={fieldId}
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (state !== "idle") setState("idle");
              }}
              placeholder={subscribe.fieldLabel}
              aria-describedby={statusId}
              aria-invalid={state === "error"}
              className="min-h-11 flex-1 rounded-pill border border-transparent bg-cream-0 px-5 py-3 text-body text-ink-900 outline-none focus-visible:border-sage-500"
            />
            <Button type="submit" variant="primary">
              {subscribe.submitLabel}
            </Button>
          </form>

          <p id={statusId} role="status" className="mt-3 min-h-6 text-body-sm text-cream-0/80">
            {state === "success" && "Thanks — you're on the list."}
            {state === "error" && "Please enter a valid email address."}
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}
