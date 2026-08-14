/**
 * Navigation — verified to be exactly Home + Shop
 * (docs/source-of-truth.md §A.4). The live site's "More" menu is a
 * responsive overflow duplicate of these same two links, not additional
 * pages — not represented here as a separate nav item.
 */
export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
];
