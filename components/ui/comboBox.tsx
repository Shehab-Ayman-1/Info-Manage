"use client";
import type { UseFormClearErrors, UseFormSetError, UseFormSetValue } from "react-hook-form";
import type { FieldError, FieldErrorsImpl, FieldValues, Merge } from "react-hook-form";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { CommandInput, CommandItem, CommandList } from "@/ui/command";
import { Command, CommandEmpty, CommandGroup } from "@/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Button } from "@/ui/button";
import { Icons } from "@/ui/icons";
import { Label } from "@/ui/label";
import { cn } from "@/utils/shadcn";

type Item = {
    _id: string;
    value: string;
    title: string;
};

type ComboBoxProps = {
    name: string;
    label: string;

    loading?: boolean;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;

    defaultValue?: string;
    setValue?: UseFormSetValue<FieldValues>;
    onChange?: (value: string) => void;

    setError?: UseFormSetError<FieldValues>;
    clearErrors?: UseFormClearErrors<FieldValues>;

    items?: Item[];
    groups?: { _id: string; label: string; list: Item[] }[];
};

export const ComboBox = (props: ComboBoxProps) => {
    const { label, name, loading, items, groups, defaultValue } = props;
    const { error, setValue, clearErrors, onChange } = props;

    const [selectedValue, setSelectedValue] = useState(defaultValue || "");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!defaultValue) return;
        setValue?.(name, defaultValue);
        onChange?.(defaultValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSelect = ({ value, title }: Item) => {
        setSelectedValue(title);
        setOpen(false);

        setValue?.(name, value);
        onChange?.(value);
        clearErrors?.(name);
    };

    return (
        <div className="flex w-full flex-col">
            <Label className={cn("text-base", error?.message && "text-rose-400")}>{label}</Label>

            <Popover open={open} onOpenChange={setOpen}>
                <CommandTrigger open={open} label={label} selectedValue={selectedValue} />

                <PopoverContent className="w-[500px] p-0">
                    <Command>
                        <CommandInput placeholder="Search framework..." />

                        <CommandList>
                            {!loading && !items?.length && !groups?.length && <CommandEmpty>No Results Was Found.</CommandEmpty>}

                            {loading && !items?.length && !groups?.length && <CommandLoading />}

                            {!!items?.length &&
                                items.map((item) => (
                                    <CommandListItem
                                        key={item._id}
                                        title={item.title}
                                        value={item.title}
                                        selectedValue={selectedValue}
                                        onSelect={() => onSelect(item)}
                                    />
                                ))}

                            {!!groups?.length &&
                                groups.map((group) => (
                                    <CommandGroup key={group._id}>
                                        {!!group.list.length && (
                                            <h3 className="bg-gradient-heavy !w-full p-2 text-base font-bold text-black">
                                                {group.label}
                                            </h3>
                                        )}

                                        {group.list.map((list) => (
                                            <CommandListItem
                                                key={list._id}
                                                title={list.title}
                                                value={list.title}
                                                selectedValue={selectedValue}
                                                onSelect={() => onSelect(list)}
                                            />
                                        ))}
                                    </CommandGroup>
                                ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {error?.message && (
                <p className="ml-1 text-xs text-rose-900 dark:text-rose-400 sm:text-sm">{error.message as string}</p>
            )}
        </div>
    );
};

type CommandTriggerProps = {
    selectedValue: string;
    label: string;
    open: boolean;
};

function CommandTrigger({ selectedValue, label, open }: CommandTriggerProps) {
    return (
        <PopoverTrigger asChild>
            <Button
                variant="ghost"
                role="combobox"
                aria-expanded={open}
                className="flex-between w-full border-b border-b-primary !py-8 text-base text-slate-400"
            >
                {selectedValue || label}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
    );
}

function CommandLoading() {
    return (
        <CommandItem className="flex-start">
            <Icons.spinner className="mr-2 size-6 animate-spin" />
            Loading...
        </CommandItem>
    );
}

type CommandListItemProps = {
    value: string;
    title: string;
    selectedValue: string;
    onSelect: (value: string) => void;
};

function CommandListItem({ value, title, selectedValue, onSelect }: CommandListItemProps) {
    const hideIcon = (value: string) => (selectedValue === value ? "opacity-100" : "opacity-0");

    return (
        <CommandItem value={value} onSelect={onSelect} className="cursor-pointer text-lg">
            <CheckIcon className={cn("mr-2 size-4", hideIcon(value))} />
            {title}
        </CommandItem>
    );
}

CommandTrigger.displayName = "CommandTrigger";
CommandLoading.displayName = "CommandLoading";
CommandListItem.displayName = "CommandListItem";
ComboBox.displayName = "ComboBox";
