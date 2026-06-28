/**
 * Pricing packages. PLACEHOLDER prices — update with your real numbers.
 * Static content; edit here to change the /pricing page and home teaser.
 */
export interface PricingTier {
    name: string;
    price: string;
    cadence: string;
    tagline: string;
    features: string[];
    cta: { label: string; href: string };
    highlighted?: boolean;
}

export const pricingTiers: PricingTier[] = [
    {
        name: "Launch",
        price: "$1,490",
        cadence: "one-time",
        tagline: "Everything a single property needs to start taking direct bookings.",
        features: ["1 property", "Custom branded website", "Direct booking & payments", "Calendar sync", "Basic SEO setup"],
        cta: { label: "Get started", href: "/contact" },
    },
    {
        name: "Growth",
        price: "$2,900",
        cadence: "one-time",
        tagline: "For hosts ready to grow direct revenue across a few listings.",
        features: [
            "Up to 3 properties",
            "Everything in Launch",
            "Brand identity package",
            "Advanced SEO & analytics",
            "Email capture & review flows",
        ],
        cta: { label: "Get started", href: "/contact" },
        highlighted: true,
    },
    {
        name: "Portfolio",
        price: "Custom",
        cadence: "let's talk",
        tagline: "For property managers and larger portfolios.",
        features: ["Unlimited properties", "Everything in Growth", "Channel manager integration", "Priority support", "Ongoing care plan"],
        cta: { label: "Book a call", href: "/contact" },
    },
];

/** Shown under the pricing grid. */
export const pricingNote = "Every plan: no revenue share, ever. Optional ongoing care plans available for updates and support.";
