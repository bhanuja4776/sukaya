# SUKAYA Motion System — Phase 2

**Status: DRAFT — documentation only. Framer Motion is not installed; no animation has been implemented.**

## 1. Motion philosophy

Motion exists to **guide attention, reveal content, and confirm interaction** — never to decorate. Every pattern below states its UX purpose; if a proposed animation in implementation doesn't map to one of these named patterns and a stated purpose, it shouldn't ship. Pacing is deliberately slower and calmer than typical SaaS/tech motion — this is the primary lever for "premium" over "flashy."

**Hard rules:**
- No infinite/looping decorative animation (no perpetual floating, pulsing, or shimmering elements).
- No animation triggers on every scroll pixel — reveals trigger once per element (first time it enters the viewport), not repeatedly.
- Only `transform` (translate/scale) and `opacity` are animated for performance — never `width`, `height`, `top`/`left`, or box-shadow spread (all layout-thrashing or non-GPU-accelerated).
- `prefers-reduced-motion: reduce` → every pattern below collapses to an instant state change (opacity/position set directly, 0ms), never fully removed content or broken layout.

## 2. Motion tokens **[SYSTEM]**

| Token | Value | Usage |
|---|---|---|
| `duration-fast` | 150ms | Micro-interactions: button hover, icon state change |
| `duration-base` | 300ms | Default transitions: card hover, link underline |
| `duration-slow` | 600ms | Section/content reveals |
| `duration-slower` | 900ms | Hero entrance, large image reveals |
| `ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default easing — smooth accelerate/decelerate |
| `ease-out-soft` | `cubic-bezier(0.16, 1, 0.3, 1)` | Reveals — fast start, long gentle settle (reads as "premium," not "snappy") |
| `ease-in-out-soft` | `cubic-bezier(0.45, 0, 0.15, 1)` | Parallax/continuous scroll-linked motion |
| `stagger-base` | 80ms | Delay between sibling elements in a staggered reveal (e.g. product grid cards) |

Nothing here uses spring/bounce easing — bounce reads as playful/game-like, which the brief explicitly rules out.

## 3. Named animation patterns

For each: purpose, trigger, properties, timing, and reduced-motion behavior.

### 3.1 `fade-up`
- **Purpose:** Introduce a content block (heading, paragraph, image) as the user scrolls to it — the workhorse reveal pattern used across most sections.
- **Trigger:** Element enters viewport (intersection threshold ~20% visible), fires once.
- **Properties:** `opacity` 0→1, `translateY` 24px→0.
- **Timing:** `duration-slow`, `ease-out-soft`.
- **Reduced motion:** Element renders at final state immediately, no transition.

### 3.2 `soft-scale`
- **Purpose:** Draw attention to an image or card on hover without feeling like a "3D flip" or aggressive zoom.
- **Trigger:** Pointer hover (desktop only — no equivalent needed on touch, tap goes straight to the interaction).
- **Properties:** `scale` 1→1.02 on the image/media element only (not the whole card, so text/price stays crisp and static).
- **Timing:** `duration-base`, `ease-standard`.
- **Reduced motion:** No scale change; hover state communicated via a static border/shadow shift instead (see `shadow-hover` in `design-system.md`).

### 3.3 `image-reveal`
- **Purpose:** A more editorial version of `fade-up` specifically for large hero/section imagery — creates a sense of the image being "unveiled" rather than popping in.
- **Trigger:** Element enters viewport, fires once.
- **Properties:** `opacity` 0→1 combined with a subtle `scale` 1.04→1 (image starts almost-imperceptibly larger and settles) — reads as depth/craftsmanship (ties to §5 below), not a zoom effect.
- **Timing:** `duration-slower`, `ease-out-soft`.
- **Reduced motion:** Final state immediately, no scale/opacity transition.

### 3.4 `product-hover`
- **Purpose:** Product card interactivity — confirms the card is clickable and surfaces the CTA without requiring a click.
- **Trigger:** Pointer hover on card (desktop); on touch devices, CTA is always visible (no hover-dependent UI on mobile).
- **Properties:** Image `soft-scale` (§3.2) + CTA button `opacity` 0→1 and `translateY` 8px→0.
- **Timing:** `duration-base`, `ease-standard`.
- **Reduced motion:** CTA is always visible (not hover-revealed) when reduced motion is on — this also happens to be a reasonable touch-device fallback pattern.

### 3.5 `parallax-layer`
- **Purpose:** The site's only scroll-linked continuous motion — used exclusively in the gallery/"Explore our stunning range" section and the hero background, to create depth (§5) without any literal 3D.
- **Trigger:** Scroll position, continuous while section is in view.
- **Properties:** Background/decorative image layer `translateY` at ~40% of foreground scroll speed (foreground content and text never parallax — only a single background image layer does).
- **Timing:** Directly scroll-linked (no fixed duration), `ease-in-out-soft` for any smoothing/lerp applied.
- **Reduced motion:** Disabled entirely — background layer renders static. This is the one pattern that's fully removed rather than instant-stated, since scroll-linked parallax has no meaningful "instant" equivalent and its absence doesn't break the layout.
- **Performance guard:** Limited to one parallax layer per page maximum, `will-change: transform` scoped narrowly and removed when out of view.

### 3.6 `nav-transition`
- **Purpose:** Header state change (transparent-over-hero → solid sticky bar on scroll) and mobile drawer open/close.
- **Trigger:** Scroll position (header) / tap (drawer).
- **Properties:** Header: `background-color`/`box-shadow` cross-fade (opacity-based, not color-interpolation animation) over `duration-base`. Drawer: `translateX` off-screen→on-screen (100%→0), with a backdrop `opacity` fade.
- **Timing:** `duration-base`, `ease-standard`.
- **Reduced motion:** Header state snaps instantly at scroll threshold; drawer appears/disappears without slide (opacity cross-fade only, `duration-fast`).

### 3.7 `button-interaction`
- **Purpose:** Micro-feedback confirming a button press/CTA interaction.
- **Trigger:** Hover (desktop) and active/press (all devices).
- **Properties:** Hover: `background-color`/border cross-fade + `translateY` -1px (a lift, not a bounce). Active/press: `scale` 1→0.98, instant release back to 1.
- **Timing:** Hover `duration-fast` `ease-standard`; press `100ms` linear (press feedback should feel immediate, not eased).
- **Reduced motion:** Color/border change only, no translate/scale.

### 3.8 `section-reveal` (composite pattern)
- **Purpose:** How a full homepage section (e.g. "About Sukaya") enters as a coordinated group rather than every child element firing `fade-up` independently and chaotically.
- **Trigger:** Section container enters viewport.
- **Properties:** Heading fades up first, then supporting text and image follow with `stagger-base` (80ms) delay between each, each using its own `fade-up`/`image-reveal` pattern.
- **Timing:** Cumulative — total sequence stays under ~1.2s even with staggering, so it never feels sluggish.
- **Reduced motion:** All children appear simultaneously at final state.

### 3.9 `page-entrance`
- **Purpose:** Initial load of the homepage hero only (not applied to every page — most pages should feel instantly present, not staged, when navigated to from within the site).
- **Trigger:** Page/component mount, once.
- **Properties:** Logo/nav fade in first (`duration-fast`), then hero image `image-reveal`, then headline/subhead/CTA `fade-up` with `stagger-base`.
- **Timing:** Total under ~1.5s.
- **Reduced motion:** Everything present immediately, no staged sequence.

## 4. What's deliberately excluded

Per the brief's explicit exclusions, none of the following appear anywhere in this system: infinite particle effects, cursor-follow effects, spinning/rotating product renders, glow/pulse effects, page-transition wipes or dramatic reveals, scroll-jacking (hijacking native scroll behavior), text-splitting/letter-by-letter animation, and skeleton-loading shimmer beyond a plain neutral placeholder (see `component-system.md` for the awaiting-asset placeholder, which is static, not animated/shimmering).

## 5. 3D / Depth system

The brief asks for depth "as craftsmanship," not spectacle. This is achieved entirely through the patterns above plus static layout technique — no 3D library, no WebGL, no CSS 3D transforms/perspective beyond what's implicit in `parallax-layer`:

1. **Layered composition (static):** images allowed to overlap section boundaries (e.g. a product photo bleeding slightly into the whitespace of the next section) — a layout/z-index technique, zero motion required.
2. **Elevation via shadow (static):** the `shadow-rest` → `shadow-hover` → `shadow-float` scale (`design-system.md` §4.4) is the primary "this sits above the page" cue — warm, soft, low-opacity, never a hard drop-shadow.
3. **Scale-based foreground/background separation:** in composed image+text sections, the image is allowed to be measurably larger/closer-feeling than surrounding text blocks — depth through proportion, not effects.
4. **The one motion-based depth cue:** `parallax-layer` (§3.5), used exactly once per page maximum, at low intensity (40% scroll-speed differential is subtle — not the aggressive multi-layer parallax seen in "flashy" sites).
5. **`image-reveal`'s micro-scale-in** (§3.3) is the only place an image "moves toward" the viewer, and it settles within under a second — a craftsmanship cue (like unwrapping something), not a spectacle.

**Explicit non-goals:** no product ever appears to float, rotate, or exist in its own 3D scene. No tilt-on-hover ("card tilts toward cursor") effects — these were considered and rejected as reading closer to "gaming UI" than "editorial skincare." The real product photography (once available, see Blockers) stays flat, well-lit, and photographic — its own quality carries the "premium" feeling, not a UI effect layered on top of it.

## 6. Implementation notes (for Phase 3 — not built yet)

- **Library:** Framer Motion (`motion` package), per the brief — not installed at this stage.
- **Pattern:** each named pattern above should become a reusable Framer Motion `variants` object (e.g. `fadeUpVariants`, `imageRevealVariants`) rather than inline animation props scattered per-component — keeps the system centrally editable and guarantees consistency.
- **Viewport triggers:** use Framer Motion's `whileInView` with `viewport={{ once: true, amount: 0.2 }}` for all `fade-up`/`image-reveal`/`section-reveal` patterns (matches "fires once" rule, §1).
- **Reduced motion:** implement once via Framer Motion's `useReducedMotion()` hook feeding a single shared "motion enabled" flag, rather than re-implementing the check in every component.
- **Performance:** avoid animating more than a handful of elements simultaneously on any given viewport (the `stagger-base` timing in §3.8/§3.9 is tuned partly for this) — reflects the brief's Core Web Vitals concern from Phase 1.

## 7. Cross-references

- Color/shadow tokens referenced above: `design-system.md` §2, §4.4
- Where each pattern applies per homepage/PDP section: `ux-architecture.md`
- Which components use which patterns: `component-system.md`
