import { useTranslations } from "next-intl";

import { Button } from "@/ui/button";
import { cn } from "@/utils/shadcn";

type SubmitButtonProps = {
    text: string;
    isPending: boolean;
    className?: string;
};

export const SubmitButton = ({ text, isPending, className }: SubmitButtonProps) => {
    const t = useTranslations("public");

    return (
        <Button
            type="submit"
            size="lg"
            className={cn("my-4 w-full text-base font-bold sm:text-lg", className)}
            disabled={isPending}
        >
            {t(text)}
        </Button>
    );
};

SubmitButton.displayName = "SubmitButton";
