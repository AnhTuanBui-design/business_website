"use client";

import { useState } from "react";
import { Menu01, XClose } from "@untitledui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { mainNav, primaryCta } from "@/lib/content/nav";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

/**
 * Marketing site header: logo, primary nav, theme toggle, auth + CTA.
 * Sticky with a translucent blurred background; collapses to a sheet on mobile.
 */
export const SiteHeader = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

    return (
        <header className="sticky top-0 z-50 border-b border-secondary bg-primary/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-container items-center justify-between gap-4 px-4 md:px-8">
                <Link href="/" aria-label={primaryCta.label} className="shrink-0">
                    <Logo />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-1 lg:flex">
                    {mainNav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cx(
                                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isActive(item.href) ? "text-brand-secondary" : "text-tertiary hover:text-primary",
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop actions */}
                <div className="hidden items-center gap-2 lg:flex">
                    <ThemeToggle />
                    <Button href="/login" color="link-gray" size="md">
                        Log in
                    </Button>
                    <Button href={primaryCta.href} color="primary" size="md">
                        {primaryCta.label}
                    </Button>
                </div>

                {/* Mobile trigger */}
                <div className="flex items-center gap-1 lg:hidden">
                    <ThemeToggle />
                    <Button
                        size="sm"
                        color="tertiary"
                        aria-label={open ? "Close menu" : "Open menu"}
                        iconLeading={open ? XClose : Menu01}
                        onClick={() => setOpen((v) => !v)}
                    />
                </div>
            </div>

            {/* Mobile sheet */}
            {open && (
                <div className="border-t border-secondary bg-primary lg:hidden">
                    <nav className="mx-auto flex max-w-container flex-col gap-1 px-4 py-4">
                        {mainNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={cx(
                                    "rounded-md px-3 py-2.5 text-md font-medium",
                                    isActive(item.href) ? "bg-secondary text-brand-secondary" : "text-secondary hover:bg-secondary",
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="mt-3 flex flex-col gap-2">
                            <Button href="/login" color="secondary" size="lg" onClick={() => setOpen(false)}>
                                Log in
                            </Button>
                            <Button href={primaryCta.href} color="primary" size="lg" onClick={() => setOpen(false)}>
                                {primaryCta.label}
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};
