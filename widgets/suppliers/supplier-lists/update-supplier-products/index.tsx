"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { useUpdate } from "@/hooks/api/useUpdate";
import { useLists } from "@/hooks/data/useLists";
import { useModel } from "@/hooks/useModel";
import { columns } from "./table-columns";

import { ComboBox } from "@/components/ui/comboBox";
import { DialogForm } from "@/components/ui/dialog";
import { DataTable } from "@/components/table";
import { DeleteDialog } from "./delete-dialog";
import { Button } from "@/ui/button";

export type ProductType = {
    _id: string;
    name: string;
    companyName: string;
};

type RequestType = {
    supplierId: string;
    productsIds: string[];
};

export const UpdateSupplierProducts = () => {
    const { mutate, isPending } = useUpdate<RequestType>("/api/suppliers/products", ["suppliers"]);
    const text = useTranslations();

    const { products: productsLists, companies, onReset } = useLists();
    const { type, data, onClose } = useModel();

    const [products, setProducts] = useState<ProductType[]>([]);
    const [supplierId, setSupplierId] = useState("");
    const mount = useRef(false);

    useEffect(() => {
        if (mount.current) return;
        (async () => companies.fetcher())();
        mount.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!data?.products?.length || !data?.supplierId) return;
        setProducts(data.products);
        setSupplierId(data.supplierId);
    }, [data]);

    if (type !== "suppliers-update-supplier-products-model") return;

    const onCompanyChange = (companyId: string) => {
        const company = productsLists.groups.find((product) => product._id === companyId);

        company?.list.forEach((product) => {
            setProducts((products) => {
                const isExist = products.some((prod) => prod._id === product._id);
                if (!isExist) return products.concat({ _id: product._id, name: product.title, companyName: company.label });
                return products;
            });
        });
    };

    const onProductChange = (productId: string) => {
        const { _id, name, company } = productsLists.data.find((product) => product._id === productId)!;

        setProducts((products) => {
            const isExist = products.some((product) => product._id === productId);
            if (!isExist) return products.concat({ _id, name, companyName: company.name });

            toast.info("This Product Is Already Exist");
            return products;
        });
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        const productsIds = products.map((product) => product._id);
        mutate(
            { supplierId, productsIds },
            {
                onSuccess: () => {
                    onClose();
                    onReset(["suppliers"]);
                },
            },
        );
    };

    return (
        <DialogForm heading={text("widgets.update-dialog.heading")} description={text("widgets.update-dialog.description")}>
            <form onSubmit={onSubmit}>
                <div className="flex-between">
                    <ComboBox
                        label="choose-product"
                        name="productId"
                        useTranslate={{ label: "public", name: "public", trigger: "public", customeTrigger: true }}
                        groups={productsLists.groups}
                        onChange={onProductChange}
                    />

                    <ComboBox
                        label="choose-company"
                        name="companyId"
                        useTranslate={{ label: "public", name: "public", trigger: "public", customeTrigger: true }}
                        groups={companies.groups}
                        onChange={onCompanyChange}
                    />
                </div>

                {!!products.length && <DataTable columns={columns} data={products} smallSize />}

                <Button type="submit" className="w-full" disabled={isPending}>
                    {text("buttons.update")}
                </Button>
            </form>

            <DeleteDialog setProducts={setProducts} />
        </DialogForm>
    );
};

UpdateSupplierProducts.displayName = "UpdateSupplierProducts";
