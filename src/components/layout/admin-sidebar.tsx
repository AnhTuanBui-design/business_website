"use client";

import type { FC } from "react";
import { BarChartSquare01, Briefcase01, File02, Inbox01, LinkExternal01, LogOut01, MessageQuestionCircle } from "@untitledui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/utils/cx";
import { Logo } from "./logo";

const navItems: { label: string; href: string; icon: FC<{ className?: string }> }[] = [
    { label: "Overview", href: "/admin", icon: BarChartSquare01 },
    { label: "Blog", href: "/admin/posts", icon: File02 },
    { label: "Work", href: "/admin/work", icon: Briefcase01 },
    { label: "FAQs", href: "/admin/faqs", icon: MessageQuestionCircle },
    { label: "Leads", href: "/admin/leads", icon: Inbox01 },
];

export const AdminSidebar = ({ name, email }: { name?: string | null; email?: string | null }) => {
    const pathname = usePathname();
    const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

    return (
        <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-secondary bg-secondary md:flex">
            <div className="px-5 py-5">
                <Link href="/admin" aria-label="Admin home">
                    <Logo />
                </Link>
            </div>

            <nav className="flex-1 px-3">
                <ul className="flex flex-col gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cx(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                        isActive(item.href)
                                            ? "bg-brand-primary text-brand-secondary"
                                            : "text-secondary hover:bg-primary_hover hover:text-primary",
                                    )}
                                >
                                    <Icon className="size-5 shrink-0" />
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="flex flex-col gap-3 border-t border-secondary p-3">
                <div className="px-2">
                    <p className="truncate text-sm font-medium text-primary">{name || "Admin"}</p>
                    {email && <p className="truncate text-xs text-tertiary">{email}</p>}
                </div>
                <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-secondary hover:bg-primary_hover hover:text-primary"
                >
                    <LinkExternal01 className="size-5 shrink-0" />
                    View site
                </Link>
                <form method="post" action="/auth/signout">
                    <button
                        type="submit"
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-secondary hover:bg-primary_hover hover:text-primary"
                    >
                        <LogOut01 className="size-5 shrink-0" />
                        Sign out
                    </button>
                </form>
            </div>
        </aside>
    );
};
