import { Compass } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { siteConfig } from "@/lib/content/site";

/**
 * Getaways Collective wordmark — text logo with a compass mark.
 * Swap the mark for an SVG logo later without touching layouts.
 */
export const Logo = ({ className }: { className?: string }) => {
    return (
        <span className={cx("inline-flex items-center gap-2", className)}>
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand-solid text-white">
                <Compass className="size-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-primary">{siteConfig.name}</span>
        </span>
    );
};
