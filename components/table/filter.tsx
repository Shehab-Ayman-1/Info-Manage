import { PopoverClose } from "@radix-ui/react-popover";
import { ElementRef, useRef, useState } from "react";
import { MoreHorizontalIcon } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";
import { Column } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import { Popover, PopoverTrigger, PopoverContent } from "@/ui/popover";
import { animate } from "@/constants";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { cn } from "@/utils/shadcn";

type FilterProps<TData> = {
    getColumn: (columnId: string) => Column<TData, unknown> | undefined;
    filterBy?: string[];
    data: any[];
};

export const Filter = <TData,>({ data, filterBy, getColumn }: FilterProps<TData>) => {
    const [filteredList, setFilteredList] = useState<any[]>([]);
    const [option, setOption] = useState(filterBy?.[0]);
    const [open, setOpen] = useState(false);
    const text = useTranslations("table");

    const listRef = useRef<ElementRef<"div">>(null);
    useOnClickOutside(listRef, () => setOpen(false));

    if (!option || !filterBy) return;
    const value = getColumn(option)?.getFilterValue() as string;

    const onInputChange = (event: any) => {
        const value = event.target.value;
        getColumn(option)?.setFilterValue(value);
        setFilteredList(() => {
            const uniqueNames = new Set(data.map((item) => item[option].includes(value) && item[option]));
            return Array.from(uniqueNames);
        });
        setOpen(true);
    };

    const onSelectedClick = (value: string) => {
        getColumn(option)?.setFilterValue(value);
        setFilteredList(() => {
            const uniqueNames = new Set(data.map((item) => item[option].includes(value) && item[option]));
            return Array.from(uniqueNames);
        });
        setOpen(false);
    };

    const onOptionChange = (item: string) => {
        getColumn(option)?.setFilterValue("");
        setFilteredList([]);
        setOption(item);
    };

    return (
        <div className="flex-center mb-2 w-full max-w-md !flex-nowrap">
            <Popover>
                {filterBy.length > 1 && (
                    <PopoverTrigger>
                        <Button asChild type="button" variant="outline" size="icon">
                            <span>
                                <MoreHorizontalIcon className="size-4 dark:!text-white dark:hover:!text-white" />
                            </span>
                        </Button>
                    </PopoverTrigger>
                )}

                <PopoverContent align="start">
                    {filterBy.map((item, index) => (
                        <motion.div key={item} {...animate("translate")} transition={{ duration: index / 5 }}>
                            <PopoverClose
                                onClick={() => onOptionChange(item)}
                                className="block w-full cursor-pointer rounded-md p-2 text-start text-lg hover:bg-primary-100 hover:text-black"
                            >
                                {text(`filter-by.${item}`)}
                            </PopoverClose>
                        </motion.div>
                    ))}
                </PopoverContent>
            </Popover>

            <motion.div {...animate("opacity")} className="relative w-[19rem] ltr:mr-auto rtl:ml-auto">
                <Input
                    value={value || ""}
                    onChange={onInputChange}
                    onFocus={() => setOpen(true)}
                    placeholder={`${text("filter-by.heading")} ${text(`filter-by.${option}`)}`}
                />
                <div
                    ref={listRef}
                    className={cn("bg-gradient absolute left-0 top-full z-50 max-h-48 w-full overflow-y-auto", !open && "hidden")}
                >
                    {filteredList.map((name: any) => (
                        <h3
                            key={name}
                            onClick={() => onSelectedClick(name)}
                            className="block w-full cursor-pointer rounded-md p-2 text-start text-lg hover:bg-primary-100 hover:text-black"
                        >
                            {name}
                        </h3>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
