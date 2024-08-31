import * as React from "react";

import { cn } from "@/utils/shadcn";
import { Label } from "./label";
import { useTranslations } from "next-intl";

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

        return (
            <div className="my-2 w-full sm:my-4">
                {label && (
                    <Label className={cn("text-lg", error && "text-rose-400")}>
                        {useTranslate?.label ? text(`${useTranslate.label}.${label}`) : label}
                    </Label>
                )}
                <input
                    {...props}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-t-0 border-input bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:text-lg",
                        "text-slate-900 dark:text-slate-200",
                        "border-x-0 border-b-primary",
                        error && "border-b-rose-400 bg-rose-50/50 dark:border-b-rose-200 dark:bg-rose-400/30",
                        className,
                    )}
                    ref={ref}
                    type={type}
                    name={name}
                    placeholder={
                        useTranslate?.placeholder || useTranslate?.label
                            ? text(`${useTranslate.placeholder || useTranslate.label}.${placeholder || label}`)
                            : placeholder || label
                    }
                />
                <p className="ml-1 text-xs text-rose-400 sm:text-sm">{error?.message}</p>
            </div>
        );
    },
);
Input.displayName = "Input";

export { Input };
