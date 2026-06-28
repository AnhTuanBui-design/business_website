import type { Metadata } from "next";
import { HeartHand, Users01, Key01, LineChartUp01 } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { PageHero, Section, SectionHeading } from "@/components/sections/section";
import { CtaBand } from "@/components/sections/home/cta-band";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
    title: `About — ${siteConfig.name}`,
    description:
        "We're a boutique web studio on a mission to help short-term rental hosts win direct bookings, own their guest relationships, and stop handing 15–20% of every booking to the OTAs.",
};

const values = [
    {
        icon: HeartHand,
        title: "Hosts first",
        description:
            "Everything we design and build is optimised for one outcome: more direct bookings for your property. Your goals come first — always.",
    },
    {
        icon: Key01,
        title: "You own everything",
        description:
            "Your site, your domain, your guest data. We hand you the keys and never hold your business hostage behind a subscription or proprietary platform.",
    },
    {
        icon: LineChartUp01,
        title: "Built to convert",
        description:
            "Beautiful design alone won't fill your calendar. Every page, CTA, and booking flow is crafted to turn visitors into confirmed, fee-free reservations.",
    },
    {
        icon: Users01,
        title: "Honest pricing",
        description:
            "One transparent build fee, no hidden monthly costs, no revenue share. What you earn stays with you — that's the whole point of going direct.",
    },
] as const;

export default function AboutPage() {
    return (
        <>
            <PageHero
                eyebrow="About"
                title="We're in the business of getting you out of theirs"
                description="BookDirect Studio is a boutique web studio built specifically for short-term rental hosts who are tired of handing 15–20% of every booking to Airbnb and Vrbo."
            />

            {/* Mission / Story */}
            <Section>
                <div className="mx-auto max-w-3xl">
                    <SectionHeading
                        eyebrow="Our mission"
                        title="Help hosts own their bookings — and their business"
                        align="left"
                    />
                    <div className="mt-8 flex flex-col gap-5 text-lg text-tertiary">
                        <p>
                            Short-term rental hosts work incredibly hard to deliver great guest experiences. Yet for every
                            booking that comes through an OTA, a substantial cut goes straight to the platform — not to
                            you. Over a full year of bookings, those fees add up to thousands of dollars that could have
                            stayed in your pocket.
                        </p>
                        <p>
                            We started {siteConfig.name} because we believe hosts deserve a better path. A branded,
                            direct-booking website gives guests a reason to book with you instead of through a
                            marketplace — and gives you something the platforms never will: a direct relationship with
                            the people who stay at your property.
                        </p>
                        <p>
                            When a guest books directly they share their email address, their preferences, and their
                            trust — data that makes every future booking easier and cheaper to earn. That&apos;s the
                            compounding advantage of going direct, and it&apos;s what we&apos;re here to help you build.
                        </p>
                    </div>
                </div>
            </Section>

            {/* Values */}
            <Section muted>
                <SectionHeading
                    eyebrow="Our values"
                    title="What we stand for"
                    description="Four principles that shape every site we build and every decision we make."
                />
                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {values.map((value) => (
                        <div key={value.title} className="flex flex-col gap-4">
                            <FeaturedIcon icon={value.icon} color="brand" theme="light" size="lg" />
                            <h3 className="text-lg font-semibold text-primary">{value.title}</h3>
                            <p className="text-md text-tertiary">{value.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Approach */}
            <Section>
                <div className="mx-auto max-w-3xl">
                    <SectionHeading
                        eyebrow="Our approach"
                        title="Simple process, real results"
                        align="left"
                    />
                    <ol className="mt-8 flex flex-col gap-8">
                        {[
                            {
                                step: "01",
                                heading: "Discovery call",
                                body: "We learn about your property, your guests, and your goals. No generic questionnaire — a real conversation so the site we build actually fits your hosting style.",
                            },
                            {
                                step: "02",
                                heading: "Design & build",
                                body: "We design a custom site around your brand and property, then build it on fast, reliable infrastructure. You review and approve every stage before we move on.",
                            },
                            {
                                step: "03",
                                heading: "Launch & hand-over",
                                body: "You go live with full ownership of the site, your domain, and your guest data. We walk you through everything, and we're a message away if you need us.",
                            },
                        ].map((item) => (
                            <li key={item.step} className="flex gap-6">
                                <span className="mt-0.5 shrink-0 text-xl font-semibold text-brand-tertiary">
                                    {item.step}
                                </span>
                                <div className="flex flex-col gap-1.5">
                                    <h3 className="text-lg font-semibold text-primary">{item.heading}</h3>
                                    <p className="text-md text-tertiary">{item.body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </Section>

            <CtaBand />
        </>
    );
}
