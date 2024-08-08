import { Fragment } from "react";
import Link from "next/link";

import { Button } from "@/ui/button";

const links = [
    { href: "/organizations", name: "List" },
    { href: "/organizations/profile", name: "Profile" },
    { href: "/organizations/create", name: "Create" },
];

type NavbarProps = {};

export const Navbar = ({}: NavbarProps) => {
    return (
        <header className="flex-between bg-gradient w-full rounded-xl border border-slate-600 p-4 shadow-md">
            <h1 className="text-gradient text-2xl font-extrabold">Organizations</h1>
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
