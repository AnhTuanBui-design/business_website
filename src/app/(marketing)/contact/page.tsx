import type { Metadata } from "next";
import { Clock, Mail01, MarkerPin01 } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { PageHero, Section } from "@/components/sections/section";
import { siteConfig } from "@/lib/content/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
    title: `Contact — ${siteConfig.name}`,
    description: "Tell us about your short-term rental and get a free, no-pressure quote for a direct-booking website.",
};

const details = [
    { icon: Mail01, label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: MarkerPin01, label: "Based", value: siteConfig.contact.address },
    { icon: Clock, label: "Response time", value: "Usually within 1 business day" },
];

export default function ContactPage() {
    return (
        <>
            <PageHero
                eyebrow="Contact"
                title="Let's get you booking direct"
                description="Tell us about your property and we'll send a free, no-pressure quote. No commitment, no hard sell."
            />

            <Section>
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className="flex flex-col gap-8">
                        <p className="text-lg text-tertiary">
                            Whether you have one cabin or a portfolio of rentals, we'd love to hear what you're building. Send a note and
                            we'll reply with next steps.
                        </p>
                        <ul className="flex flex-col gap-6">
                            {details.map((item) => (
                                <li key={item.label} className="flex items-start gap-4">
                                    <FeaturedIcon icon={item.icon} color="brand" theme="light" size="md" />
                                    <div>
                                        <div className="text-sm text-tertiary">{item.label}</div>
                                        {item.href ? (
                                            <a href={item.href} className="text-md font-medium text-primary hover:text-brand-secondary">
                                                {item.value}
                                            </a>
                                        ) : (
                                            <div className="text-md font-medium text-primary">{item.value}</div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <ContactForm />
                </div>
            </Section>
        </>
    );
}
