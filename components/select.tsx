"use client";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { Fragment, useState } from "react";

import { SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/ui/select";
import { Select, SelectContent, SelectGroup } from "@/ui/select";
import { cn } from "@/utils/shadcn";
import { LoaderCircleIcon } from "lucide-react";

type ItemProps = {
    _id: string;
    value: string;
    title: string;
};

export type Group = {
    _id: string;
    label: string;
    list: ItemProps[];
};

type SelectBoxProps = {
    label: string;
    name: string;
    className?: string;

    items?: ItemProps[];
    groups?: Group[];
    loading?: false | true;

    defaultValue?: string;
    required?: boolean;
    error?: Record<string, any> | undefined;

    setValue?: UseFormSetValue<FieldValues>;
    onChange?: (value: string) => void;
};

export const SelectBox = (props: SelectBoxProps) => {
    const { className, defaultValue, setValue, onChange } = props;
    const { name, label, error, items, groups, loading, required = true } = props;
    const [isSelected, setIsSelected] = useState(false);

    const handleChange = (value: string) => {
        onChange?.(value);
        setValue?.(name, value);
        setIsSelected(true);
    };

    return (
        <Select required={required} defaultValue={defaultValue} onValueChange={handleChange}>
            <Fragment>
                <SelectTrigger
                    className={cn(
                        "my-4 w-full border-0 border-b border-b-primary text-lg text-slate-500 dark:text-slate-400",
                        isSelected && "text-slate-900 dark:text-slate-200",
                        error && "border-b-rose-500 bg-rose-50/50 dark:border-b-rose-200 dark:bg-rose-300/50",
                        className,
                    )}
                >
                    <SelectValue placeholder={label} />
                </SelectTrigger>
                {error?.message && <p className="mb-6 ml-1 text-sm text-rose-900 dark:text-rose-400">{error?.message}</p>}
            </Fragment>

            <SelectContent>
                {groups?.map((group) => (
                    <SelectGroup key={group._id}>
                        <SelectLabel className="bg-gradient-heavy dark:text-black">{group.label}</SelectLabel>
                        {group.list.map((item) => (
                            <SelectItem key={item._id} value={item.value} className="cursor-pointer text-xl">
                                {item.title}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                ))}

                {items?.map((item) => (
                    <SelectItem value={item.value} key={item._id} className="cursor-pointer text-xl">
                        {item.title}
                    </SelectItem>
                ))}

                {loading && (
                    <SelectItem value="no-value" className="cursor-pointer text-xl" disabled>
                        <div className="flex-start">
                            <LoaderCircleIcon className="size-5 animate-spin" />
                            <p>Loading...</p>
                        </div>
                    </SelectItem>
                )}

                {!loading && !groups?.length && !items?.length && (
                    <SelectItem value="no-value" className="cursor-pointer text-xl" disabled>
                        No Results
                    </SelectItem>
                )}
            </SelectContent>
        </Select>
    );
};

SelectBox.displayName = "SelectBox";
