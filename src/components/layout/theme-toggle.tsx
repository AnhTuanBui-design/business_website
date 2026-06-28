"use client";

import { useEffect, useState } from "react";
import { Moon01, Sun } from "@untitledui/icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/base/buttons/button";

/**
 * Light/dark theme toggle. Renders a stable placeholder until mounted to
 * avoid hydration mismatch (theme is only known on the client).
 */
export const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const isDark = resolvedTheme === "dark";

    return (
        <Button
            size="sm"
            color="tertiary"
            aria-label="Toggle theme"
            iconLeading={mounted && isDark ? Sun : Moon01}
            onClick={() => setTheme(isDark ? "light" : "dark")}
        />
    );
};
