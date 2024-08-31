import * as React from "react";

import { cn } from "@/utils/shadcn";
import { Label } from "./label";
import { useTranslations } from "next-intl";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: Record<string, any> | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error, ...props }, ref) => {
    const translationKey = props?.name?.replace(/([A-Z])/, "-$1").toLowerCase();
    const text = useTranslations("public");

    return (
        <div className="my-2 w-full sm:my-4">
            {translationKey && <Label className={cn("text-lg", error && "text-rose-400")}>{text(translationKey)}</Label>}
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
                placeholder={props?.name ? text(props.name) : ""}
            />
            <p className="ml-1 text-xs text-rose-400 sm:text-sm">{error?.message}</p>
        </div>
    );
});
Input.displayName = "Input";

export { Input };
