import { ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

export const CtaBand = () => {
    return (
        <section className="bg-primary">
            <div className="mx-auto max-w-container px-4 pb-20 md:px-8 md:pb-28">
                <div className="flex flex-col items-center gap-6 rounded-3xl border border-secondary bg-secondary px-6 py-16 text-center md:px-16">
                    <h2 className="max-w-2xl text-display-sm font-semibold tracking-tight text-primary">
                        Ready to own your bookings?
                    </h2>
                    <p className="max-w-xl text-lg text-tertiary">
                        Get a free, no-pressure quote. Tell us about your property and we'll show you what a direct-booking site could do for you.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button href="/contact" color="primary" size="xl" iconTrailing={<ArrowRight data-icon />}>
                            Get a free quote
                        </Button>
                        <Button href="/work" color="secondary" size="xl">
                            See our work
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
