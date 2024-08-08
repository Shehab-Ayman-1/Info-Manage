"use client";
import { MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Row } from "@tanstack/react-table";

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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="print:hidden">
                <Button variant="ghost" className="flex-center m-auto dark:hover:!text-primary">
                    <MoreHorizontalIcon className="size-8 !text-rose-500" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-36">
                {items.map(({ Icon, text, className, onClick }) => (
                    <DropdownMenuItem
                        onClick={() => onClick(row?.original)}
                        key={text}
                        className={cn(
                            "cursor-pointer text-lg font-bold",
                            className?.button === "cancel"
                                ? "group !text-rose-500 hover:!bg-rose-100 dark:hover:!bg-rose-500 dark:hover:!text-rose-100"
                                : className?.button,
                        )}
                    >
                        <Icon
                            className={cn(
                                "mr-2 size-6",
                                className?.icon === "cancel"
                                    ? "!text-rose-500 dark:group-hover:!text-rose-100"
                                    : className?.button,
                            )}
                        />
                        {text}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
