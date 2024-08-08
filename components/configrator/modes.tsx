"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { SheetClose } from "@/ui/sheet";
import { Button } from "@/ui/button";

export const Modes = () => {
    const { setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return;

    return (
        <div className="my-6">
            <h1 className="text-2xl font-bold text-primary">Mode Toggleer</h1>
            <SheetClose className="flex-between my-8 w-full">
                <Button className="w-full py-9" variant="outline" onClick={() => setTheme("light")}>
                    Light <br /> Mode
                </Button>
                <Button className="w-full py-9" onClick={() => setTheme("dark")}>
                    Dark <br /> Mode
                </Button>
            </SheetClose>
        </div>
    );
};

Modes.displayName = "Modes";
