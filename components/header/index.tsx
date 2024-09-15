"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/ui/button";
import { NavLinks } from "./navLinks";
import { NavIcons } from "./icons";
import { Audio } from "./audio";
import { Logo } from "./logo";

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
    const { userId } = useAuth();

    return (
        <header className="relative !z-50 w-full rounded-xl border border-slate-400 bg-white p-4 shadow-md dark:border-slate-600 dark:bg-black">
            <div className="flex-between m-auto w-full max-w-screen-xl">
                <Logo />

                <Audio />

                {userId && <NavLinks />}

                {userId && <NavIcons />}

                {!userId && (
                    <div className="">
                        <Button type="button" variant="ghost">
                            <Link href="/sign-in">Login</Link>
                        </Button>
                        <Button type="button" variant="outline">
                            <Link href="/sign-up">Sign Up</Link>
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
};
Header.displayName = "Header";
