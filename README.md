# SUKAYA — website refurbishment

Refurbishment of the SUKAYA skincare website. Full project documentation — content/product/image inventories, source reconciliation, design system, UX architecture, motion system, and phase reports — lives in [`docs/`](./docs), starting with [`docs/source-of-truth.md`](./docs/source-of-truth.md).

Preserved source material (the client-supplied content PDF and an offline archive of the live site) lives in [`docs/sukaya-content.pdf`](./docs/sukaya-content.pdf) and [`reference/sukaya-site-archive/`](./reference/sukaya-site-archive/) — kept as-is, not modified.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion (`motion`). See [`docs/component-system.md`](./docs/component-system.md) for the full rationale.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Project structure

```
app/          Next.js App Router routes
components/
  ui/         Base primitives (Button, Badge, Container primitives, etc.)
  layout/     Container, Section
  motion/     Reusable Framer Motion primitives (docs/motion-system.md)
content/      Structured, verified site/product data — no fabricated content
lib/          Fonts, design tokens (motion durations/easing), utilities
public/       Static assets, including verified images copied from reference/
styles/       Global stylesheet + design tokens (Tailwind v4 CSS-first theme)
docs/         Full project documentation
reference/    Preserved source material (live-site archive)
```
