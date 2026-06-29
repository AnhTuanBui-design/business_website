"use client";

import { useEffect, useState } from "react";
import { XClose } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { logEntries } from "@/lib/content/log";
import { TimelineEntries } from "./timeline-entries";

/** "Show full timeline" button → modal listing every timeline entry. */
export function AllTimelineModal() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <div className="mt-8">
                <Button color="secondary" size="md" onClick={() => setOpen(true)}>
                    Show full timeline ({logEntries.length} {logEntries.length === 1 ? "day" : "days"})
                </Button>
            </div>

            {open && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Full timeline"
                    className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-10 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                >
                    <div className="w-full max-w-3xl rounded-2xl bg-primary p-6 shadow-xl md:p-8" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between gap-4 border-b border-secondary pb-4">
                            <h2 className="text-lg font-semibold text-primary">Full timeline</h2>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label="Close"
                                className="flex size-9 items-center justify-center rounded-lg text-fg-quaternary hover:bg-primary_hover hover:text-fg-secondary"
                            >
                                <XClose className="size-5" />
                            </button>
                        </div>
                        <div className="mt-6">
                            <TimelineEntries entries={logEntries} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
