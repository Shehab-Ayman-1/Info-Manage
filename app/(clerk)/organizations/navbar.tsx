import { Fragment } from "react";
import Link from "next/link";

import { Button } from "@/ui/button";

const links = [
    { name: "Overview", href: "/" },
    { name: "General", href: "/organizations" },
    { name: "Members", href: "/organizations/members" },
    { name: "Configs", href: "/organizations/configs" },
];

type NavbarProps = {};

export const Navbar = ({}: NavbarProps) => {
    return (
        <header className="flex-between bg-gradient mb-12 w-full rounded-xl border border-slate-400 p-4 shadow-md dark:border-slate-600">
            <h1 className="text-gradient text-2xl font-extrabold">Organization Settings</h1>
            <nav className="">
                {links.map(({ href, name }, index) => (
                    <Fragment key={name}>
                        {!!index && "/"}
                        <Button asChild variant="link" className="text-black dark:text-white">
                            <Link href={href}>{name}</Link>
                        </Button>
                    </Fragment>
                ))}
            </nav>
        </header>
    );
};

Navbar.displayName = "Navbar";
