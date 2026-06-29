"use client";

import { useActionState, useEffect, useState } from "react";
import { Lock01, LockUnlocked01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { TextArea } from "@/components/base/textarea/textarea";
import { saveLogAnswersAction, type LogAnswersState } from "@/lib/actions/log";
import { cx } from "@/utils/cx";

const initialState: LogAnswersState = {};

/**
 * The "5 questions to move forward" — editable answers persisted to Supabase.
 * Locked (read-only) by default; the floating lock button (bottom-right)
 * unlocks editing. Saving re-locks. Answers feed the next day's work.
 */
export function QuestionsEditor({
    questions,
    answers,
    updated,
}: {
    questions: string[];
    answers: Record<number, string>;
    updated: string;
}) {
    const [editing, setEditing] = useState(false);
    const [state, formAction, isPending] = useActionState(saveLogAnswersAction, initialState);

    // Re-lock after a successful save.
    useEffect(() => {
        if (state.success) setEditing(false);
    }, [state.success]);

    return (
        <section className="mt-12">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-sm font-semibold text-primary">5 questions to move forward</h2>
                <span className="flex items-center gap-2 text-xs text-quaternary">
                    {editing ? "Unlocked — editing" : "Locked"} · updated {updated}
                </span>
            </div>

            <form action={formAction} className="mt-4 flex flex-col gap-3">
                {questions.map((question, i) => (
                    <div key={i} className="flex gap-4 rounded-2xl border border-secondary bg-secondary p-5">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-solid text-sm font-semibold text-white">
                            {i + 1}
                        </span>
                        <div className="flex-1">
                            <p className="text-md text-secondary">{question}</p>
                            <TextArea
                                name={`answer_${i}`}
                                defaultValue={answers[i] ?? ""}
                                isReadOnly={!editing}
                                rows={2}
                                aria-label={`Answer to question ${i + 1}`}
                                placeholder={editing ? "Type your answer…" : "No answer yet"}
                                className="mt-2"
                            />
                        </div>
                    </div>
                ))}

                {editing && (
                    <div className="flex items-center gap-3">
                        <Button type="submit" color="primary" size="md" isLoading={isPending} showTextWhileLoading>
                            Save answers
                        </Button>
                        <Button type="button" color="secondary" size="md" onClick={() => setEditing(false)}>
                            Cancel
                        </Button>
                        {state.error && <span className="text-sm text-error-primary">{state.error}</span>}
                    </div>
                )}
                {state.success && !editing && <span className="text-sm text-success-primary">Saved ✓</span>}
            </form>

            {/* Floating lock / unlock toggle */}
            <button
                type="button"
                onClick={() => setEditing((v) => !v)}
                aria-label={editing ? "Lock answers (stop editing)" : "Unlock to edit answers"}
                title={editing ? "Lock answers" : "Unlock to edit"}
                className={cx(
                    "fixed right-6 bottom-6 z-50 flex size-12 items-center justify-center rounded-full text-white shadow-lg transition-colors",
                    editing ? "bg-brand-solid hover:bg-brand-solid_hover" : "bg-primary-solid hover:opacity-90",
                )}
            >
                {editing ? <LockUnlocked01 className="size-5" /> : <Lock01 className="size-5" />}
            </button>
        </section>
    );
}
