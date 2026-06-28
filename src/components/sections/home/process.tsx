import { Section, SectionHeading } from "../section";

const steps = [
    {
        n: "01",
        title: "Discovery & brand",
        description: "We learn your property, your ideal guest, and your goals — then shape a brand that fits.",
    },
    {
        n: "02",
        title: "Design & build",
        description: "We design and build your booking site, wired to take payments and sync your calendars.",
    },
    {
        n: "03",
        title: "Launch & get bookings",
        description: "We launch with SEO and analytics in place, and hand you a site you fully own.",
    },
];

export const Process = () => {
    return (
        <Section>
            <SectionHeading
                eyebrow="How it works"
                title="From listing-dependent to fully booked direct"
                description="A simple, guided process — most hosts go live in two to three weeks."
            />
            <ol className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3">
                {steps.map((step) => (
                    <li key={step.n} className="flex flex-col gap-4">
                        <span className="flex size-12 items-center justify-center rounded-full bg-brand-solid text-lg font-semibold text-white">
                            {step.n}
                        </span>
                        <h3 className="text-xl font-semibold text-primary">{step.title}</h3>
                        <p className="text-md text-tertiary">{step.description}</p>
                    </li>
                ))}
            </ol>
        </Section>
    );
};
