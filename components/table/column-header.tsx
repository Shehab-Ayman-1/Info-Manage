import { useTranslations } from "next-intl";
import { ArrowUpDownIcon } from "lucide-react";
import { Column } from "@tanstack/react-table";

import { Button } from "@/ui/button";
import { cn } from "@/utils/shadcn";

type HeaderComponentProps<T> = {
    column: Column<T, unknown>;
    smallSize?: boolean;
    noPrint?: boolean;
};

export const HeaderComponent = <T,>({ column, noPrint, smallSize }: HeaderComponentProps<T>) => {
    const text = useTranslations("table");

    const isAsc = column.getIsSorted() === "asc";
    const name = column.id.replace(/([A-Z])/, "-$1").toLowerCase();

    console.log(name);

    return (
        <Button
            type="button"
            variant="ghost"
            onClick={() => column.toggleSorting(isAsc)}
            className={cn(
                "!p-0 font-bold text-black hover:bg-transparent hover:text-black print:text-black",
                "text-sm sm:text-base print:text-xs",
                smallSize && "sm:!text-sm",
                noPrint && "print:hidden",
            )}
        >
            {text(name)}
            <ArrowUpDownIcon className="mx-1 size-3 text-white hover:text-white dark:text-black sm:size-4 rtl:mt-2" />
        </Button>
    );
};
