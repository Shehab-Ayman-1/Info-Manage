"use client";
import { ClerkLoading, ClerkLoaded, useUser } from "@clerk/nextjs";
import { LoaderCircleIcon } from "lucide-react";

import { Notifications } from "./notifications";
import { UserButton } from "./userButton";
import { OrgSwitcher } from "./switcher";
import { Searchbar } from "./searchbar";

type NavlinksProps = {};

export const NavIcons = ({}: NavlinksProps) => {
    const { user } = useUser();
    const isMe = user?.primaryEmailAddress?.emailAddress === process.env.NEXT_PUBLIC_EMAIL;

    return (
        <div className="flex-end print:hidden">
            <Notifications />
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
        </div>
    );
};
NavIcons.displayName = "NavIcons";
