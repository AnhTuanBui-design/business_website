import type { Metadata } from "next";
import { ArrowRight } from "@untitledui/icons";
import Link from "next/link";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { PageHero, Section } from "@/components/sections/section";
import { services } from "@/lib/content/services";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
    title: `Services — ${siteConfig.name}`,
    description: "Web design, direct booking, brand, channel sync, and marketing — everything hosts need to take bookings directly.",
};

export default function ServicesPage() {
    return (
        <>
            <PageHero
                eyebrow="Services"
                title="One studio for your whole direct-booking stack"
                description="From a beautiful website to the booking engine, brand, and marketing that fills your calendar — we handle it end to end."
            />

            <Section>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="group flex flex-col gap-4 rounded-2xl border border-secondary bg-primary p-6 transition-colors hover:border-brand"
                        >
                            <FeaturedIcon icon={service.icon} color="brand" theme="light" size="lg" />
                            <h2 className="text-lg font-semibold text-primary">{service.title}</h2>
                            <p className="flex-1 text-md text-tertiary">{service.summary}</p>
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-secondary">
                                Learn more
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <Button href="/contact" color="primary" size="xl" iconTrailing={<ArrowRight data-icon />}>
                        Get a free quote
                    </Button>
                </div>
            </Section>
        </>
    );
}
