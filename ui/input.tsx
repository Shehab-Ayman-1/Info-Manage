import * as React from "react";

import { cn } from "@/utils/shadcn";
import { Label } from "./label";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: Record<string, any> | undefined;
    containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ containerClassName, className, type, error, ...props }, ref) => {
    const name = props?.name?.replace(/([A-Z])/, " $1");
    const label = name ? name.charAt(0).toUpperCase() + name.slice(1) : "";

    return (
        <div className={cn("my-2 w-full sm:my-4", containerClassName)}>
            <Label className="text-lg">{label}</Label>
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-t-0 border-input bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:text-lg",
                    "text-slate-900 dark:text-slate-200",
                    "border-x-0 border-b-primary",
                    error && "border-b-rose-500 bg-rose-50/50 dark:border-b-rose-200 dark:bg-rose-300/50",
                    className,
                )}
                ref={ref}
                {...props}
            />
            <p className="ml-1 text-xs text-rose-900 dark:text-rose-400 sm:text-sm">{error?.message}</p>
        </div>
    );
});
Input.displayName = "Input";

export { Input };
