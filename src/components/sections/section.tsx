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
