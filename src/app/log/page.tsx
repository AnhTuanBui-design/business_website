import type { Metadata } from "next";
import { ArrowUpRight } from "@untitledui/icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { Logo } from "@/components/layout/logo";
import { builtLinks, logEntries, needsInput, openQuestions, roadmap, type BuiltLink } from "@/lib/content/log";
import { createClient } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";

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

/** A column of shipped links (label + arrow on the left, date on the right). */
function LinkColumn({ title, links }: { title: string; links: BuiltLink[] }) {
    return (
        <div>
            <h3 className="text-xs font-semibold tracking-wide text-quaternary uppercase">{title}</h3>
            <ul className="mt-2">
                {links.map((link) => (
                    <li key={link.path} className="border-b border-secondary last:border-0">
                        <Link href={link.path} className="group flex items-center justify-between gap-4 py-3">
                            <span className="flex items-center gap-1.5 text-md font-medium text-primary">
                                {link.label}
                                <ArrowUpRight className="size-4 text-fg-quaternary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                            <time className="shrink-0 text-sm text-tertiary">{formatDate(link.date).day}</time>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default async function LogPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") redirect("/");

    const publicLinks = builtLinks.filter((link) => link.access === "Public");
    const accountLinks = builtLinks.filter((link) => link.access !== "Public");

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

            <header className="mt-10">
                <p className="text-sm font-semibold tracking-wide text-brand-secondary uppercase">Build log</p>
                <h1 className="mt-2 text-display-md font-semibold tracking-tight text-primary">What we've built</h1>
                <p className="mt-3 text-lg text-tertiary">A running record of progress — pages shipped, work done each day, and what's next.</p>
            </header>

            {/* Pages shipped — two columns (Public / Account & admin), label + date */}
            <section className="mt-10 rounded-2xl border border-secondary p-6 md:p-8">
                <h2 className="text-xs font-semibold tracking-wide text-quaternary uppercase">Pages built &amp; when ({builtLinks.length})</h2>
                <div className="mt-6 grid gap-x-12 gap-y-8 sm:grid-cols-2">
                    <LinkColumn title="Public" links={publicLinks} />
                    <LinkColumn title="Account & admin (login)" links={accountLinks} />
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

            {/* 5 questions to move forward — refreshed only on request */}
            <section className="mt-12">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-sm font-semibold text-primary">5 questions to move forward</h2>
                    <span className="text-xs text-quaternary">Updated {formatDate(openQuestions.updated).day}</span>
                </div>
                <ol className="mt-4 flex flex-col gap-3">
                    {openQuestions.questions.map((question, i) => (
                        <li key={i} className="flex gap-4 rounded-2xl border border-secondary bg-secondary p-5">
                            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-solid text-sm font-semibold text-white">
                                {i + 1}
                            </span>
                            <p className="text-md text-secondary">{question}</p>
                        </li>
                    ))}
                </ol>
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
