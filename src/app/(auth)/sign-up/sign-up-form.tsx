"use client";

import { useActionState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { signUpAction } from "@/lib/actions/auth";
import type { AuthActionState } from "@/lib/actions/auth";
import { cx } from "@/utils/cx";

const initialState: AuthActionState = {};

export function SignUpForm() {
    const [state, action, isPending] = useActionState(signUpAction, initialState);

    if (state.success) {
        return (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-success-secondary">
                    <svg className="size-6 text-fg-success-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold text-primary">Check your email</h2>
                    <p className="text-sm text-tertiary">{state.message}</p>
                </div>
            </div>
        );
    }

    return (
        <Form action={action} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <Input
                    name="fullName"
                    type="text"
                    label="Full name"
                    placeholder="Jane Smith"
                    autoComplete="name"
                    isRequired
                    isInvalid={!!state.fieldErrors?.fullName}
                    hint={state.fieldErrors?.fullName?.[0]}
                />
            </div>

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

            <div className="flex flex-col gap-1.5">
                <Input
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    isRequired
                    isInvalid={!!state.fieldErrors?.password}
                    hint={state.fieldErrors?.password?.[0] ?? "Must be at least 8 characters"}
                />
            </div>

            {state.error && (
                <p className={cx("rounded-lg bg-error-secondary px-3 py-2 text-sm text-error-primary")}>
                    {state.error}
                </p>
            )}

            <Button type="submit" color="primary" size="lg" isLoading={isPending} showTextWhileLoading className="w-full">
                Create account
            </Button>
        </Form>
    );
}
