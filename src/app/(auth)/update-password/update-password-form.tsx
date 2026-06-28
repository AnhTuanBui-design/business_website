"use client";

import { useActionState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { updatePasswordAction } from "@/lib/actions/auth";
import type { AuthActionState } from "@/lib/actions/auth";
import { cx } from "@/utils/cx";

const initialState: AuthActionState = {};

export function UpdatePasswordForm() {
    const [state, action, isPending] = useActionState(updatePasswordAction, initialState);

    return (
        <Form action={action} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <Input
                    name="password"
                    type="password"
                    label="New password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    isRequired
                    isInvalid={!!state.fieldErrors?.password}
                    hint={state.fieldErrors?.password?.[0] ?? "Must be at least 8 characters"}
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <Input
                    name="confirmPassword"
                    type="password"
                    label="Confirm new password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    isRequired
                    isInvalid={!!state.fieldErrors?.confirmPassword}
                    hint={state.fieldErrors?.confirmPassword?.[0]}
                />
            </div>

            {state.error && (
                <p className={cx("rounded-lg bg-error-secondary px-3 py-2 text-sm text-error-primary")}>
                    {state.error}
                </p>
            )}

            <Button type="submit" color="primary" size="lg" isLoading={isPending} showTextWhileLoading className="w-full">
                Update password
            </Button>
        </Form>
    );
}
