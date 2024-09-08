"use client";
import { ClerkLoading, ClerkLoaded, useUser } from "@clerk/nextjs";
import { LoaderCircleIcon } from "lucide-react";

import { QuickClientStatement } from "./quick-client-statement";
import { UserButton } from "./user/user-button";
import { OrgSwitcher } from "./user/switcher";
import { MenuHover } from "./menu-hover";
import { Searchbar } from "./searchbar";

type NavlinksProps = {};

export const NavIcons = ({}: NavlinksProps) => {
    const { user } = useUser();

    const isMe = user?.primaryEmailAddress?.emailAddress === process.env.NEXT_PUBLIC_EMAIL;

    return (
        <div className="flex-end">
            <MenuHover />

            <Searchbar />

            {isMe && <OrgSwitcher />}

            <div className="user">
                <ClerkLoading>
                    <LoaderCircleIcon className="animate-spin text-primary" />
                </ClerkLoading>

                <ClerkLoaded>
                    <UserButton />
                </ClerkLoaded>
            </div>

            <QuickClientStatement />
        </div>
    );
};
NavIcons.displayName = "NavIcons";
