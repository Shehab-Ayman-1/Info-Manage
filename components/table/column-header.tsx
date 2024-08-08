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
    const name = column.id.toUpperCase();

    return (
        <Button
            variant="ghost"
            className={cn(
                "p-0 text-base font-bold text-white hover:bg-primary hover:text-white dark:text-black print:text-black",
                smallSize && "text-sm",
                name === "ACTIONS" && "print:hidden",
            )}
            onClick={() => column.toggleSorting(isAsc)}
        >
            {name}
            <ArrowUpDownIcon className="ml-2 size-4 text-white hover:text-white dark:text-black" />
        </Button>
    );
};
