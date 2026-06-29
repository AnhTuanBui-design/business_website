import type { Metadata } from "next";
import { ArrowUpRight } from "@untitledui/icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/layout/logo";
import { builtLinks, logEntries, needsInput, openQuestions, roadmap, type BuiltLink } from "@/lib/content/log";
import { createClient } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";
import { AllTimelineModal } from "./all-timeline-modal";
import { QuestionsEditor } from "./questions-editor";
import { TimelineEntries } from "./timeline-entries";

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
    return { day: d.toLocaleDateString("en-US", { day: "numeric", month: "short" }) };
}

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

const tocLinkClass = "-ml-px block border-l-2 border-transparent pl-3 text-tertiary transition-colors hover:border-brand hover:text-primary";

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

    const { data: answerRows } = await supabase.from("log_answers").select("idx, answer");
    const answers: Record<number, string> = {};
    (answerRows ?? []).forEach((row) => {
        if (row.answer != null) answers[row.idx] = row.answer;
    });

    const latestDays = logEntries.slice(0, 5);
    const hasMoreDays = logEntries.length > 5;

    return (
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
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

            <div className="mt-10 gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_200px]">
                {/* Main content */}
                <div className="min-w-0">
                    {/* Pages shipped */}
                    <section id="pages" className="scroll-mt-8 rounded-2xl border border-secondary p-6 md:p-8">
                        <h2 className="text-xs font-semibold tracking-wide text-quaternary uppercase">Pages built &amp; when ({builtLinks.length})</h2>
                        <div className="mt-6 grid gap-x-12 gap-y-8 sm:grid-cols-2">
                            <LinkColumn title="Public" links={publicLinks} />
                            <LinkColumn title="Account & admin (login)" links={accountLinks} />
                        </div>
                    </section>

                    {/* What's next */}
                    <section id="whats-next" className="mt-12 scroll-mt-8">
                        <h2 className="text-sm font-semibold text-primary">What's next</h2>
                        <div className="mt-4 flex flex-col gap-3">
                            {roadmap.map((item) => (
                                <div
                                    key={item.title}
                                    className="flex flex-col gap-2 rounded-2xl border border-secondary bg-secondary p-5 sm:flex-row sm:items-start sm:gap-4"
                                >
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

                    {/* 5 questions — editable, persisted, lock/unlock */}
                    <div id="questions" className="scroll-mt-8">
                        <QuestionsEditor questions={openQuestions.questions} answers={answers} updated={formatDate(openQuestions.updated).day} />
                    </div>

                    {/* Timeline — latest 5 days inline + full timeline in a modal */}
                    <section id="timeline" className="mt-12 scroll-mt-8">
                        <h2 className="text-sm font-semibold text-primary">Timeline {hasMoreDays && <span className="text-quaternary">(latest 5)</span>}</h2>
                        <div className="mt-4">
                            <TimelineEntries entries={latestDays} />
                        </div>
                        {hasMoreDays && <AllTimelineModal />}
                    </section>
                </div>

                {/* Sticky table of contents */}
                <aside className="hidden lg:block">
                    <nav className="sticky top-8">
                        <p className="text-xs font-semibold tracking-wide text-quaternary uppercase">On this page</p>
                        <ul className="mt-3 flex flex-col gap-2 border-l border-secondary text-sm">
                            <li>
                                <a href="#pages" className={tocLinkClass}>
                                    Pages built
                                </a>
                            </li>
                            <li>
                                <a href="#whats-next" className={tocLinkClass}>
                                    What's next
                                </a>
                            </li>
                            <li>
                                <a href="#questions" className={tocLinkClass}>
                                    5 questions
                                </a>
                            </li>
                            <li>
                                <a href="#timeline" className={tocLinkClass}>
                                    Timeline
                                </a>
                                <ul className="mt-2 flex flex-col gap-1.5 pl-3">
                                    {latestDays.map((entry) => (
                                        <li key={entry.date}>
                                            <a href={`#day-${entry.date}`} className="text-xs text-quaternary transition-colors hover:text-primary">
                                                {formatDate(entry.date).day}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </aside>
            </div>
        </div>
    );
}
