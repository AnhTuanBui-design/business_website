import type { FC } from "react";
import type { Metadata } from "next";
import { ArrowRight, Briefcase01, File02, Inbox01, MessageQuestionCircle } from "@untitledui/icons";
import Link from "next/link";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Overview — Admin · BookDirect Studio",
};

export default async function AdminOverviewPage() {
    const supabase = await createClient();

    const [posts, caseStudies, faqs, leads, { data: profile }] = await Promise.all([
        supabase.from("posts").select("*", { count: "exact", head: true }),
        supabase.from("case_studies").select("*", { count: "exact", head: true }),
        supabase.from("faqs").select("*", { count: "exact", head: true }),
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.auth.getUser().then(async ({ data: { user } }) =>
            user ? await supabase.from("profiles").select("full_name").eq("id", user.id).single() : { data: null },
        ),
    ]);

    const firstName = profile?.full_name?.split(" ")[0];

    const stats: { label: string; count: number; icon: FC<{ className?: string }>; href: string }[] = [
        { label: "Blog posts", count: posts.count ?? 0, icon: File02, href: "/admin/posts" },
        { label: "Case studies", count: caseStudies.count ?? 0, icon: Briefcase01, href: "/admin/work" },
        { label: "FAQs", count: faqs.count ?? 0, icon: MessageQuestionCircle, href: "/admin/faqs" },
        { label: "Leads", count: leads.count ?? 0, icon: Inbox01, href: "/admin/leads" },
    ];

    return (
        <div className="mx-auto max-w-5xl">
            <header className="flex flex-col gap-1">
                <h1 className="text-display-xs font-semibold tracking-tight text-primary">
                    Welcome back{firstName ? `, ${firstName}` : ""}
                </h1>
                <p className="text-md text-tertiary">Manage your site content and view new enquiries.</p>
            </header>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Link
                        key={stat.label}
                        href={stat.href}
                        className="group flex flex-col gap-4 rounded-2xl border border-secondary bg-primary p-5 transition-colors hover:border-brand"
                    >
                        <div className="flex items-center justify-between">
                            <FeaturedIcon icon={stat.icon} color="brand" theme="light" size="md" />
                            <ArrowRight className="size-4 text-fg-quaternary transition-transform group-hover:translate-x-0.5" />
                        </div>
                        <div>
                            <div className="text-display-sm font-semibold tracking-tight text-primary">{stat.count}</div>
                            <div className="text-sm text-tertiary">{stat.label}</div>
                        </div>
                    </Link>
                ))}
            </div>

            <p className="mt-8 text-sm text-tertiary">
                Content management for Blog, Work, and FAQs is coming next — these tiles will link to full editors.
            </p>
        </div>
    );
}
