"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Fragment, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { useCreate } from "@/hooks/api/useCreate";
import { useLists } from "@/hooks/data/useLists";
import { columns } from "./table-columns";

import { RemoveItemFromTable } from "@/widgets/public/remove-item-from-table";
import { InsertProduct } from "@/widgets/suppliers/add-supplier/insert-product";
import { OpenModuleButton } from "@/components/public/openModuleButton";
import { createSchema } from "@/app/api/suppliers/add-supplier/schema";
import { CardForm } from "@/components/page-structure/CardForm";

import { SubmitButton } from "@/components/public/submit-btn";
import { ComboBox } from "@/components/ui/comboBox";
import { DataTable } from "@/components/table";
import { SupplierType } from "./schema";
import { Input } from "@/ui/input";

const processes = [
    { _id: "1", value: "old", title: "old-supplier" },
    { _id: "2", value: "new", title: "new-supplier" },
];

type SupplierProps = {};

const Supplier = ({}: SupplierProps) => {
    const { register, setValue, setError, clearErrors, reset, handleSubmit, formState } = useForm({
        resolver: zodResolver(createSchema.omit({ productsIds: true })),
    });

    const [products, setProducts] = useState<SupplierType[]>([]);
    const [process, setProcess] = useState("");

    const { mutate, isPending } = useCreate(`/api/suppliers/add-supplier?process=${process}`, ["suppliers"]);
    const { suppliers, onReset } = useLists();
    const { isSubmitted, errors } = formState;

    const text = useTranslations();
    const router = useRouter();
    const mount = useRef(false);

    useEffect(() => {
        if (mount.current) return;
        (async () => suppliers.fetcher())();
        mount.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onProcess = (value: string) => {
        setProcess(value);
        reset();
    };

    const onSubmit: SubmitHandler<FieldValues> = (values) => {
        if (!products.length) return setError("root", { message: "No Products Was Found." });
        const productsIds = products.map((product) => product.productId);

        const onSuccess = () => {
            router.push("/");
            onReset(["suppliers", "products"]);
        };

        mutate({ ...values, productsIds }, { onSuccess });
    };

    return (
        <CardForm heading={text("pages.add-supplier.heading")}>
            <ComboBox
                label="choose-process"
                name="process"
                useTranslate={{ label: "public", name: "public", trigger: "public", item: "public" }}
                isSubmitted={isSubmitted}
                items={processes}
                onChange={onProcess}
            />

            <form onSubmit={handleSubmit(onSubmit)}>
                {process === "old" && (
                    <ComboBox
                        label="supplier-name"
                        name="supplierId"
                        useTranslate={{ label: "public", name: "public", trigger: "public", customeTrigger: true }}
                        loading={suppliers.isLoading}
                        items={suppliers.lists}
                        error={errors?.supplierId}
                        isSubmitted={isSubmitted}
                        setValue={setValue}
                        clearErrors={clearErrors}
                    />
                )}

                {process === "new" && (
                    <Fragment>
                        <Input
                            type="text"
                            label="supplier-name"
                            useTranslate={{ label: "public" }}
                            error={errors?.name}
                            {...register("name")}
                        />
                        <Input
                            type="number"
                            label="phone"
                            useTranslate={{ label: "public" }}
                            error={errors?.phone}
                            {...register("phone")}
                        />
                    </Fragment>
                )}

                {process && (
                    <Fragment>
                        <OpenModuleButton type="add-supplier-insert-model" clearErrors={clearErrors} />
                        {!!products.length && <DataTable columns={columns} data={products} smallSize />}
                        <SubmitButton text="create" isPending={isPending} />
                    </Fragment>
                )}

                <p className="text-center text-sm text-rose-900">{errors?.root?.message}</p>
            </form>

            <InsertProduct setProducts={setProducts} />

            <RemoveItemFromTable
                dialogType="add-supplier-remove-model"
                filterKeys={{ id: "randomId", data: "productId" }}
                setItems={setProducts}
            />
        </CardForm>
    );
};

Supplier.displayName = "Supplier";
export default Supplier;
