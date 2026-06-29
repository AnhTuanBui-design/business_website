import type { FC } from "react";
import { CheckCircle, Database01, LayoutAlt01, Rocket01, Shield01 } from "@untitledui/icons";

/**
 * Structured build log — powers the /log timeline page (admin-only).
 * Add a new entry on top each working day. Keep items short and scannable.
 */
export interface LogGroup {
    heading: string;
    icon: FC<{ className?: string }>;
    items: string[];
}

export interface LogEntry {
    /** ISO date, e.g. "2026-06-28". Rendered with the date on the left. */
    date: string;
    title: string;
    summary?: string;
    groups: LogGroup[];
}

export const logEntries: LogEntry[] = [
    {
        date: "2026-06-28",
        title: "Initial build — site, backend, auth, admin",
        summary: "Scaffolded everything and shipped the marketing site, Supabase backend, auth, and the admin foundation. Live in production.",
        groups: [
            {
                heading: "Setup & brand",
                icon: LayoutAlt01,
                items: [
                    "Scaffolded Next.js 16 + Tailwind v4 + Untitled UI Pro; wired Supabase, Netlify, GitHub.",
                    "Positioned as a B2B studio for short-term-rental hosts; named BookDirect Studio.",
                    "Bought bookdirect.studio + email; wrote PLAN.md, CLAUDE.md, and two subagents.",
                ],
            },
            {
                heading: "Marketing site",
                icon: CheckCircle,
                items: [
                    "Home with hero, services, process, stats, testimonial, pricing teaser, and FAQ.",
                    "Services (+ detail pages), Pricing, About, Privacy, Terms.",
                    "Public Work list + detail (reads case studies, with an empty state).",
                ],
            },
            {
                heading: "Backend",
                icon: Database01,
                items: [
                    "6 Supabase tables with RLS + storage buckets, applied via the Management API.",
                    "Admin account seeded and verified end-to-end.",
                ],
            },
            {
                heading: "Auth & admin",
                icon: Shield01,
                items: [
                    "Login, sign-up, forgot/update password (Zod-validated).",
                    "Role-guarded /admin shell with overview; role-aware post-login redirects.",
                ],
            },
            {
                heading: "Shipped",
                icon: Rocket01,
                items: [
                    "Deployed to https://bookdirect.studio (SSL, www→apex).",
                    "Linked GitHub → Netlify CI; adopted a branch + PR workflow for future changes.",
                ],
            },
        ],
    },
];
