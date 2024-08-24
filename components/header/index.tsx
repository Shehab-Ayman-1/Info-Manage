"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/ui/button";
import { NavIcons } from "./icons";
import { NavLinks } from "./links";
import { Logo } from "./logo";

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
    const { userId } = useAuth();

    return (
        <header className="bg-gradient relative !z-50 w-full rounded-xl border border-slate-400 p-4 shadow-md contrast-[85%] dark:border-slate-600 dark:contrast-[115%]">
            <div className="flex-between m-auto w-full max-w-screen-xl">
                <Logo />

                {userId && <NavLinks />}

                {userId && <NavIcons />}

                {!userId && (
                    <div className="">
                        <Button variant="ghost">
                            <Link href="/sign-in">Login</Link>
                        </Button>
                        <Button variant="outline">
                            <Link href="/sign-up">Sign Up</Link>
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
};
Header.displayName = "Header";
