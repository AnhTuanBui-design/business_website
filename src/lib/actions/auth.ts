"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { forgotPasswordSchema, loginSchema, signUpSchema, updatePasswordSchema } from "@/lib/validations/auth";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export type AuthActionState = {
    error?: string;
    fieldErrors?: Record<string, string[]>;
    success?: boolean;
    message?: string;
};

// ---------------------------------------------------------------------------
// Sign In
// ---------------------------------------------------------------------------
export async function signInAction(_prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
    const raw = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const parsed = loginSchema.safeParse(raw);
    if (!parsed.success) {
        return {
            fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
    });

    if (error) {
        return { error: error.message };
    }

    redirect("/dashboard");
}

// ---------------------------------------------------------------------------
// Sign Up
// ---------------------------------------------------------------------------
export async function signUpAction(_prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
    const raw = {
        fullName: formData.get("fullName") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const parsed = signUpSchema.safeParse(raw);
    if (!parsed.success) {
        return {
            fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
            emailRedirectTo: `${siteUrl}/auth/confirm`,
            data: { full_name: parsed.data.fullName },
        },
    });

    if (error) {
        return { error: error.message };
    }

    return {
        success: true,
        message: "Check your email to confirm your account.",
    };
}

// ---------------------------------------------------------------------------
// Forgot Password
// ---------------------------------------------------------------------------
export async function forgotPasswordAction(_prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
    const raw = {
        email: formData.get("email") as string,
    };

    const parsed = forgotPasswordSchema.safeParse(raw);
    if (!parsed.success) {
        return {
            fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    const supabase = await createClient();
    await supabase.auth.resetPasswordForEmail(parsed.data.email, {
        redirectTo: `${siteUrl}/auth/confirm?next=/update-password`,
    });

    // Always return a generic message — do not leak whether the email exists.
    return {
        success: true,
        message: "If an account exists for that email, we've sent a password reset link. Check your inbox.",
    };
}

// ---------------------------------------------------------------------------
// Update Password
// ---------------------------------------------------------------------------
export async function updatePasswordAction(_prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
    const raw = {
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    };

    const parsed = updatePasswordSchema.safeParse(raw);
    if (!parsed.success) {
        return {
            fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password: parsed.data.password });

    if (error) {
        return { error: error.message };
    }

    redirect("/dashboard");
}

// ---------------------------------------------------------------------------
// Sign Out
// ---------------------------------------------------------------------------
export async function signOutAction(): Promise<void> {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
}
