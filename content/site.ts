/**
 * Site-level verified copy — verbatim from docs/source-of-truth.md /
 * docs/content-inventory.md. Every string here is quoted exactly as
 * sourced; nothing is paraphrased or newly written. Where a fact is
 * confirmed absent (e.g. no policy text exists), that state is recorded
 * explicitly rather than left to be reinvented later.
 */

export const brand = {
  name: "SUKAYA",
  tagline: "Embrace The Beauty Naturally", // docs/content-inventory.md §1.1 — logo lockup
} as const;

export const hero = {
  // docs/source-of-truth.md §A.1–A.3 — verified via the live-site archive's
  // raw HTML (H1/meta tags), resolving the PDF's illegible hero screenshot.
  headline: "Pure & Natural Skin Care Solutions",
  subheadline: "Discover natural, minimalistic skincare for radiant skin.",
  ctaLabel: "Shop Now",
} as const;

export const aboutSukaya = {
  philosophy:
    "At Sukaya, we believe in the power of nature. Our Hand crafted skincare products are designed to be natural, minimalistic, and potent. Our goal is to offer high-quality, natural, and organic skincare products without the unnecessary luxury price tags. Our Multitasking products are designed to streamline your routine while delivering real, effective skincare. We don't use harmful ingredients like parabens, phenoxyethanol, phthalates, propylene glycol, DEA,MEA,BHT, TEA etc. Our products are waterless & preservative free.",
  commitment:
    "At Sukaya, we prioritize the health of your skin while making your routine as easy, effective and enjoyable as possible. At the heart of our formulas are nature's most refined nutrients — untouched by synthetics and chosen for their potency and purity. Each application becomes more than skincare: it is a ritual of restoration, where vitality, balance, and timeless radiance are revealed. Most skincare products are 80% water but ours is 0%. That means our products are packed with 5x more vitamins, antioxidants, and essential fatty acids — giving your skin pure nourishment with less product, less waste, and more results.",
} as const;

export const aromatherapy = {
  heading: "Aromatherapy & Skincare",
  body: "Beyond simplicity, we also aim to incorporate aromatherapy into our products to enhance both your skincare regimen and overall well-being. Our founder, who has completed an Aromatherapy Practitioner Certificate including Specialist Certificate for Rejuvenating Skincare at the Australian College of Aromatherapy, understands the delicate balance of essential oils in skincare. Each essential oil is chosen with care, in precise & safe amounts, to deliver its unique benefits — nourishing your skin while uplifting your senses. Our facial products contain less than 1% essential oils, while body products use up to 2%. This careful balance ensures every formula is both safe and effective — delivering benefits without the risk of skin sensitisation.",
  // Founder's name is not given anywhere in the source material — see
  // docs/verification-checklist.md item 12. "Our founder" is used as-is.
} as const;

export const gallery = {
  heading: "Explore our stunning range of natural beauty",
} as const;

/**
 * "Raving Fans" — heading is verified to exist; content behind it is
 * verified EMPTY (docs/source-of-truth.md §A.11). Whether to omit this
 * section or ship a minimal honest placeholder is an open client decision
 * (docs/ux-architecture.md §4) — not resolved here, and no testimonial
 * content is invented under any circumstance.
 */
export const ravingFans = {
  heading: "Raving Fans",
  status: "NEEDS_CLIENT_DECISION" as const, // see docs/ux-architecture.md §4
} as const;

export const contact = {
  heading: "Contact Us",
  subheading: "Questions or Comments",
  body: "Are you looking for a specific item? Do you need recommendations ? Do you have any Questions? Send us a message, and we will get back to you soon!",
  addressLine: "SUKAYA",
  cityLine: "Melbourne VIC, Australia",
  email: "enquiries@sukaya.com.au",
  directionsLabel: "Get directions",
  // No fuller street address exists on the live site — this is the
  // confirmed, complete level of detail (docs/source-of-truth.md §A.8).
} as const;

export const subscribe = {
  heading: "Subscribe",
  fieldLabel: "Email Address",
  submitLabel: "Sign up",
  incentive: "Get 10% off your first purchase when you sign up for our newsletter!",
} as const;

export const cookieBanner = {
  // Verbatim — docs/source-of-truth.md §A.12.
  body: "We use cookies to analyze website traffic and optimize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data.",
  heading: "This website uses cookies.",
  acceptLabel: "Accept",
  declineLabel: "Decline",
} as const;

export const footer = {
  copyright: "Copyright © 2025 SUKAYA - All Rights Reserved.",
} as const;

/**
 * Privacy Policy / Terms and Conditions — verified to currently say
 * "coming soon" on the live site (docs/source-of-truth.md §A.6–A.7). This
 * is the real, current state to preserve, not a gap to fill with generated
 * legal copy.
 */
export const legal = {
  privacyPolicy: {
    heading: "Privacy Policy",
    body: "Privacy Policy coming soon",
  },
  termsAndConditions: {
    heading: "Terms and Conditions",
    body: "Coming soon!",
    returnsHeading: "Return and Refund Policy",
    returnsBody: null, // confirmed empty on the live site — not a gap in our sources
  },
} as const;
