import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { Section } from "@/components/sections/section";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/content/site";

interface CaseStudy {
    slug: string;
    title: string;
    client: string | null;
    location: string | null;
    summary: string | null;
    cover_image_url: string | null;
    gallery: { url: string; alt?: string }[] | null;
    services: string[] | null;
    challenge: string | null;
    solution: string | null;
    results: { label: string; value: string }[] | null;
}

async function getCaseStudy(slug: string) {
    const supabase = await createClient();
    const { data } = await supabase.from("case_studies").select("*").eq("slug", slug).eq("status", "published").single();
    return data as CaseStudy | null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const study = await getCaseStudy(slug);
    if (!study) return {};
    return { title: `${study.title} — ${siteConfig.name}`, description: study.summary ?? undefined };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const study = await getCaseStudy(slug);
    if (!study) notFound();

    return (
        <Section>
            <article className="mx-auto max-w-3xl">
                <a href="/work" className="text-sm font-semibold text-brand-secondary hover:text-brand-secondary_hover">
                    ← All work
                </a>

                <header className="mt-6 flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-tertiary">
                        {study.client && <span>{study.client}</span>}
                        {study.location && <span>· {study.location}</span>}
                    </div>
                    <h1 className="text-display-sm font-semibold tracking-tight text-primary">{study.title}</h1>
                    {study.summary && <p className="text-lg text-tertiary">{study.summary}</p>}
                    {study.services && study.services.length > 0 && (
                        <ul className="mt-2 flex flex-wrap gap-2">
                            {study.services.map((service) => (
                                <li key={service} className="rounded-full bg-brand-primary px-3 py-1 text-xs font-medium text-brand-secondary">
                                    {service}
                                </li>
                            ))}
                        </ul>
                    )}
                </header>

                {study.cover_image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={study.cover_image_url} alt={study.title} className="mt-8 aspect-video w-full rounded-2xl object-cover" />
                )}

                {study.results && study.results.length > 0 && (
                    <div className="mt-10 grid gap-5 rounded-2xl border border-secondary bg-secondary p-6 sm:grid-cols-3">
                        {study.results.map((result) => (
                            <div key={result.label} className="flex flex-col gap-1 text-center">
                                <span className="text-display-xs font-semibold tracking-tight text-primary">{result.value}</span>
                                <span className="text-sm text-tertiary">{result.label}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-10 flex flex-col gap-8">
                    {study.challenge && (
                        <section>
                            <h2 className="text-lg font-semibold text-primary">The challenge</h2>
                            <p className="mt-2 whitespace-pre-line text-md text-tertiary">{study.challenge}</p>
                        </section>
                    )}
                    {study.solution && (
                        <section>
                            <h2 className="text-lg font-semibold text-primary">What we did</h2>
                            <p className="mt-2 whitespace-pre-line text-md text-tertiary">{study.solution}</p>
                        </section>
                    )}
                </div>

                {study.gallery && study.gallery.length > 0 && (
                    <div className="mt-10 grid gap-4 sm:grid-cols-2">
                        {study.gallery.map((image, i) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img key={i} src={image.url} alt={image.alt ?? study.title} className="w-full rounded-xl border border-secondary object-cover" />
                        ))}
                    </div>
                )}

                <div className="mt-12 flex flex-col items-start gap-3 border-t border-secondary pt-8 sm:flex-row">
                    <Button href="/contact" color="primary" size="lg">
                        Get a site like this
                    </Button>
                    <Button href="/work" color="secondary" size="lg">
                        See more work
                    </Button>
                </div>
            </article>
        </Section>
    );
}
