import { FieldValues, UseFormClearErrors } from "react-hook-form";
import { PlusIcon } from "lucide-react";

import { useModel } from "@/hooks/useModel";
import { Button } from "@/ui/button";

type OpenModuleButtonProps = {
    type?: string;
    clearErrors: UseFormClearErrors<FieldValues>;
};

export const OpenModuleButton = ({ type, clearErrors }: OpenModuleButtonProps) => {
    const { onOpen } = useModel();

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
            Insert Product
        </Button>
    );
};

OpenModuleButton.displayName = "OpenModuleButton";
