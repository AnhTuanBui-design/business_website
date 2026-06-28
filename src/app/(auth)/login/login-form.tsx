"use client";

import { useActionState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { signInAction } from "@/lib/actions/auth";
import type { AuthActionState } from "@/lib/actions/auth";
import { cx } from "@/utils/cx";

const initialState: AuthActionState = {};

export function LoginForm() {
    const [state, action, isPending] = useActionState(signInAction, initialState);

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

            <div className="flex flex-col gap-1.5">
                <Input
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    isRequired
                    isInvalid={!!state.fieldErrors?.password}
                    hint={state.fieldErrors?.password?.[0]}
                />
            </div>

            <div className="flex justify-end">
                <Button href="/forgot-password" color="link-color" size="sm">
                    Forgot password?
                </Button>
            </div>

            {state.error && (
                <p className={cx("rounded-lg bg-error-secondary px-3 py-2 text-sm text-error-primary")}>
                    {state.error}
                </p>
            )}

            <Button type="submit" color="primary" size="lg" isLoading={isPending} showTextWhileLoading className="w-full">
                Sign in
            </Button>
        </Form>
    );
}
