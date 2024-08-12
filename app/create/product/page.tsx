"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

import { CreateProductSchema } from "@/app/api/create/products/schema";
import { OpenModuleButton } from "@/components/public/openModuleButton";
import { InsertAndUpdateDialog } from "./insertAndUpdateDialog";
import { ProductType } from "./schema";

import { CardForm } from "@/components/page-structure/CardForm";
import { SubmitButton } from "@/components/public/submit-btn";
import { SelectBox } from "@/components/ui/select";

import { useCreate } from "@/hooks/api/useCreate";
import { useLists } from "@/hooks/data/useLists";
import { DataTable } from "@/components/table";
import { DeleteDialog } from "./deleteDialog";
import { columns } from "./table-columns";

const schema = z.object({
    companyId: z.string().min(1),
    supplierId: z.string().min(1).optional(),
});

type ProductProps = {};

const Product = ({}: ProductProps) => {
    const { formState, setValue, setError, clearErrors, handleSubmit } = useForm({ resolver: zodResolver(schema) });
    const { errors } = formState;

    const { mutate, isPending } = useCreate<CreateProductSchema>("/api/create/products", ["market", "store"]);
    const [products, setProducts] = useState<ProductType[]>([]);

    const { companies, suppliers, onReset } = useLists();
    const router = useRouter();

    useEffect(() => {
        (async () => await companies.fetcher?.())();
        (async () => await suppliers.fetcher?.())();
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
        <CardForm heading="Create Product">
            <form onSubmit={handleSubmit(onSubmit)}>
                <SelectBox
                    label="Company"
                    name="companyId"
                    loading={companies.isLoading}
                    groups={companies.groups}
                    error={errors.companyId}
                    setValue={setValue}
                />

                <SelectBox
                    label="Supplier (Optional)"
                    name="supplierId"
                    required={false}
                    loading={suppliers.isLoading}
                    items={suppliers.lists}
                    error={errors.supplierId}
                    setValue={setValue}
                />

                <OpenModuleButton clearErrors={clearErrors} />
                {!!products.length && <DataTable columns={columns} data={products} smallSize />}
                <SubmitButton text="Create" isPending={isPending} />
            </form>

            <InsertAndUpdateDialog setProducts={setProducts} />
            <DeleteDialog setProducts={setProducts} />
            <p className="text-center text-sm text-rose-900">{errors?.root?.message}</p>
        </CardForm>
    );
};

Product.displayName = "Product";
export default Product;
