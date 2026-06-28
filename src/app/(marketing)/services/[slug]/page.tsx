import type { Metadata } from "next";
import { ArrowRight, CheckCircle } from "@untitledui/icons";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { Section } from "@/components/sections/section";
import { getService, services } from "@/lib/content/services";
import { siteConfig } from "@/lib/content/site";

export function generateStaticParams() {
    return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = getService(slug);
    if (!service) return {};
    return {
        title: `${service.title} — ${siteConfig.name}`,
        description: service.summary,
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = getService(slug);
    if (!service) notFound();

    return (
        <Section>
            <div className="mx-auto max-w-3xl">
                <Link href="/services" className="text-sm font-semibold text-brand-secondary hover:text-brand-secondary_hover">
                    ← All services
                </Link>

                <div className="mt-6 flex flex-col gap-5">
                    <FeaturedIcon icon={service.icon} color="brand" theme="light" size="xl" />
                    <h1 className="text-display-sm font-semibold tracking-tight text-primary">{service.title}</h1>
                    <p className="text-lg text-tertiary">{service.description}</p>
                </div>

                <div className="mt-10 rounded-2xl border border-secondary bg-secondary p-6 md:p-8">
                    <h2 className="text-lg font-semibold text-primary">What's included</h2>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                        {service.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-md text-secondary">
                                <CheckCircle className="mt-0.5 size-5 shrink-0 text-fg-brand-primary" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Button href="/contact" color="primary" size="lg" iconTrailing={<ArrowRight data-icon />}>
                        Get a free quote
                    </Button>
                    <Button href="/pricing" color="secondary" size="lg">
                        See pricing
                    </Button>
                </div>
            </div>
        </Section>
    );
}
