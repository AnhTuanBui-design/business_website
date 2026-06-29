"use client";

import { useActionState } from "react";
import { CheckCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { submitContactAction, type ContactState } from "@/lib/actions/contact";

const initialState: ContactState = {};

export function ContactForm() {
    const [state, action, isPending] = useActionState(submitContactAction, initialState);

    if (state.success) {
        return (
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-secondary bg-secondary p-8">
                <FeaturedIcon icon={CheckCircle} color="success" theme="light" size="lg" />
                <h2 className="text-xl font-semibold text-primary">Thanks — message received</h2>
                <p className="text-md text-tertiary">
                    We'll get back to you shortly at the email you provided. In the meantime, feel free to keep exploring.
                </p>
            </div>
        );
    }

    return (
        <Form action={action} className="flex flex-col gap-5 rounded-2xl border border-secondary bg-secondary p-6 md:p-8">
            <Input
                name="name"
                label="Name"
                placeholder="Your name"
                autoComplete="name"
                isRequired
                isInvalid={!!state.fieldErrors?.name}
                hint={state.fieldErrors?.name?.[0]}
            />
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
            <Input name="company" label="Property or company (optional)" placeholder="e.g. Evergreen Cabins" autoComplete="organization" />
            <TextArea
                name="message"
                label="How can we help?"
                placeholder="Tell us about your property and what you'd like to achieve…"
                rows={5}
                isRequired
                isInvalid={!!state.fieldErrors?.message}
                hint={state.fieldErrors?.message?.[0]}
            />

            {state.error && <p className="rounded-lg bg-error-secondary px-3 py-2 text-sm text-error-primary">{state.error}</p>}

            <Button type="submit" color="primary" size="lg" isLoading={isPending} showTextWhileLoading className="w-full">
                Send message
            </Button>
        </Form>
    );
}
