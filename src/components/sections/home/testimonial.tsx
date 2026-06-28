import { Section } from "../section";

/**
 * Single featured testimonial. Placeholder copy — swap for a real quote.
 * (Later this can be pulled from the CMS alongside case studies.)
 */
export const Testimonial = () => {
    return (
        <Section muted>
            <figure className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
                <blockquote className="text-display-xs font-medium text-primary md:text-display-sm">
                    “Within three months of launching our direct site, a third of our bookings came straight to us — and we finally
                    stopped handing a cut of every stay to the platforms.”
                </blockquote>
                <figcaption className="flex flex-col items-center gap-3">
                    <span className="flex size-12 items-center justify-center rounded-full bg-brand-solid text-md font-semibold text-white">
                        JM
                    </span>
                    <div>
                        <div className="font-semibold text-primary">Jordan M.</div>
                        <div className="text-sm text-tertiary">Host · 3 properties, Lake Tahoe</div>
                    </div>
                </figcaption>
            </figure>
        </Section>
    );
};
