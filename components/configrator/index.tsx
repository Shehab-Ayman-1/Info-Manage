"use client";
import { useEffect, useState } from "react";
import { SettingsIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Sheet, SheetTrigger, SheetContent } from "@/ui/sheet";
import { Button } from "@/ui/button";

import { Languages } from "./languages";
import { Themes } from "./themes";
import { Header } from "./header";
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
            <SheetTrigger asChild className="fixed bottom-14 right-10 z-10">
                <Button type="button" className="group size-10 rounded-full p-2 sm:size-12">
                    <SettingsIcon className="size-10 animate-spin !text-white duration-1000 hover:!text-white group-hover:animate-none sm:size-12" />
                </Button>
            </SheetTrigger>

            <SheetContent className="bg-gradient">
                <Header />
                <Themes setTheme={setTheme} />
                <Modes />
                <Languages />
            </SheetContent>
        </Sheet>
    );
};

Configrator.displayName = "Configrator";
