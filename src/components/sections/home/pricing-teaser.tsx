import { ArrowRight, CheckCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Section, SectionHeading } from "../section";

const included = ["Custom branded website", "Direct booking & payments", "Calendar sync", "SEO & analytics setup"];

export const PricingTeaser = () => {
    return (
        <Section>
            <SectionHeading
                eyebrow="Pricing"
                title="Simple, transparent packages"
                description="One-time build with optional ongoing care. No revenue share, ever — what you book is yours."
            />
            <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-8">
                <ul className="grid gap-3 sm:grid-cols-2">
                    {included.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-md text-secondary">
                            <CheckCircle className="size-5 shrink-0 text-fg-brand-primary" />
                            {item}
                        </li>
                    ))}
                </ul>
                <Button href="/pricing" color="primary" size="lg" iconTrailing={<ArrowRight data-icon />}>
                    See pricing
                </Button>
            </div>
        </Section>
    );
};
