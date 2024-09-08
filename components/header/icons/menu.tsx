"use client";
import { CreditCardIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";
import { useTranslations } from "next-intl";
import { useKey } from "react-use";
import { useRef } from "react";
import Link from "next/link";

import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Tooltip } from "@/components/ui/tooltip";

export const Menu = () => {
    const text = useTranslations();
    const triggerRef = useRef<HTMLButtonElement>(null);

    const onOpenMenu = () => triggerRef.current?.click();
    useKey((event) => event.key === "Tab", onOpenMenu);

    return (
        <Popover>
            <PopoverTrigger ref={triggerRef}>
                <Tooltip content="Tab">
                    <MoreHorizontalIcon />
                </Tooltip>
            </PopoverTrigger>

            <PopoverContent className="flex flex-col">
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

Menu.displayName = "Menu";
