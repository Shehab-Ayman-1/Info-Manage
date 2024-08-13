"use client";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { LoaderCircleIcon } from "lucide-react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/ui/select";

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

    const handleChange = (value: string) => {
        onChange?.(value);
        setValue?.(name, value);
    };

    return (
        <Select required={required} defaultValue={defaultValue} onValueChange={handleChange}>
            <SelectTrigger name={name} className={className} error={error?.[name]}>
                <SelectValue placeholder={label} />
            </SelectTrigger>

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
