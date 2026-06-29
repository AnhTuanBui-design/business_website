"use client";

import { useEffect, useState } from "react";
import { cx } from "@/utils/cx";

export interface TocItem {
    id: string;
    label: string;
    children?: { id: string; label: string }[];
}

/**
 * Sticky table of contents with scroll-spy: highlights the section currently
 * in view. Uses scroll position (rAF-throttled) against each section's top.
 */
export function LogToc({ items }: { items: TocItem[] }) {
    const [active, setActive] = useState<string>(items[0]?.id ?? "");

    useEffect(() => {
        const ids = items.flatMap((item) => [item.id, ...(item.children?.map((c) => c.id) ?? [])]);
        let ticking = false;

        const update = () => {
            ticking = false;
            const line = 130; // activation line from the top of the viewport
            let current = ids[0];
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= line) current = id;
            }
            setActive(current);
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [items]);

    const go = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
        setActive(id);
    };

    return (
        <aside className="hidden lg:block">
            <nav className="sticky top-8">
                <p className="text-xs font-semibold tracking-wide text-quaternary uppercase">On this page</p>
                <ul className="mt-3 flex flex-col gap-2 border-l border-secondary text-sm">
                    {items.map((item) => {
                        const childActive = item.children?.some((c) => c.id === active) ?? false;
                        const isActive = active === item.id || childActive;
                        return (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    onClick={(e) => go(e, item.id)}
                                    aria-current={isActive ? "true" : undefined}
                                    className={cx(
                                        "-ml-px block border-l-2 pl-3 transition-colors",
                                        isActive
                                            ? "border-brand font-semibold text-primary"
                                            : "border-transparent text-tertiary hover:border-brand hover:text-primary",
                                    )}
                                >
                                    {item.label}
                                </a>
                                {item.children && item.children.length > 0 && (
                                    <ul className="mt-1.5 flex flex-col gap-1.5 pl-3">
                                        {item.children.map((child) => {
                                            const isChildActive = active === child.id;
                                            return (
                                                <li key={child.id}>
                                                    <a
                                                        href={`#${child.id}`}
                                                        onClick={(e) => go(e, child.id)}
                                                        aria-current={isChildActive ? "true" : undefined}
                                                        className={cx(
                                                            "block text-xs transition-colors",
                                                            isChildActive ? "font-semibold text-brand-secondary" : "text-quaternary hover:text-primary",
                                                        )}
                                                    >
                                                        {child.label}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
