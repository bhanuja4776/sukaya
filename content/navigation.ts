/**
 * Navigation. The live site's own nav was verified to be exactly Home +
 * Shop (docs/source-of-truth.md §A.4). This redesign adds two further
 * items — Ingredients and Find Your Ritual — because both now point to
 * real, fully-built pages backed entirely by verified content
 * (content/ingredients.ts, content/rituals.ts derive from the same sourced
 * product data as everything else), not placeholder or aspirational links.
 */
export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Ingredients", href: "/ingredients" },
  { label: "Find Your Ritual", href: "/ritual" },
];
