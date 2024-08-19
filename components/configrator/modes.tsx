"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

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
            <h1 className="text-xl font-bold text-primary sm:text-2xl">Mode Toggler</h1>
            <SheetClose className="flex-between my-8 w-full !flex-nowrap">
                <Button asChild className="w-full py-9" variant="outline" onClick={() => setTheme("light")}>
                    <p>
                        Light <br /> Mode
                    </p>
                </Button>
                <Button asChild className="w-full py-9" onClick={() => setTheme("dark")}>
                    <p>
                        Dark <br /> Mode
                    </p>
                </Button>
            </SheetClose>
        </div>
    );
};

Modes.displayName = "Modes";
