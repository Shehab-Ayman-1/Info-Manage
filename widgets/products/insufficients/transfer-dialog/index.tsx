"use client";
import { useModel } from "@/hooks/useModel";
import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { columns } from "./table-columns";

import { SubmitButton } from "@/components/public/submit-btn";
import { ComboBox } from "@/components/ui/comboBox";
import { useUpdate } from "@/hooks/api/useUpdate";
import { DialogForm } from "@/components/ui/dialog";
import { DataTable } from "@/components/table";
import { place as places } from "@/constants";

type TransferDialogType = {
    mutateGetQuery?: any;
    place: string;
};

export const TransferDialog = ({ place, mutateGetQuery }: TransferDialogType) => {
    const { mutate, isPending } = useUpdate("/api/products/transfer", ["products"]);
    const [location, setLocation] = useState(place);
    const { type, data } = useModel();
    const text = useTranslations();

    const products = data?.items;
    if (type !== "selected-transfer-model" || !products) return;

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        const transferProducts = products.map(({ _id, productId, checkedCount }: any) => ({
            _id: productId || _id,
            count: checkedCount,
        }));
        mutate(
            { products: transferProducts, place: location },
            {
                onSuccess: () => {
                    mutateGetQuery?.(`supplierId=${products[0]._id}&place=${place}`);
                    setTimeout(() => window.location.reload(), 500);
                },
            },
        );
    };

    return (
        <DialogForm heading={text("widgets.update-dialog.heading")} description={text("widgets.update-dialog.description")}>
            <form onSubmit={onSubmit} className="overflow-hidden">
                <ComboBox
                    label="transfer-to"
                    name="place"
                    useTranslate={{ label: "pages.transfer", trigger: "pages.transfer", name: "public", item: "public" }}
                    items={places}
                    onChange={(value) => setLocation(value)}
                    defaultValue={place === "store" ? "market" : "store"}
                />

                {!!products.length && <DataTable columns={columns} data={products} />}

                <SubmitButton text="transfer" isPending={isPending} />
            </form>
        </DialogForm>
    );
};

TransferDialog.displayName = "TransferDialog";
