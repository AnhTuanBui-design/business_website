import { ChevronDown } from "@untitledui/icons";
import Link from "next/link";
import { faqs } from "@/lib/content/faq";
import { Section, SectionHeading } from "../section";

/**
 * Homepage FAQ — native <details> accordion (accessible, no client JS).
 * Content from lib/content/faq.ts; will move to Supabase when the admin CMS ships.
 */
export const Faq = () => {
    return (
        <Section muted>
            <SectionHeading
                eyebrow="FAQ"
                title="Questions, answered"
                description="Everything hosts usually ask before getting started. Still curious? We're happy to help."
            />

            <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3 md:mt-16">
                {faqs.map((item) => (
                    <details
                        key={item.question}
                        className="group rounded-2xl border border-secondary bg-primary px-5 open:pb-2 [&>summary]:cursor-pointer"
                    >
                        <summary className="flex list-none items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-primary [&::-webkit-details-marker]:hidden">
                            {item.question}
                            <ChevronDown className="size-5 shrink-0 text-fg-quaternary transition-transform duration-200 group-open:rotate-180" />
                        </summary>
                        <p className="pb-3 text-md text-tertiary">{item.answer}</p>
                    </details>
                ))}
            </div>

            <p className="mt-8 text-center text-md text-tertiary">
                Have another question?{" "}
                <Link href="/contact" className="font-semibold text-brand-secondary hover:text-brand-secondary_hover">
                    Get in touch
                </Link>
                .
            </p>
        </Section>
    );
};
