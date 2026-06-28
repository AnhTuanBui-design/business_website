import type { FC } from "react";
import { CalendarCheck01, LayoutAlt01, Palette, RefreshCcw01, SearchLg } from "@untitledui/icons";

/**
 * Canonical service list — shared by the home overview and the /services page.
 * Static content (rarely changes); edit here to update everywhere.
 */
export interface Service {
    slug: string;
    title: string;
    summary: string;
    icon: FC<{ className?: string }>;
}

export const services: Service[] = [
    {
        slug: "web-design",
        title: "Conversion-focused web design",
        summary: "A fast, beautiful site built to turn browsers into booked stays.",
        icon: LayoutAlt01,
    },
    {
        slug: "booking-engine",
        title: "Direct booking engine",
        summary: "Take reservations and payments directly — with no per-booking commission.",
        icon: CalendarCheck01,
    },
    {
        slug: "brand-identity",
        title: "Brand & identity",
        summary: "Logo, colours, and photography direction that make your stay unforgettable.",
        icon: Palette,
    },
    {
        slug: "channel-sync",
        title: "Channel & calendar sync",
        summary: "Keep Airbnb, Vrbo, and your direct calendar in sync to avoid double bookings.",
        icon: RefreshCcw01,
    },
    {
        slug: "seo-marketing",
        title: "SEO & guest marketing",
        summary: "Get found on Google and bring guests back with email and reviews.",
        icon: SearchLg,
    },
];
