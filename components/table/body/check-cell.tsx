"use client";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Row } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Checkbox } from "@/ui/checkbox";

type CheckCellType = {
    row: Row<any>;
    type: string;
};

export const CheckCell = ({ row, type }: CheckCellType) => {
    const [item, setItem] = useState({ checked: false, count: 0 });
    const text = useTranslations();

    const onBlur = () => {
        row.original.count = item.count;
        row.original.modelType = type;
        row.toggleSelected(!!item.checked);
    };

    const onCheck = (checked: CheckedState) => {
        setItem((item) => ({ ...item, checked: !!checked }));
        return row.toggleSelected(!!checked);
    };

    useEffect(() => {
        onBlur();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item.count]);

    return (
        <div className="flex-center">
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={onCheck}
                className={row.index % 2 === 0 ? "border-black" : "border-white"}
            />
            {item.checked && (
                <input
                    type="number"
                    onBlur={onBlur}
                    value={item.count || ""}
                    placeholder={text("public.count")}
                    onChange={(event) => setItem({ checked: item.checked, count: +event.target.value })}
                    className="w-20 rounded-md border border-slate-500 bg-white p-1 text-black dark:bg-black dark:text-white"
                />
            )}
        </div>
    );
};

CheckCell.displayName = "CheckCell";
