"use client";
import { FieldValues, UseFormClearErrors } from "react-hook-form";
import { useTranslations } from "next-intl";
import { PlusIcon } from "lucide-react";

import { useModel } from "@/hooks/useModel";
import { Button } from "@/ui/button";

type OpenModuleButtonProps = {
    type?: string;
    clearErrors: UseFormClearErrors<FieldValues>;
};

export const OpenModuleButton = ({ type, clearErrors }: OpenModuleButtonProps) => {
    const { onOpen } = useModel();
    const text = useTranslations("public");

    const onInsert = () => {
        clearErrors("root");
        onOpen(type);
    };

    return (
        <Button
            type="button"
            variant="ghost"
            onClick={onInsert}
            className="flex-center m-auto mt-4 font-bold text-primary hover:text-primary"
        >
            <PlusIcon className="size-6 !text-primary" />
            {text("open-insert-products-model")}
        </Button>
    );
};

OpenModuleButton.displayName = "OpenModuleButton";
