"use client";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Row } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Checkbox } from "@/ui/checkbox";

type CheckboxCellType = {
    row: Row<any>;
};

export const CheckboxCell = ({ row }: CheckboxCellType) => {
    const [isChecked, setIsChecked] = useState(false);
    const text = useTranslations();

    const onCheck = (value: CheckedState) => {
        setIsChecked(!isChecked);
        return row.toggleSelected(!!value);
    };

    return (
        <div className="flex-center">
            <Checkbox
                checked={row.getIsSelected()}
                className={row.index % 2 === 0 ? "border-black" : "border-white"}
                onCheckedChange={onCheck}
            />
            <input
                type="number"
                min={0}
                disabled={!isChecked}
                placeholder={text("public.count")}
                className="w-20 rounded-md border border-slate-500 bg-white p-1 text-black dark:bg-black dark:text-white"
            />
        </div>
    );
};

CheckboxCell.displayName = "CheckboxCell";
