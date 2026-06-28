import type { FC } from "react";
import { CalendarCheck01, LayoutAlt01, Palette, RefreshCcw01, SearchLg } from "@untitledui/icons";

/**
 * Canonical service list — shared by the home overview, /services, and
 * /services/[slug] detail pages. Static content (rarely changes).
 */
export interface Service {
    slug: string;
    title: string;
    summary: string;
    description: string;
    deliverables: string[];
    icon: FC<{ className?: string }>;
}

export const services: Service[] = [
    {
        slug: "web-design",
        title: "Conversion-focused web design",
        summary: "A fast, beautiful site built to turn browsers into booked stays.",
        description:
            "A conversion-focused website tailored to your property and your ideal guest — designed to look stunning and load fast on every device.",
        deliverables: ["Custom, mobile-first design", "Fast, SEO-ready pages", "Photo & content layout", "Accessibility built in"],
        icon: LayoutAlt01,
    },
    {
        slug: "booking-engine",
        title: "Direct booking engine",
        summary: "Take reservations and payments directly — with no per-booking commission.",
        description:
            "Let guests check live availability and pay you directly, with instant confirmations and no per-booking commission eating your margin.",
        deliverables: ["Real-time availability", "Secure payments via Stripe", "Instant booking confirmations", "Guest messaging-ready"],
        icon: CalendarCheck01,
    },
    {
        slug: "brand-identity",
        title: "Brand & identity",
        summary: "Logo, colours, and photography direction that make your stay unforgettable.",
        description: "A cohesive identity that makes your stay memorable, builds guest trust, and helps justify premium nightly rates.",
        deliverables: ["Logo & wordmark", "Colour & type system", "Photography direction", "Simple brand guidelines"],
        icon: Palette,
    },
    {
        slug: "channel-sync",
        title: "Channel & calendar sync",
        summary: "Keep Airbnb, Vrbo, and your direct calendar in sync to avoid double bookings.",
        description: "Keep every calendar aligned so you can confidently take direct bookings without ever fearing a double-booking.",
        deliverables: ["iCal / channel calendar sync", "Double-booking protection", "Rates & availability alignment", "Airbnb & Vrbo friendly"],
        icon: RefreshCcw01,
    },
    {
        slug: "seo-marketing",
        title: "SEO & guest marketing",
        summary: "Get found on Google and bring guests back with email and reviews.",
        description: "Get discovered on Google and turn one-time visitors into repeat, direct-booking guests with smart, low-effort marketing.",
        deliverables: ["On-page SEO setup", "Google Business profile help", "Email capture & newsletters", "Reviews & repeat-stay flows"],
        icon: SearchLg,
    },
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);
