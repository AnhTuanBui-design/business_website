import Link from "next/link";
import { footerNav } from "@/lib/content/nav";
import { siteConfig } from "@/lib/content/site";
import { Logo } from "./logo";

/**
 * Marketing site footer: brand blurb, link columns, and legal line.
 */
export const SiteFooter = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-secondary bg-secondary">
            <div className="mx-auto max-w-container px-4 py-12 md:px-8 md:py-16">
                <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
                    <div className="max-w-sm">
                        <Logo />
                        <p className="mt-4 text-sm text-tertiary">{siteConfig.description}</p>
                        <p className="mt-4 text-sm text-tertiary">
                            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary">
                                {siteConfig.contact.email}
                            </a>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                        {footerNav.map((group) => (
                            <div key={group.title}>
                                <h3 className="text-sm font-semibold text-primary">{group.title}</h3>
                                <ul className="mt-3 flex flex-col gap-2">
                                    {group.items.map((item) => (
                                        <li key={item.href}>
                                            <Link href={item.href} className="text-sm text-tertiary hover:text-primary">
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 border-t border-secondary pt-8 text-sm text-tertiary">
                    © {year} {siteConfig.name}. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
