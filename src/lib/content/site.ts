/**
 * Central site configuration — single source of truth for brand identity,
 * contact details, and metadata. Static content (no DB round-trip).
 */
export const siteConfig = {
    // NOTE: display name is a placeholder — confirm your final brand name.
    name: "BookDirect Studio",
    shortName: "BookDirect",
    tagline: "Direct-booking websites for short-term rental hosts.",
    description:
        "BookDirect Studio designs branded, direct-booking websites for short-term rental and Airbnb hosts — so you own your guest relationships and keep more revenue instead of losing it to platform fees.",
    // Public site URL (override per-env via NEXT_PUBLIC_SITE_URL).
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    contact: {
        // Placeholder until you create the mailbox in Hostinger.
        email: "hello@bookdirect.studio",
        phone: "+1 (000) 000-0000",
        address: "Remote-first · Worldwide",
    },
    social: {
        instagram: "https://instagram.com/",
        x: "https://x.com/",
        linkedin: "https://linkedin.com/",
    },
} as const;

export type SiteConfig = typeof siteConfig;
