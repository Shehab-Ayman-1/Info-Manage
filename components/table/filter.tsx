import { PopoverClose } from "@radix-ui/react-popover";
import { MoreHorizontalIcon } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { useState } from "react";

import { Popover, PopoverTrigger, PopoverContent } from "@/ui/popover";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

type FilterProps<TData> = {
    getColumn: (columnId: string) => Column<TData, unknown> | undefined;
    filterBy?: string[];
};

export const Filter = <TData,>({ getColumn, filterBy }: FilterProps<TData>) => {
    const [option, setOption] = useState(filterBy?.[0]);

    if (!option || !filterBy) return;
    const value = getColumn(option)?.getFilterValue() as string;

    const onChange = (event: any) => {
        getColumn(option)?.setFilterValue(event.target.value);
    };

    const onChangeFilter = (item: string) => {
        getColumn(option)?.setFilterValue("");
        setOption(item);
    };

    return (
        <div className="flex-center mb-2 w-full max-w-md !flex-nowrap">
            <Popover>
                {filterBy.length > 1 && (
                    <PopoverTrigger>
                        <Button asChild variant="outline">
                            <span>
                                <MoreHorizontalIcon className="size-4 dark:!text-white dark:hover:!text-white" />
                            </span>
                        </Button>
                    </PopoverTrigger>
                )}

                <PopoverContent align="start">
                    {filterBy.map((item) => (
                        <PopoverClose
                            key={item}
                            onClick={() => onChangeFilter(item)}
                            className="block w-full cursor-pointer rounded-md p-2 text-start text-lg hover:bg-primary-100 hover:text-black"
                        >
                            {item}
                        </PopoverClose>
                    ))}
                </PopoverContent>
            </Popover>

            <Input placeholder={`Filter By ${option}...`} value={value || ""} onChange={onChange} />
        </div>
    );
};
