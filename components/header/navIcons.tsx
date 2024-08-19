"use client";
import { ClerkLoading, ClerkLoaded, useUser } from "@clerk/nextjs";
import { CreditCardIcon, LoaderCircleIcon } from "lucide-react";

import { Notifications } from "./notifications";
import { UserButton } from "./user-button";
import { OrgSwitcher } from "./switcher";
import { Searchbar } from "./searchbar";
import Link from "next/link";

type NavlinksProps = {};

export const NavIcons = ({}: NavlinksProps) => {
    const { user } = useUser();
    const isMe = user?.primaryEmailAddress?.emailAddress === process.env.NEXT_PUBLIC_EMAIL;

    return (
        <div className="flex-end print:hidden">
            <Notifications />

            <Searchbar />

            <Link href="/subscription">
                <CreditCardIcon />
            </Link>

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
