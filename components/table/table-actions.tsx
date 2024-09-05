"use client";
import { MoreHorizontalIcon } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import { DropdownMenuItem, DropdownMenuContent } from "@/ui/dropdown-menu";
import { DropdownMenu, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { Button } from "@/ui/button";
import { cn } from "@/utils/shadcn";

type TableActionsProps = {
    row: Row<any>;
    items: {
        Icon: any;
        text: string;
        onClick: (original: Record<string, any>) => void;
        className?: { button?: string; icon?: string };
    }[];
};

export const TableActions = ({ row, items }: TableActionsProps) => {
    const t = useTranslations("buttons");

    const isRestore = (text: string) => row.original.state === "restore" && text === "pay";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="print:hidden">
                <Button type="button" variant="ghost" className="flex-center m-auto dark:hover:!text-primary">
                    <MoreHorizontalIcon className="size-8 !text-rose-500" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-36">
                {items.map(({ Icon, text, className, onClick }) =>
                    isRestore(text) ? null : (
                        <DropdownMenuItem
                            onClick={() => onClick(row?.original)}
                            key={text}
                            className={cn(
                                "cursor-pointer text-lg font-bold rtl:flex-row-reverse",
                                className?.button === "cancel"
                                    ? "group !text-rose-500 hover:!bg-rose-100 dark:hover:!bg-rose-500 dark:hover:!text-rose-100"
                                    : className?.button,
                            )}
                        >
                            <Icon
                                className={cn(
                                    "mx-2 size-6 rtl:size-5",
                                    className?.icon === "cancel"
                                        ? "!text-rose-500 dark:group-hover:!text-rose-100"
                                        : className?.button,
                                )}
                            />
                            {t(text)}
                        </DropdownMenuItem>
                    ),
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
