"use client";
import { useModel } from "@/hooks/useModel";
import { FormEvent, useState } from "react";
import { columns } from "./table-columns";

import { SubmitButton } from "@/components/public/submit-btn";
import { ComboBox } from "@/components/ui/comboBox";
import { useUpdate } from "@/hooks/api/useUpdate";
import { DialogForm } from "@/components/ui/dialog";
import { DataTable } from "@/components/table";
import { place as places } from "@/constants";

type TransferDialogType = {
    place: string;
};

export const TransferDialog = ({ place }: TransferDialogType) => {
    const { mutate, isPending } = useUpdate("/api/products/transfer", ["products"]);
    const [location, setLocation] = useState(place);
    const { type, data, onClose } = useModel();

    const products = data?.items;
    if (type !== "selected-transfer-model" || !products) return;

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        const transferProducts = products.map((product: any) => ({ _id: product.productId, count: product.checkedCount }));
        mutate({ products: transferProducts, place: location }, { onSuccess: onClose });
    };

    return (
        <DialogForm heading="Transfer Products" description="Transfer Products From Market To The Store">
            <form onSubmit={onSubmit}>
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
