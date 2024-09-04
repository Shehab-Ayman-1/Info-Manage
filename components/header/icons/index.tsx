"use client";
import { CreditCardIcon, LoaderCircleIcon, ReceiptTextIcon } from "lucide-react";
import { ClerkLoading, ClerkLoaded, useUser } from "@clerk/nextjs";
import { useKey } from "react-use";
import Link from "next/link";

import { useModel } from "@/hooks/useModel";

import { QuickClientStatement } from "./quick-client-statement";
import { Tooltip } from "@/components/ui/tooltip";
import { UserButton } from "./user/user-button";
import { OrgSwitcher } from "./user/switcher";
import { Notifications } from "./notifications";
import { Searchbar } from "./searchbar";

type NavlinksProps = {};

export const NavIcons = ({}: NavlinksProps) => {
    const { onOpen } = useModel();
    const { user } = useUser();
    const isMe = user?.primaryEmailAddress?.emailAddress === process.env.NEXT_PUBLIC_EMAIL;

    const onOpenQuickClientStatement = () => onOpen("quick-client-statement-model");
    useKey((event) => event.ctrlKey && event.key.toLowerCase() === "m", onOpenQuickClientStatement);

    return (
        <div className="flex-end">
            <Searchbar />

            <Notifications />

            <Tooltip content="CTRL + M">
                <ReceiptTextIcon className="hover:text-slate-500" onClick={onOpenQuickClientStatement} />
            </Tooltip>

            <Link href="/subscription">
                <CreditCardIcon className="hover:text-slate-500" />
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
