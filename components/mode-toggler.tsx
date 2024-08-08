"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { Button } from "@/ui/button";

export function ModeToggler() {
    const { theme, setTheme } = useTheme();
    const [mounted, setmounted] = useState(false);

    useEffect(() => {
        setmounted(true);
    }, []);

    if (!mounted) return;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    {theme === "dark" ? <Moon className="size-6" /> : <Sun className="size-6" />}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="bg-gradient min-w-32">
                <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                    Dark
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
ModeToggler.displayName = "ModeToggler";
