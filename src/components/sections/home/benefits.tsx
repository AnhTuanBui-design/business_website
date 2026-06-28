import { CoinsStacked01, Star01, Users01 } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { Section, SectionHeading } from "../section";

const benefits = [
    {
        icon: CoinsStacked01,
        title: "Keep more revenue",
        description: "Skip 15–20% OTA commissions on every stay. Direct bookings put that margin back in your pocket.",
    },
    {
        icon: Users01,
        title: "Own the guest relationship",
        description: "Collect guest emails, drive repeat stays, and market directly — with no platform standing in between.",
    },
    {
        icon: Star01,
        title: "Build a real brand",
        description: "A site that's unmistakably yours builds trust, earns reviews, and commands higher nightly rates.",
    },
];

export const Benefits = () => {
    return (
        <Section>
            <SectionHeading
                eyebrow="Why book direct"
                title="Stop renting your business from the platforms"
                description="Listing sites are great for discovery — but every booking costs you fees and a guest you never really own. A direct-booking site changes that."
            />
            <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3">
                {benefits.map((benefit) => (
                    <div key={benefit.title} className="flex flex-col items-start gap-4">
                        <FeaturedIcon icon={benefit.icon} color="brand" theme="light" size="lg" />
                        <h3 className="text-xl font-semibold text-primary">{benefit.title}</h3>
                        <p className="text-md text-tertiary">{benefit.description}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
};
