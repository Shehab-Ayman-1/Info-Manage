"use client";
import { useEffect, useState } from "react";
import { SettingsIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { SheetContent, SheetDescription, SheetTitle } from "@/ui/sheet";
import { Sheet, SheetTrigger, SheetHeader } from "@/ui/sheet";
import { Button } from "@/ui/button";

import { Languages } from "./languages";
import { Themes } from "./themes";
import { Modes } from "./modes";

type ConfigratorProps = {};

export const Configrator = ({}: ConfigratorProps) => {
    const [theme, setTheme] = useState("");
    const { theme: themeHook } = useTheme();

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
            <SheetTrigger asChild className="fixed bottom-14 right-14 z-10 sm:bottom-20 sm:right-20 print:hidden">
                <Button asChild className="size-12 rounded-full p-2">
                    <SettingsIcon className="size-12 animate-spin !text-white hover:!text-white" />
                </Button>
            </SheetTrigger>

            <SheetContent className="bg-gradient">
                <SheetHeader>
                    <SheetTitle className="text-center text-2xl font-extrabold text-primary">Configrator</SheetTitle>
                    <SheetDescription className="text-center text-xs sm:text-base">
                        Choose Your Prefer Theme, Mode And Language.
                    </SheetDescription>
                </SheetHeader>

                <Themes setTheme={setTheme} />

                <Modes />

                <Languages />
            </SheetContent>
        </Sheet>
    );
};

Configrator.displayName = "Configrator";
