import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { Logo } from "@/components/layout/logo";
import { builtLinks, logEntries, needsInput, roadmap } from "@/lib/content/log";
import { createClient } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";

const accessStyles: Record<string, string> = {
    Public: "bg-success-secondary text-success-primary",
    Account: "bg-brand-primary text-brand-secondary",
    Admin: "bg-warning-secondary text-warning-primary",
};

const statusStyles: Record<string, string> = {
    "In progress": "bg-brand-primary text-brand-secondary",
    Next: "bg-warning-secondary text-warning-primary",
    Planned: "bg-tertiary text-tertiary",
};

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

            {/* Always-visible index of shipped pages + the date each went live */}
            <section className="mt-8 overflow-hidden rounded-2xl border border-secondary bg-secondary">
                <div className="border-b border-secondary px-5 py-3">
                    <h2 className="text-sm font-semibold text-primary">Pages shipped ({builtLinks.length})</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-secondary text-xs text-quaternary">
                                <th className="px-5 py-2.5 font-medium">Page</th>
                                <th className="px-5 py-2.5 font-medium">Path</th>
                                <th className="px-5 py-2.5 font-medium">Built</th>
                                <th className="px-5 py-2.5 font-medium">Access</th>
                            </tr>
                        </thead>
                        <tbody>
                            {builtLinks.map((link) => (
                                <tr key={link.path} className="border-b border-secondary last:border-0">
                                    <td className="px-5 py-2.5 font-medium text-primary">{link.label}</td>
                                    <td className="px-5 py-2.5">
                                        <Link href={link.path} className="font-mono text-brand-secondary hover:text-brand-secondary_hover">
                                            {link.path}
                                        </Link>
                                    </td>
                                    <td className="px-5 py-2.5 whitespace-nowrap text-tertiary">{formatDate(link.date).day}</td>
                                    <td className="px-5 py-2.5">
                                        <span className={cx("rounded-full px-2 py-0.5 text-xs font-medium", accessStyles[link.access])}>
                                            {link.access}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* What's next — forward action plan */}
            <section className="mt-12">
                <h2 className="text-sm font-semibold text-primary">What's next</h2>
                <div className="mt-4 flex flex-col gap-3">
                    {roadmap.map((item) => (
                        <div key={item.title} className="flex flex-col gap-2 rounded-2xl border border-secondary bg-secondary p-5 sm:flex-row sm:items-start sm:gap-4">
                            <span
                                className={cx(
                                    "w-fit rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap sm:mt-0.5",
                                    statusStyles[item.status],
                                )}
                            >
                                {item.status}
                            </span>
                            <div>
                                <h3 className="text-md font-semibold text-primary">{item.title}</h3>
                                <p className="mt-0.5 text-sm text-tertiary">{item.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-5 rounded-2xl border border-secondary bg-secondary p-5">
                    <h3 className="text-sm font-semibold text-primary">Needs your input</h3>
                    <ul className="mt-2 flex flex-col gap-1.5">
                        {needsInput.map((item) => (
                            <li key={item} className="text-sm text-tertiary">
                                • {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <h2 className="mt-12 text-sm font-semibold text-primary">Timeline</h2>
            <div className="mt-4 flex flex-col gap-10">
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
