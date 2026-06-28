import { ArrowRight } from "@untitledui/icons";
import Link from "next/link";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { services } from "@/lib/content/services";
import { Section, SectionHeading } from "../section";

export const Services = () => {
    return (
        <Section muted>
            <SectionHeading
                eyebrow="What we do"
                title="Everything you need to take bookings directly"
                description="One studio for the whole stack — design, booking, brand, and the marketing that fills your calendar."
            />
            <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                    <div key={service.slug} className="flex flex-col gap-4 rounded-2xl border border-secondary bg-primary p-6">
                        <FeaturedIcon icon={service.icon} color="brand" theme="light" size="lg" />
                        <h3 className="text-lg font-semibold text-primary">{service.title}</h3>
                        <p className="flex-1 text-md text-tertiary">{service.summary}</p>
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-secondary hover:text-brand-secondary_hover"
                        >
                            Learn more
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                ))}
            </div>
            <div className="mt-10 flex justify-center">
                <Button href="/services" color="secondary" size="lg" iconTrailing={<ArrowRight data-icon />}>
                    Explore all services
                </Button>
            </div>
        </Section>
    );
};
