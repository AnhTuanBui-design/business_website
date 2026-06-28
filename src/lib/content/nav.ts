/**
 * Navigation config for the marketing site — header, footer, and CTAs.
 * Kept static so links live in one place.
 */
export interface NavItem {
    label: string;
    href: string;
}

export const mainNav: NavItem[] = [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
    {
        title: "Explore",
        items: [
            { label: "Services", href: "/services" },
            { label: "Work", href: "/work" },
            { label: "Pricing", href: "/pricing" },
            { label: "Blog", href: "/blog" },
        ],
    },
    {
        title: "Company",
        items: [
            { label: "About", href: "/about" },
            { label: "FAQ", href: "/faq" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Legal",
        items: [
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
        ],
    },
];

/** Primary header call-to-action. */
export const primaryCta: NavItem = { label: "Plan your trip", href: "/contact" };
