"use client";
import type { UseFormClearErrors, UseFormSetValue } from "react-hook-form";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { CheckCheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useKey } from "react-use";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Button } from "@/ui/button";
import { cn } from "@/utils/shadcn";
import { Icons } from "@/ui/icons";
import { Label } from "@/ui/label";
import { Tooltip } from "./tooltip";

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

    isSubmitted?: boolean;
    defaultValue?: string;
    useTranslate?: UseTranslate;

    items?: Item[];
    groups?: { _id: string; label: string; list: Item[] }[];
};

export const ComboBox = (props: ComboBoxProps) => {
    const { label, name, loading, error, items, groups, isSubmitted } = props;
    const { defaultValue, useTranslate, setValue, clearErrors, onChange } = props;

    const [selectedValue, setSelectedValue] = useState(defaultValue || "");
    const [open, setOpen] = useState(false);

    const text = useTranslations();

    useEffect(() => {
        setSelectedValue(defaultValue || "");
    }, [isSubmitted]);

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

                        <CommandList>
                            {!loading && !items?.length && !groups?.length && (
                                <CommandEmpty>{text("table.no-results")}.</CommandEmpty>
                            )}

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
                <p className="mx-1 text-xs text-rose-900 dark:text-rose-400 sm:text-sm">{error.message as string}</p>
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
    const ref = useRef<HTMLButtonElement>(null);

    const productKeys = ["choose-product", "product-name", "productId", "product"];
    const isProduct = productKeys.includes(label);

    const onClick = () => {
        if (!isProduct) return;
        ref.current?.click();
    };

    useKey((event) => event.shiftKey, onClick);

    const isCustomeTrigger = useTranslate?.trigger && useTranslate?.customeTrigger;
    const isNotCustomeTrigger = useTranslate?.trigger && !useTranslate?.customeTrigger;

    const NCT = isNotCustomeTrigger && text(`${useTranslate?.trigger}.${selectedValue || label}`);
    const CT = isCustomeTrigger && (selectedValue || text(`${useTranslate?.trigger}.${label}`));

    const RenderButton = () => {
        return (
            <PopoverTrigger asChild ref={ref}>
                <div className="group relative">
                    <Button
                        type="button"
                        variant="ghost"
                        data-open={open}
                        className={cn(
                            "flex-between peer mt-1 w-full border-b border-b-primary !py-8 text-base shadow-inner hover:bg-transparent",
                            open ? "shadow-slate-700 dark:shadow-slate-300" : "shadow-slate-400 dark:shadow-slate-600",
                            selectedValue ? "text-slate-700 dark:text-slate-200" : "text-slate-500",
                        )}
                    >
                        {NCT || CT || selectedValue || label}
                        <ChevronsUpDownIcon className="mx-2 size-4 opacity-50" />
                    </Button>

                    <span
                        className={cn(
                            "absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 bg-primary",
                            "transition-all duration-500 ease-in-out group-focus-within:w-full",
                            open && "w-full",
                        )}
                    />
                </div>
            </PopoverTrigger>
        );
    };

    if (!isProduct) return <RenderButton />;

    return (
        <Tooltip content="Shift">
            <RenderButton />
        </Tooltip>
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
    const text = useTranslations();

    const item = useTranslate?.item ? text(`${useTranslate.item}.${title}`) : title.split(" ||| ")?.[0];

    return (
        <CommandItem value={value} onSelect={onSelect} className="group text-lg capitalize leading-10">
            <CheckCheckIcon
                className={cn("mx-2 size-4 !text-green-500", selectedValue === value ? "opacity-100" : "opacity-0")}
            />
            {item}
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
