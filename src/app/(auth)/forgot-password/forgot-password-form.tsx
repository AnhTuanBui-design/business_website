"use client";

import { useActionState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { forgotPasswordAction } from "@/lib/actions/auth";
import type { AuthActionState } from "@/lib/actions/auth";
import { cx } from "@/utils/cx";

const initialState: AuthActionState = {};

export function ForgotPasswordForm() {
    const [state, action, isPending] = useActionState(forgotPasswordAction, initialState);

    if (state.success) {
        return (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-brand-secondary">
                    <svg className="size-6 text-fg-brand-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold text-primary">Check your inbox</h2>
                    <p className="text-sm text-tertiary">{state.message}</p>
                </div>
                <Button href="/login" color="secondary" size="md" className="w-full">
                    Back to sign in
                </Button>
            </div>
        );
    }

    return (
        <Form action={action} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <Input
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    isRequired
                    isInvalid={!!state.fieldErrors?.email}
                    hint={state.fieldErrors?.email?.[0]}
                />
            </div>

            {state.error && (
                <p className={cx("rounded-lg bg-error-secondary px-3 py-2 text-sm text-error-primary")}>
                    {state.error}
                </p>
            )}

            <Button type="submit" color="primary" size="lg" isLoading={isPending} showTextWhileLoading className="w-full">
                Send reset link
            </Button>
        </Form>
    );
}
