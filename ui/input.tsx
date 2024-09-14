import { useTranslations } from "next-intl";
import * as React from "react";

import { cn } from "@/utils/shadcn";
import { Label } from "./label";

type UseTranslate = {
    label?: string;
    placeholder?: string;
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: Record<string, any> | undefined;
    useTranslate?: UseTranslate;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, name, error, label, placeholder, useTranslate, ...props }, ref) => {
        const text = useTranslations();

        const placeholderText =
            useTranslate?.placeholder || useTranslate?.label
                ? text(`${useTranslate.placeholder || useTranslate.label}.${placeholder || label}`)
                : placeholder || label;

        return (
            <div className="group relative my-2 w-full sm:my-4">
                {label && (
                    <Label className={cn("text-lg", error && "text-rose-400")}>
                        {useTranslate?.label ? text(`${useTranslate.label}.${label}`) : label}
                    </Label>
                )}
                <input
                    {...props}
                    className={cn(
                        "flex w-full rounded-md bg-transparent p-4 text-sm text-slate-700 placeholder:text-slate-500 dark:text-slate-200",
                        "shadow-inner shadow-slate-400 group-focus-within:shadow-slate-700 dark:shadow-slate-600 dark:group-focus-within:shadow-slate-300",
                        "placeholder:py-2 focus-within:outline-0 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg",
                        error
                            ? "border-b-rose-400 bg-rose-50/50 dark:border-b-rose-200 dark:bg-rose-400/30"
                            : "border-b border-b-primary",
                        className,
                    )}
                    step="0.01"
                    ref={ref}
                    type={type}
                    name={name}
                    placeholder={placeholderText}
                />
                <span
                    className={cn(
                        "absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 bg-primary",
                        "transition-all duration-500 ease-in-out group-focus-within:w-full",
                    )}
                />
                <p className="mx-1 text-xs text-rose-400 sm:text-sm">{error?.message}</p>
            </div>
        );
    },
);
Input.displayName = "Input";

export { Input };
