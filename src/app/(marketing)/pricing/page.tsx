import type { Metadata } from "next";
import { ArrowRight, CheckCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { PageHero, Section } from "@/components/sections/section";
import { pricingNote, pricingTiers } from "@/lib/content/pricing";
import { siteConfig } from "@/lib/content/site";
import { cx } from "@/utils/cx";

export const metadata: Metadata = {
    title: `Pricing — ${siteConfig.name}`,
    description: "Simple, transparent packages for short-term rental hosts. One-time build, no revenue share — ever.",
};

export default function PricingPage() {
    return (
        <>
            <PageHero
                eyebrow="Pricing"
                title="Simple, transparent pricing"
                description="A one-time build with optional ongoing care. No revenue share — what you book is yours."
            />

            <Section>
                <div className="grid items-start gap-6 lg:grid-cols-3">
                    {pricingTiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={cx(
                                "flex flex-col gap-6 rounded-2xl border bg-primary p-6 md:p-8",
                                tier.highlighted ? "border-brand ring-1 ring-brand" : "border-secondary",
                            )}
                        >
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-primary">{tier.name}</h2>
                                    {tier.highlighted && (
                                        <span className="rounded-full bg-brand-primary px-2.5 py-0.5 text-xs font-semibold text-brand-secondary">
                                            Most popular
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-display-sm font-semibold tracking-tight text-primary">{tier.price}</span>
                                    <span className="text-sm text-tertiary">{tier.cadence}</span>
                                </div>
                                <p className="text-md text-tertiary">{tier.tagline}</p>
                            </div>

                            <ul className="flex flex-1 flex-col gap-3">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2 text-md text-secondary">
                                        <CheckCircle className="mt-0.5 size-5 shrink-0 text-fg-brand-primary" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                href={tier.cta.href}
                                color={tier.highlighted ? "primary" : "secondary"}
                                size="lg"
                                iconTrailing={<ArrowRight data-icon />}
                            >
                                {tier.cta.label}
                            </Button>
                        </div>
                    ))}
                </div>

                <p className="mx-auto mt-10 max-w-2xl text-center text-md text-tertiary">{pricingNote}</p>
            </Section>
        </>
    );
}
