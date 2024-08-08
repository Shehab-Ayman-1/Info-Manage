"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useCreate } from "@/hooks/api/useCreate";
import { useLists } from "@/hooks/data/useLists";

import { ShowChoosenProducts } from "@/components/show-choosen-products";
import { OpenModuleButton } from "@/components/openModuleButton";
import { createSchema } from "@/app/api/create/suppliers/schema";
import { CardForm } from "@/components/CardForm";
import { SelectBox } from "@/components/select";
import { Input } from "@/ui/input";

import { SchemaType, SupplierDialog } from "./suppier-dialog";
import { SubmitButton } from "@/components/submit-btn";

const processes = [
    { _id: "1", value: "old", title: "Old Supplier" },
    { _id: "2", value: "new", title: "New Supplier" },
];

type SupplierProps = {};

const Supplier = ({}: SupplierProps) => {
    const { register, setValue, setError, clearErrors, reset, handleSubmit, formState } = useForm({
        resolver: zodResolver(createSchema.omit({ productsIds: true })),
    });

    const [products, setProducts] = useState<SchemaType[]>([]);
    const [process, setProcess] = useState("");

    const { mutate, isPending } = useCreate(`/api/create/suppliers?process=${process}`, ["suppliers"]);
    const { suppliers, onReset } = useLists();

    const { errors } = formState;
    const router = useRouter();

    useEffect(() => {
        (async () => await suppliers.fetcher?.())();
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
        <CardForm heading="New Supplier">
            <SelectBox label="Process" name="process" items={processes} onChange={onProcess} />

            <form onSubmit={handleSubmit(onSubmit)}>
                {process === "old" && (
                    <SelectBox
                        label="Choose The Supplier Name"
                        name="supplierId"
                        loading={suppliers.isLoading}
                        items={suppliers.lists}
                        error={errors?.supplierId}
                        setValue={setValue}
                    />
                )}

                {process === "new" && (
                    <Fragment>
                        <Input placeholder="Supplier Name" error={errors?.name} {...register("name")} />
                        <Input type="number" placeholder="Phone Number" error={errors?.phone} {...register("phone")} />
                    </Fragment>
                )}

                {process && (
                    <Fragment>
                        <OpenModuleButton clearErrors={clearErrors} />
                        <SubmitButton text="Create" isPending={isPending} />
                    </Fragment>
                )}

                <p className="text-center text-sm text-rose-900">{errors?.root?.message}</p>
            </form>

            <SupplierDialog setProducts={setProducts} />
            <ShowChoosenProducts products={products} setProducts={setProducts} />
        </CardForm>
    );
};

Supplier.displayName = "Supplier";
export default Supplier;
