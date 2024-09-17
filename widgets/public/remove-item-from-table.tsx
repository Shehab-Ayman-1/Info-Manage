"use client";
import type { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";

import { DialogForm } from "@/components/ui/dialog";
import { useModel } from "@/hooks/useModel";
import { Button } from "@/ui/button";

type RemoveItemFromTableProps = {
    dialogType: string;
    filterKeys: { id: string; data: string };
    setItems: Dispatch<SetStateAction<any[]>>;
};

export const RemoveItemFromTable = ({ dialogType, filterKeys, setItems }: RemoveItemFromTableProps) => {
    const { type, data, onClose } = useModel();
    const text = useTranslations();

    if (type !== dialogType) return;

    const onClick = () => {
        setItems((items) => items.filter((item) => item?.[filterKeys.id] !== data?.[filterKeys.data]));
        onClose();
    };

    return (
        <DialogForm heading={text("widgets.remove-dialog.heading")} description={text("widgets.remove-dialog.description")}>
            <div className="flex-end">
                <Button type="button" variant="outline" className="text-black dark:text-white" onClick={onClose}>
                    {text("buttons.cancel")}
                </Button>
                <Button type="button" variant="destructive" onClick={onClick}>
                    {text("buttons.confirm")}
                </Button>
            </div>
        </DialogForm>
    );
};

RemoveItemFromTable.displayName = "RemoveItemFromTable";
