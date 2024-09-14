"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { useCreate } from "@/hooks/api/useCreate";
import { useLists } from "@/hooks/data/useLists";
import { columns } from "./table-columns";

import { RemoveItemFromTable } from "@/widgets/public/remove-item-from-table";
import { CreateProductSchema } from "@/app/api/products/add-product/schema";
import { InsertDialog } from "@/widgets/products/add-products/insert-product";
import { OpenModuleButton } from "@/components/public/openModuleButton";
import { CardForm } from "@/components/page-structure/CardForm";
import { SubmitButton } from "@/components/public/submit-btn";
import { ComboBox } from "@/components/ui/comboBox";
import { DataTable } from "@/components/table";
import { ProductType } from "./schema";

const schema = z.object({
    companyId: z.string().min(1),
    supplierId: z.string().min(1).optional(),
});

type ProductProps = {};

const Product = ({}: ProductProps) => {
    const { formState, setValue, setError, clearErrors, handleSubmit } = useForm({ resolver: zodResolver(schema) });
    const { isSubmitted, errors } = formState;

    const { mutate, isPending } = useCreate<CreateProductSchema>("/api/products/add-product", ["market", "store"]);
    const [products, setProducts] = useState<ProductType[]>([]);

    const { companies, suppliers, onReset } = useLists();
    const text = useTranslations();
    const router = useRouter();
    const mount = useRef(false);

    useEffect(() => {
        if (mount.current) return;
        (async () => companies.fetcher())();
        (async () => suppliers.fetcher())();
        mount.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit: SubmitHandler<FieldValues> = ({ companyId, supplierId }) => {
        if (!products.length) return setError("root", { message: "No Products Inserted Yet." });

        const items = products.map(({ randomId, marketCount, storeCount, purchasePrice, sellingPrice, ...rest }) => {
            const market = { price: sellingPrice, count: marketCount };
            const store = { price: purchasePrice, count: storeCount };
            return { market, store, ...rest };
        });

        const onSuccess = () => {
            setProducts([]);
            onReset(["products", "suppliers"]);
            router.push("/");
        };

        mutate({ supplierId, companyId, products: items }, { onSuccess });
    };

    return (
        <CardForm heading={text("pages.add-product.heading")}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ComboBox
                    label={text("public.company-name")}
                    name="companyId"
                    useTranslate={{
                        label: "public",
                        name: "public",
                        customeTrigger: true,
                        justPlaceholder: true,
                    }}
                    loading={companies.isLoading}
                    groups={companies.groups}
                    error={errors.companyId}
                    isSubmitted={isSubmitted}
                    setValue={setValue}
                    clearErrors={clearErrors}
                />

                <ComboBox
                    label="optional-supplier"
                    name="supplierId"
                    useTranslate={{
                        label: "pages.add-product",
                        trigger: "pages.add-product",
                        name: "public",
                        customeTrigger: true,
                        justPlaceholder: true,
                    }}
                    loading={suppliers.isLoading}
                    items={suppliers.lists}
                    error={errors.supplierId}
                    isSubmitted={isSubmitted}
                    setValue={setValue}
                    clearErrors={clearErrors}
                />

                <OpenModuleButton type="insert-products-model" clearErrors={clearErrors} />

                {!!products.length && <DataTable columns={columns} data={products} smallSize />}

                <SubmitButton text="create" isPending={isPending} />
            </form>

            <InsertDialog setProducts={setProducts} />

            <RemoveItemFromTable
                setItems={setProducts}
                dialogType="add-product-remove-item-model"
                filterKeys={{ id: "randomId", data: "productId" }}
            />

            <p className="text-center text-sm text-rose-900">{errors?.root?.message}</p>
        </CardForm>
    );
};

Product.displayName = "Product";
export default Product;
