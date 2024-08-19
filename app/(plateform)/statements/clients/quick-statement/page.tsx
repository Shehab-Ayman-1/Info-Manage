"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createSchema, CreateClientType } from "@/app/api/statements/clients/schema";
import { OpenModuleButton } from "@/components/public/openModuleButton";
import { InsertProduct, ProductType } from "../insert-product";

import { useCreate } from "@/hooks/api/useCreate";
import { useLists } from "@/hooks/data/useLists";
import { columns } from "../table-columns";

import { CardForm } from "@/components/page-structure/CardForm";
import { SubmitButton } from "@/components/public/submit-btn";
import { AlertError } from "@/components/ui/alert-error";
import { DataTable } from "@/components/table";
import { DeleteDialog } from "../delete-dialog";

type QuickStatementProps = {};

const QuickStatement = ({}: QuickStatementProps) => {
    const { formState, setValue, setError, clearErrors, handleSubmit } = useForm({
        resolver: zodResolver(createSchema.omit({ products: true })),
    });

    const { mutate, isPending } = useCreate<CreateClientType>("/api/statements/clients", ["bills"]);
    const [products, setProducts] = useState<ProductType[]>([]);

    const { clients } = useLists();
    const { errors } = formState;

    const router = useRouter();

    useEffect(() => {
        (async () => await clients.fetcher?.())();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!clients.data.length) return;

        const client = clients.data.find((client) => client.name.toLowerCase() === "unknown");
        if (!client) return;

        setValue("clientId", client._id);
        setValue("method", "cash");

        setValue("process", "all");
        setValue("discount", 0);
    }, [clients, setValue]);

    useEffect(() => {
        const productsTotalPrice = products.reduce((prev, cur) => prev + cur?.total, 0);
        setValue("paid", productsTotalPrice);
    }, [products, setValue]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = data as CreateClientType;
        if (!products?.length) return setError("root", { message: "No Products Was Selected." });

        const filterProducts = products.map(({ company, name, ...product }) => product);
        mutate({ ...values, products: filterProducts }, { onSuccess: () => router.push("/") });
    };

    return (
        <CardForm heading="Quick Client Statement">
            <form onSubmit={handleSubmit(onSubmit)}>
                <AlertError root={errors?.root} />
                <OpenModuleButton clearErrors={clearErrors} />

                {!!products.length && <DataTable columns={columns} data={products} smallSize totalFor="total" />}
                <SubmitButton text="Buy" isPending={isPending} />
            </form>

            <InsertProduct setProducts={setProducts} />
            <DeleteDialog setProducts={setProducts} />
        </CardForm>
    );
};

QuickStatement.displayName = "QuickStatement";
export default QuickStatement;
