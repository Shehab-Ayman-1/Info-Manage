import { ArrowUpDownIcon } from "lucide-react";
import { Column } from "@tanstack/react-table";

import { Button } from "@/ui/button";
import { cn } from "@/utils/shadcn";

type HeaderComponentProps<T> = {
    column: Column<T, unknown>;
    smallSize?: boolean;
};

export const HeaderComponent = <T,>({ column, smallSize }: HeaderComponentProps<T>) => {
    const isAsc = column.getIsSorted() === "asc";
    const name = column.id.replace(/([A-Z])/, "_$1");

    return (
        <Button
            type="button"
            variant="ghost"
            className={cn(
                "text-white hover:bg-primary hover:text-white dark:text-black print:text-black",
                "p-0 text-sm font-bold sm:text-base",
                smallSize && "text-sm",
                name === "actions" && "print:hidden",
            )}
            onClick={() => column.toggleSorting(isAsc)}
        >
            {name.toUpperCase()}
            <ArrowUpDownIcon className="ml-2 size-3 text-white hover:text-white dark:text-black sm:size-4" />
        </Button>
    );
};
