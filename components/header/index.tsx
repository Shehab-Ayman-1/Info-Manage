"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

import { NavIcons } from "./navIcons";
import { Button } from "@/ui/button";
import { Logo } from "./logo";

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
    const { userId } = useAuth();

    return (
        <header className="bg-gradient z-10 w-full p-4 shadow-md">
            <div className="flex-between m-auto w-full max-w-screen-xl">
                <Logo />

                {userId && <NavIcons />}

                <div className={userId ? "hidden" : "flex-start"}>
                    <Button variant="ghost">
                        <Link href="/sign-in">Login</Link>
                    </Button>
                    <Button variant="outline">
                        <Link href="/sign-up">Sign Up</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
};
Header.displayName = "Header";
