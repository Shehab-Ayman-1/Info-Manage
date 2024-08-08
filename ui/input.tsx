import * as React from "react";

import { cn } from "@/utils/shadcn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: Record<string, any> | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error, ...props }, ref) => {
    return (
        <div className="my-4 w-full">
            <input
                type={type}
                className={cn(
                    "flex h-14 w-full rounded-md border border-input bg-transparent px-3 py-2 text-lg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                    "text-slate-900 dark:text-slate-200",
                    "border-x-0 border-b-primary",
                    error && "border-b-rose-500 bg-rose-50/50 dark:border-b-rose-200 dark:bg-rose-300/50",
                    className,
                )}
                ref={ref}
                {...props}
            />
            <p className="ml-1 text-sm text-rose-900 dark:text-rose-400">{error?.message}</p>
        </div>
    );
});
Input.displayName = "Input";

export { Input };
