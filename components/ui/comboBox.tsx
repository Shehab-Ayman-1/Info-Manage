"use client";
import type { UseFormClearErrors, UseFormSetValue } from "react-hook-form";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { CheckCheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/ui/command";
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

type UseTranslate = {
    label?: string;
    name?: string;
    item?: string;
    trigger?: string;
    justPlaceholder?: boolean;
    customeTrigger?: boolean;
};

type ComboBoxProps = {
    name: string;
    label: string;

    loading?: boolean;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;

    setValue?: UseFormSetValue<any>;
    onChange?: (value: string) => void;
    clearErrors?: UseFormClearErrors<any>;

    defaultValue?: string;
    useTranslate?: UseTranslate;

    items?: Item[];
    groups?: { _id: string; label: string; list: Item[] }[];
};

export const ComboBox = (props: ComboBoxProps) => {
    const { label, name, loading, error, items, groups, defaultValue, useTranslate, setValue, clearErrors, onChange } = props;
    const [selectedValue, setSelectedValue] = useState(defaultValue || "");
    const [open, setOpen] = useState(false);

    const text = useTranslations();

    useEffect(() => {
        if (!defaultValue) return;
        setSelectedValue(defaultValue);
        setValue?.(name, defaultValue);
        onChange?.(defaultValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue]);

    const onSelect = ({ value, title }: Item) => {
        setSelectedValue(title);
        setOpen(false);

        setValue?.(name, value);
        onChange?.(value);
        clearErrors?.(name);
    };

    return (
        <div className="my-2 flex w-full flex-col">
            {!useTranslate?.justPlaceholder && (
                <Label className={cn("text-base", error?.message && "text-rose-400")}>
                    {useTranslate?.label ? text(`${useTranslate.label}.${label}`) : label}
                </Label>
            )}

            <Popover open={open} onOpenChange={setOpen}>
                <CommandTrigger open={open} label={label} selectedValue={selectedValue} useTranslate={useTranslate} />

                <PopoverContent className="p-0" align="start">
                    <Command className="sm:w-[520px]">
                        <CommandInput
                            placeholder={`${text("public.search")} ${useTranslate?.name ? text(`${useTranslate.name}.${name}`) : name}`}
                        />

                        <CommandList className="bg-gradient">
                            {!loading && !items?.length && !groups?.length && <CommandEmpty>{text("no-results")}.</CommandEmpty>}
                            {loading && !items?.length && !groups?.length && <CommandLoading />}

                            {!!items?.length &&
                                items.map((item) => (
                                    <CommandListItem
                                        key={item._id}
                                        title={item.title}
                                        value={item.title}
                                        useTranslate={useTranslate}
                                        selectedValue={selectedValue}
                                        onSelect={() => onSelect(item)}
                                    />
                                ))}

                            {!!groups?.length &&
                                groups.map((group) => (
                                    <CommandGroup key={group._id}>
                                        {!!group.list.length && (
                                            <h3 className="bg-gradient-heavy p-2 text-base font-bold text-black">
                                                {group.label}
                                            </h3>
                                        )}

                                        {group.list.map((list) => (
                                            <CommandListItem
                                                key={list._id}
                                                title={list.title}
                                                value={list.title}
                                                useTranslate={useTranslate}
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
    useTranslate?: UseTranslate;
    selectedValue: string;
    label: string;
    open: boolean;
};

function CommandTrigger({ useTranslate, selectedValue, label, open }: CommandTriggerProps) {
    const text = useTranslations();

    const isCustomeTrigger = useTranslate?.trigger && useTranslate?.customeTrigger;
    const isNotCustomeTrigger = useTranslate?.trigger && !useTranslate?.customeTrigger;

    return (
        <PopoverTrigger asChild>
            <Button
                variant="ghost"
                role="combobox"
                aria-expanded={open}
                className="flex-between mt-1 w-full border-b border-b-primary !py-8 text-base text-slate-400"
            >
                {isNotCustomeTrigger
                    ? text(`${useTranslate.trigger}.${selectedValue || label}`)
                    : isCustomeTrigger
                      ? selectedValue.split(" ||| ")?.[0] || text(`${useTranslate?.trigger}.${label}`)
                      : selectedValue.split(" ||| ")?.[0] || label}
                <ChevronsUpDownIcon className="mx-2 size-4 opacity-50" />
            </Button>
        </PopoverTrigger>
    );
}

type CommandListItemProps = {
    useTranslate?: UseTranslate;
    selectedValue: string;
    value: string;
    title: string;
    onSelect: (value: string) => void;
};

function CommandListItem({ useTranslate, selectedValue, value, title, onSelect }: CommandListItemProps) {
    const hideIcon = (value: string) => (selectedValue === value ? "opacity-100" : "opacity-0");
    const text = useTranslations();

    return (
        <CommandItem value={value} onSelect={onSelect} className="cursor-pointer text-lg capitalize leading-10">
            <CheckCheckIcon className={cn("mx-2 size-4 !text-green-500", hideIcon(value))} />
            {useTranslate?.item ? text(`${useTranslate.item}.${title}`) : title.split(" ||| ")?.[0]}
        </CommandItem>
    );
}

function CommandLoading() {
    const text = useTranslations("public");

    return (
        <CommandItem className="flex-start">
            <Icons.spinner className="mx-2 size-6 animate-spin" />
            {text("loading")}
        </CommandItem>
    );
}

CommandListItem.displayName = "CommandListItem";
CommandTrigger.displayName = "CommandTrigger";
CommandLoading.displayName = "CommandLoading";
ComboBox.displayName = "ComboBox";
