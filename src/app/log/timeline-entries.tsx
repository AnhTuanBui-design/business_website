import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import type { LogEntry } from "@/lib/content/log";

function fmt(iso: string) {
    const d = new Date(`${iso}T00:00:00`);
    return {
        day: d.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
        year: d.toLocaleDateString("en-US", { year: "numeric" }),
        weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
    };
}

/**
 * Presentational timeline list (date on the left). Shared by the inline
 * "latest 5" view and the "full timeline" modal. Not a client component,
 * so the modal can import it and pass entries client-side without crossing
 * the server/client boundary with icon functions.
 */
export function TimelineEntries({ entries }: { entries: LogEntry[] }) {
    return (
        <div className="flex flex-col gap-10">
            {entries.map((entry) => {
                const date = fmt(entry.date);
                return (
                    <article key={entry.date} id={`day-${entry.date}`} className="flex scroll-mt-8 flex-col gap-4 md:flex-row md:gap-8">
                        <div className="shrink-0 md:w-32 md:pt-1 md:text-right">
                            <div className="text-md font-semibold text-primary">{date.day}</div>
                            <div className="text-sm text-tertiary">{date.year}</div>
                            <div className="text-xs text-quaternary">{date.weekday}</div>
                        </div>

                        <div className="flex-1 rounded-2xl border border-secondary bg-secondary p-6 md:p-8">
                            <h3 className="text-lg font-semibold text-primary">{entry.title}</h3>
                            {entry.summary && <p className="mt-1.5 text-md text-tertiary">{entry.summary}</p>}

                            <div className="mt-6 flex flex-col gap-6">
                                {entry.groups.map((group) => (
                                    <section key={group.heading} className="flex gap-4">
                                        <FeaturedIcon icon={group.icon} color="brand" theme="light" size="md" className="mt-0.5" />
                                        <div>
                                            <h4 className="text-sm font-semibold text-primary">{group.heading}</h4>
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
    );
}
