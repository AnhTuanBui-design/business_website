import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

/**
 * Section wrapper — consistent vertical rhythm + centered container.
 * `muted` paints a secondary background for alternating bands.
 */
export const Section = ({
    id,
    children,
    className,
    muted = false,
}: {
    id?: string;
    children: ReactNode;
    className?: string;
    muted?: boolean;
}) => {
    return (
        <section id={id} className={cx(muted && "bg-secondary", className)}>
            <div className="mx-auto max-w-container px-4 py-16 md:px-8 md:py-24">{children}</div>
        </section>
    );
};

/** Inner-page hero — centered eyebrow/title/description with a soft brand glow. */
export const PageHero = ({
    eyebrow,
    title,
    description,
}: {
    eyebrow?: string;
    title: ReactNode;
    description?: ReactNode;
}) => {
    return (
        <section className="relative overflow-hidden border-b border-secondary bg-primary">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-32 -z-0 mx-auto h-64 max-w-3xl rounded-full bg-brand-primary opacity-50 blur-3xl"
            />
            <div className="relative mx-auto flex max-w-container flex-col items-center gap-4 px-4 py-20 text-center md:px-8 md:py-28">
                {eyebrow && <span className="text-sm font-semibold text-brand-secondary">{eyebrow}</span>}
                <h1 className="max-w-3xl text-display-md font-semibold tracking-tight text-primary">{title}</h1>
                {description && <p className="max-w-2xl text-lg text-tertiary md:text-xl">{description}</p>}
            </div>
        </section>
    );
};

/** Eyebrow + heading + description block used at the top of most sections. */
export const SectionHeading = ({
    eyebrow,
    title,
    description,
    align = "center",
    className,
}: {
    eyebrow?: string;
    title: ReactNode;
    description?: ReactNode;
    align?: "center" | "left";
    className?: string;
}) => {
    return (
        <div
            className={cx(
                "flex flex-col gap-4",
                align === "center" ? "mx-auto max-w-2xl items-center text-center" : "max-w-2xl",
                className,
            )}
        >
            {eyebrow && <span className="text-sm font-semibold text-brand-secondary">{eyebrow}</span>}
            <h2 className="text-display-sm font-semibold tracking-tight text-primary">{title}</h2>
            {description && <p className="text-lg text-tertiary">{description}</p>}
        </div>
    );
};
