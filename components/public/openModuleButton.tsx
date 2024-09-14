"use client";
import { FieldValues, UseFormClearErrors } from "react-hook-form";
import { useTranslations } from "next-intl";
import { PlusIcon } from "lucide-react";
import { useKey } from "react-use";

import { Tooltip } from "@/components/ui/tooltip";
import { useModel } from "@/hooks/useModel";
import { Button } from "@/ui/button";

type OpenModuleButtonProps = {
    type?: string;
    data?: any;
    clearErrors?: UseFormClearErrors<FieldValues>;
};

export const OpenModuleButton = ({ type, data, clearErrors }: OpenModuleButtonProps) => {
    const text = useTranslations("public");
    const { onOpen } = useModel();

    const onInsert = () => {
        clearErrors?.("root");
        onOpen(type, data);
    };

    useKey((event) => event.ctrlKey && event.key === "i", onInsert);

    return (
        <Tooltip content="CTRL + I">
            <Button
                type="button"
                variant="ghost"
                onClick={onInsert}
                className="flex-center m-auto mt-4 font-bold text-primary hover:text-primary"
            >
                <PlusIcon className="size-6 !text-primary" />
                {text("open-insert-products-model")}
            </Button>
        </Tooltip>
    );
};

OpenModuleButton.displayName = "OpenModuleButton";
