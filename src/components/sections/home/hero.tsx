import { ArrowRight, CheckCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

const trustPoints = ["No booking commissions", "Launch in 2–3 weeks", "You own everything"];

export const Hero = () => {
    return (
        <section className="relative overflow-hidden border-b border-secondary bg-primary">
            {/* Decorative brand glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-40 -z-0 mx-auto h-80 max-w-4xl rounded-full bg-brand-primary opacity-60 blur-3xl"
            />
            <div className="relative mx-auto flex max-w-container flex-col items-center gap-6 px-4 py-24 text-center md:px-8 md:py-32">
                <span className="rounded-full bg-brand-primary px-3 py-1 text-sm font-medium text-brand-secondary">
                    For short-term rental hosts
                </span>

                <h1 className="max-w-4xl text-display-lg font-semibold tracking-tight text-primary">
                    Get more direct bookings — and keep what you earn.
                </h1>

                <p className="max-w-2xl text-lg text-tertiary md:text-xl">
                    BookDirect Studio designs branded booking websites for Airbnb &amp; short-term rental hosts — so guests book with you
                    directly and you stop losing 15–20% of every stay to platform fees.
                </p>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <Button href="/contact" color="primary" size="xl" iconTrailing={<ArrowRight data-icon />}>
                        Get a free quote
                    </Button>
                    <Button href="/work" color="secondary" size="xl">
                        See our work
                    </Button>
                </div>

                <ul className="mt-4 flex flex-col items-center gap-x-6 gap-y-2 text-sm text-tertiary sm:flex-row">
                    {trustPoints.map((point) => (
                        <li key={point} className="flex items-center gap-2">
                            <CheckCircle className="size-5 text-fg-brand-primary" />
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
