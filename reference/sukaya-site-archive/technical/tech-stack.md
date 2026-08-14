# Technical stack

## OBSERVED

- Platform: GoDaddy Website Builder 8.0.0000. Evidence: `<meta name="generator" content="Starfield Technologies; Go Daddy Website Builder 8.0.0000">` in every saved page.
- Rendering: server-rendered HTML plus GoDaddy UX/React widget bundles.
- Store: GoDaddy Online Store widget (`widget-shop-shop-1`, `ols-shop-container`).
- Public store API base exposed by page script: `https://online-store.api.godaddy.com/v1/accounts/ef52d3fd-20a0-4d24-8277-f423cfb9cf9b`.
- Image/CDN host: `img1.wsimg.com`.
- Fonts observed: Righteous and Josefin via Google Fonts references.
- Analytics/telemetry: GoDaddy Signals `scc-c2` and traffic assets.
- Cookie consent: first-party GoDaddy Website Builder cookie banner.

## NOT DETERMINED

- Payment provider and checkout processor were not exposed without a functioning product route/cart flow.
