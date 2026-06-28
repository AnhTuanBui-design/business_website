import type { Metadata } from "next";
import { Benefits } from "@/components/sections/home/benefits";
import { CtaBand } from "@/components/sections/home/cta-band";
import { Faq } from "@/components/sections/home/faq";
import { Hero } from "@/components/sections/home/hero";
import { PricingTeaser } from "@/components/sections/home/pricing-teaser";
import { Process } from "@/components/sections/home/process";
import { Services } from "@/components/sections/home/services";
import { Stats } from "@/components/sections/home/stats";
import { Testimonial } from "@/components/sections/home/testimonial";
import { TrustBar } from "@/components/sections/home/trust-bar";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
    title: `${siteConfig.name} — Direct-booking websites for short-term rental hosts`,
    description: siteConfig.description,
};

export default function HomePage() {
    return (
        <>
            <Hero />
            <TrustBar />
            <Benefits />
            <Services />
            <Process />
            <Stats />
            <Testimonial />
            <PricingTeaser />
            <Faq />
            <CtaBand />
        </>
    );
}
