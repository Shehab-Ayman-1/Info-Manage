import { useTranslations } from "next-intl";

import { Button } from "@/ui/button";
import { cn } from "@/utils/shadcn";
import { useKey } from "react-use";
import { useRef } from "react";
import { Loader2Icon } from "lucide-react";

type SubmitButtonProps = {
    text: string;
    isPending: boolean;
    className?: string;
};

export const SubmitButton = ({ text, isPending, className }: SubmitButtonProps) => {
    const t = useTranslations("buttons");

    const ref = useRef<HTMLButtonElement>(null);
    const onClick = () => ref.current?.click();

    const insert = (event: KeyboardEvent) => text !== "insert" && event.ctrlKey && event.key === "Enter";
    const submit = (event: KeyboardEvent) => text === "insert" && event.key === "Enter";

    useKey((event) => insert(event) || submit(event), onClick);

    return (
        <Button
            type="submit"
            size="lg"
            ref={ref}
            className={cn("my-4 w-full text-base font-bold sm:text-lg", className)}
            disabled={isPending}
        >
            {!isPending ? (
                t(text)
            ) : (
                <div className="flex-center">
                    <Loader2Icon className="inline-block animate-spin" />
                    <div className="flex gap-1 text-sm">
                        <span className="animate-ping delay-0 ease-in-out" style={{ animationDuration: "2s" }}>
                            L
                        </span>
                        <span className="animate-ping delay-75 ease-in-out" style={{ animationDuration: "2s" }}>
                            o
                        </span>
                        <span className="animate-ping delay-100 ease-in-out" style={{ animationDuration: "2s" }}>
                            a
                        </span>
                        <span className="animate-ping delay-150 ease-in-out" style={{ animationDuration: "2s" }}>
                            d
                        </span>
                        <span className="animate-ping delay-200 ease-in-out" style={{ animationDuration: "2s" }}>
                            i
                        </span>
                        <span className="animate-ping delay-300 ease-in-out" style={{ animationDuration: "2s" }}>
                            g
                        </span>
                        <span className="animate-ping delay-500 ease-in-out" style={{ animationDuration: "2s" }}>
                            .
                        </span>
                        <span className="animate-ping delay-700 ease-in-out" style={{ animationDuration: "2s" }}>
                            .
                        </span>
                        <span className="animate-ping delay-1000 ease-in-out" style={{ animationDuration: "2s" }}>
                            .
                        </span>
                    </div>
                </div>
            )}
        </Button>
    );
};

SubmitButton.displayName = "SubmitButton";
