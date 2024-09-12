"use client";
import { useEffect, useState } from "react";
import { SettingsIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Sheet, SheetTrigger, SheetContent } from "@/ui/sheet";
import { Languages } from "./languages";
import { Themes } from "./themes";
import { Header } from "./header";
import { Modes } from "./modes";

type ConfigratorProps = {};

export const Configrator = ({}: ConfigratorProps) => {
    const { theme: themeHook } = useTheme();
    const [theme, setTheme] = useState("");

    useEffect(() => {
        const defaultTheme = themeHook === "system" || themeHook === "dark" ? "orange" : "deep-purple";
        const theme = localStorage.getItem("theme-color") || defaultTheme;
        setTheme(theme);
    }, [themeHook]);

    useEffect(() => {
        if (!theme) return;
        localStorage.setItem("theme-color", theme);
        document.querySelector("html")?.setAttribute("data-theme-color", theme);
    }, [theme]);

    return (
        <Sheet>
            <SheetTrigger>
                <SettingsIcon className="cursor-pointer hover:text-slate-600" />
            </SheetTrigger>

            <SheetContent>
                <Header />

                <Themes setTheme={setTheme} />

                <Modes />

                <Languages />
            </SheetContent>
        </Sheet>
    );
};

Configrator.displayName = "Configrator";
