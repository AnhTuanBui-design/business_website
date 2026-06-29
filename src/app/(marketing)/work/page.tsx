import type { Metadata } from "next";
import { ArrowUpRight, Briefcase01 } from "@untitledui/icons";
import Link from "next/link";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { PageHero, Section } from "@/components/sections/section";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
    title: `Work — ${siteConfig.name}`,
    description: "Direct-booking websites we've designed and built for short-term rental hosts.",
};

interface CaseStudyCard {
    slug: string;
    title: string;
    client: string | null;
    location: string | null;
    summary: string | null;
    cover_image_url: string | null;
    services: string[] | null;
}

export default async function WorkPage() {
    const supabase = await createClient();
    const { data } = await supabase
        .from("case_studies")
        .select("slug, title, client, location, summary, cover_image_url, services")
        .eq("status", "published")
        .order("sort_order", { ascending: true })
        .order("published_at", { ascending: false });

    const caseStudies = (data ?? []) as CaseStudyCard[];

    return (
        <>
            <PageHero
                eyebrow="Work"
                title="Sites that turn lookers into direct bookings"
                description="A selection of branded, direct-booking websites we've built for short-term rental hosts."
            />

            <Section>
                {caseStudies.length === 0 ? (
                    <div className="mx-auto flex max-w-md flex-col items-center gap-5 py-12 text-center">
                        <FeaturedIcon icon={Briefcase01} color="brand" theme="light" size="xl" />
                        <h2 className="text-xl font-semibold text-primary">Case studies coming soon</h2>
                        <p className="text-md text-tertiary">
                            We're putting together a showcase of recent host websites. In the meantime, we'd love to talk about yours.
                        </p>
                        <Button href="/contact" color="primary" size="lg">
                            Start your project
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2">
                        {caseStudies.map((study) => (
                            <Link
                                key={study.slug}
                                href={`/work/${study.slug}`}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-secondary bg-primary transition-colors hover:border-brand"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                {study.cover_image_url ? (
                                    <img src={study.cover_image_url} alt={study.title} className="aspect-video w-full object-cover" />
                                ) : (
                                    <div className="aspect-video w-full bg-secondary" />
                                )}
                                <div className="flex flex-1 flex-col gap-2 p-6">
                                    <div className="flex items-center gap-2 text-sm text-tertiary">
                                        {study.client && <span>{study.client}</span>}
                                        {study.location && <span>· {study.location}</span>}
                                    </div>
                                    <h2 className="flex items-center gap-1 text-lg font-semibold text-primary">
                                        {study.title}
                                        <ArrowUpRight className="size-4 text-fg-quaternary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </h2>
                                    {study.summary && <p className="text-md text-tertiary">{study.summary}</p>}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </Section>
        </>
    );
}
