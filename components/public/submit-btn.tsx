import { useTranslations } from "next-intl";

import { Button } from "@/ui/button";
import { cn } from "@/utils/shadcn";
import { useKey } from "react-use";
import { useRef } from "react";

type SubmitButtonProps = {
    text: string;
    isPending: boolean;
    className?: string;
};

export const SubmitButton = ({ text, isPending, className }: SubmitButtonProps) => {
    const t = useTranslations("buttons");

    const ref = useRef<HTMLButtonElement>(null);
    const onClick = () => ref.current?.click();

    const insert = (event: KeyboardEvent) => text === "insert" && !event.ctrlKey && event.key === "Enter";
    const submit = (event: KeyboardEvent) => text !== "insert" && event.key === "Enter";

    useKey((event) => insert(event) || submit(event), onClick);

    return (
        <Button
            type="submit"
            size="lg"
            ref={ref}
            className={cn("my-4 w-full text-base font-bold sm:text-lg", className)}
            disabled={isPending}
        >
            {t(text)}
        </Button>
    );
};

SubmitButton.displayName = "SubmitButton";
