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

/** A shipped route, shown in the "Pages shipped" index at the top of /log. */
export interface BuiltLink {
    path: string;
    label: string;
    /** ISO date this page first shipped. */
    date: string;
    access: "Public" | "Account" | "Admin";
}

/** Every page we've built, with the date it shipped. Add new rows as we ship. */
export const builtLinks: BuiltLink[] = [
    { path: "/", label: "Home", date: "2026-06-28", access: "Public" },
    { path: "/services", label: "Services (+ 5 detail pages)", date: "2026-06-28", access: "Public" },
    { path: "/pricing", label: "Pricing", date: "2026-06-28", access: "Public" },
    { path: "/work", label: "Work / case studies", date: "2026-06-28", access: "Public" },
    { path: "/about", label: "About", date: "2026-06-28", access: "Public" },
    { path: "/privacy", label: "Privacy", date: "2026-06-28", access: "Public" },
    { path: "/terms", label: "Terms", date: "2026-06-28", access: "Public" },
    { path: "/login", label: "Log in", date: "2026-06-28", access: "Account" },
    { path: "/sign-up", label: "Sign up", date: "2026-06-28", access: "Account" },
    { path: "/forgot-password", label: "Forgot password", date: "2026-06-28", access: "Account" },
    { path: "/update-password", label: "Update password", date: "2026-06-28", access: "Account" },
    { path: "/dashboard", label: "Customer dashboard (placeholder)", date: "2026-06-28", access: "Account" },
    { path: "/admin", label: "Admin overview", date: "2026-06-28", access: "Admin" },
    { path: "/log", label: "Build log (this page)", date: "2026-06-28", access: "Admin" },
];

/** Forward-looking roadmap item shown in "What's next" on /log. */
export interface RoadmapItem {
    title: string;
    detail: string;
    status: "In progress" | "Next" | "Planned";
}

/** What we plan to build next, in priority order. */
export const roadmap: RoadmapItem[] = [
    {
        title: "Contact page + leads inbox",
        detail: 'Contact form that saves to Supabase, plus an admin inbox. Unblocks every "Get a quote" button.',
        status: "In progress",
    },
    {
        title: "Admin Work manager",
        detail: "Create, edit, and publish case studies with image upload, so the Work page fills up.",
        status: "Next",
    },
    { title: "FAQ manager", detail: "Edit FAQs from the dashboard; the home page and /faq read from the database.", status: "Planned" },
    { title: "Blog", detail: "Public articles + an admin editor (Markdown).", status: "Planned" },
    { title: "Customer dashboard", detail: "Account profile, settings, and avatar upload.", status: "Planned" },
    { title: "Launch polish", detail: "SEO metadata, sitemap & robots, social share images, and an accessibility pass.", status: "Planned" },
];

/** Decisions / tasks that need the owner's input. */
export const needsInput: string[] = [
    "Confirm real pricing (placeholder numbers are live now).",
    "Rotate the access tokens shared during setup.",
    "Have Privacy/Terms reviewed by a professional and set the Terms jurisdiction.",
    "Set up production email (SMTP) for auth and notification emails.",
];

/**
 * The 5 questions that would most unblock the next day of work.
 * PROTOCOL: only refresh `updated` + `questions` when the owner asks
 * "What 5 questions you need to move forward to work next day?".
 */
export const openQuestions: { updated: string; questions: string[] } = {
    updated: "2026-06-28",
    questions: [
        "What are the real pricing tiers and amounts? (Placeholder prices are live now.)",
        "When someone submits the contact form, should it also email you (set up SMTP/Resend), or just appear in the admin inbox?",
        "Can you share 1–3 real host projects (names, photos, results) for the Work page, or should we use anonymised samples for now?",
        "Do you have a logo file and brand photography, or should we keep the wordmark + placeholder imagery for launch?",
        "What's the must-have scope and target date for launch — does it include the blog and a newsletter sign-up, or are those post-launch?",
    ],
};

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
