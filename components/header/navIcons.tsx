"use client";
import { CreditCardIcon, LoaderCircleIcon, ReceiptTextIcon } from "lucide-react";
import { ClerkLoading, ClerkLoaded, useUser } from "@clerk/nextjs";
import Link from "next/link";

import { QuickClientStatement } from "./quick-client-statement";
import { useModel } from "@/hooks/useModel";
import { Notifications } from "./notifications";
import { UserButton } from "./user-button";
import { OrgSwitcher } from "./switcher";
import { Searchbar } from "./searchbar";

type NavlinksProps = {};

export const NavIcons = ({}: NavlinksProps) => {
    const { onOpen } = useModel();
    const { user } = useUser();
    const isMe = user?.primaryEmailAddress?.emailAddress === process.env.NEXT_PUBLIC_EMAIL;

    return (
        <div className="flex-end print:hidden">
            <Searchbar />
            <Notifications />
            <ReceiptTextIcon onClick={() => onOpen("quick-client-statement")} />

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

            <QuickClientStatement />
        </div>
    );
};
NavIcons.displayName = "NavIcons";
