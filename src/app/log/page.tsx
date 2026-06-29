import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { Logo } from "@/components/layout/logo";
import { logEntries } from "@/lib/content/log";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Build Log — BookDirect Studio",
    robots: { index: false, follow: false },
};

function formatDate(iso: string) {
    const d = new Date(`${iso}T00:00:00`);
    return {
        day: d.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
        year: d.toLocaleDateString("en-US", { year: "numeric" }),
        weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
    };
}

export default async function LogPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") redirect("/");

    return (
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-8">
            <div className="flex items-center justify-between gap-4">
                <Link href="/admin" aria-label="Admin home">
                    <Logo />
                </Link>
                <Link href="/admin" className="text-sm font-semibold text-brand-secondary hover:text-brand-secondary_hover">
                    ← Admin
                </Link>
            </div>

            <header className="mt-8">
                <h1 className="text-display-xs font-semibold tracking-tight text-primary">Build log</h1>
                <p className="mt-1 text-sm text-tertiary">A daily record of what we shipped. Newest first · admin only.</p>
            </header>

            <div className="mt-10 flex flex-col gap-10">
                {logEntries.map((entry) => {
                    const date = formatDate(entry.date);
                    return (
                        <article key={entry.date} className="flex flex-col gap-4 md:flex-row md:gap-8">
                            {/* Date — left column */}
                            <div className="shrink-0 md:w-36 md:pt-1 md:text-right">
                                <div className="text-md font-semibold text-primary">{date.day}</div>
                                <div className="text-sm text-tertiary">{date.year}</div>
                                <div className="text-xs text-quaternary">{date.weekday}</div>
                            </div>

                            {/* Content — right column */}
                            <div className="flex-1 rounded-2xl border border-secondary bg-secondary p-6 md:p-8">
                                <h2 className="text-lg font-semibold text-primary">{entry.title}</h2>
                                {entry.summary && <p className="mt-1.5 text-md text-tertiary">{entry.summary}</p>}

                                <div className="mt-6 flex flex-col gap-6">
                                    {entry.groups.map((group) => (
                                        <section key={group.heading} className="flex gap-4">
                                            <FeaturedIcon icon={group.icon} color="brand" theme="light" size="md" className="mt-0.5" />
                                            <div>
                                                <h3 className="text-sm font-semibold text-primary">{group.heading}</h3>
                                                <ul className="mt-2 flex flex-col gap-1.5">
                                                    {group.items.map((item) => (
                                                        <li key={item} className="text-sm text-tertiary">
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </section>
                                    ))}
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
