"use client";
import { CreditCardIcon, MoreHorizontalIcon, ReceiptTextIcon, Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useKey } from "react-use";
import Link from "next/link";

import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Tooltip } from "@/components/ui/tooltip";
import { useModel } from "@/hooks/useModel";
import { Notifications } from "./notifications";
import { useRef } from "react";
import { PopoverClose } from "@radix-ui/react-popover";

export const MenuHover = () => {
    const { onOpen } = useModel();
    const text = useTranslations();

    const triggerRef = useRef<HTMLButtonElement>(null);

    const onOpenQuickClientStatement = () => onOpen("quick-client-statement-model");
    const onOpenMenu = () => triggerRef.current?.click();

    useKey((event) => event.ctrlKey && event.key.toLowerCase() === "m", onOpenQuickClientStatement);
    useKey((event) => event.key === "Tab", onOpenMenu);

    return (
        <Popover>
            <PopoverTrigger ref={triggerRef}>
                <Tooltip content="Tab">
                    <MoreHorizontalIcon onMouseEnter={onOpenMenu} />
                </Tooltip>
            </PopoverTrigger>

            <PopoverContent className="flex flex-col">
                <Notifications />

                <Tooltip content="CTRL + M">
                    <PopoverClose
                        onClick={onOpenQuickClientStatement}
                        className="group flex cursor-pointer items-center gap-2 rounded-md p-2 text-start text-lg hover:bg-primary-100 hover:text-black"
                    >
                        <ReceiptTextIcon className="group-hover:text-black" />
                        {text("header.icons.quick-statement")}
                    </PopoverClose>
                </Tooltip>

                <PopoverClose asChild>
                    <Link
                        href="/subscription"
                        className="group flex cursor-pointer gap-2 rounded-md p-2 text-start text-lg hover:bg-primary-100 hover:text-black"
                    >
                        <CreditCardIcon className="group-hover:text-black" />
                        {text("header.icons.subscriptions")}
                    </Link>
                </PopoverClose>

                <PopoverClose asChild>
                    <Link
                        href="/trash"
                        className="group flex cursor-pointer gap-2 rounded-md p-2 text-start text-lg hover:bg-primary-100 hover:text-black"
                    >
                        <Trash2Icon className="group-hover:text-black" />
                        {text("header.icons.recycle-bin")}
                    </Link>
                </PopoverClose>
            </PopoverContent>
        </Popover>
    );
};

MenuHover.displayName = "MenuHover";
