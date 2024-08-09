"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createSchema, CreateClientType } from "@/app/api/statements/clients/schema";
import { OpenModuleButton } from "@/components/public/openModuleButton";
import { InsertProducts, ProductType } from "./insertProducts";

import { useCreate } from "@/hooks/api/useCreate";
import { useLists } from "@/hooks/data/useLists";
import { methods, process } from "@/constants";

import { CardForm } from "@/components/page-structure/CardForm";
import { SubmitButton } from "@/components/public/submit-btn";
import { AlertError } from "@/components/ui/alert-error";
import { SelectBox } from "@/components/ui/select";
import { DataTable } from "@/components/table";
import { columns } from "./table-columns";
import { Input } from "@/ui/input";
import { cn } from "@/utils/shadcn";

type ClientsProps = {};

const Clients = ({}: ClientsProps) => {
    const { register, watch, setValue, setError, clearErrors, handleSubmit, formState } = useForm({
        resolver: zodResolver(createSchema.omit({ products: true })),
    });

    const [products, setProducts] = useState<ProductType[]>([]);
    const { mutate, isPending } = useCreate<CreateClientType>("/api/statements/clients", ["bills"]);

    const { clients } = useLists();
    const { errors } = formState;

    const processValue = watch("process");
    const router = useRouter();

    useEffect(() => {
        (async () => await clients.fetcher?.())();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // Auto Get Total Products Total Price
        if (processValue === "milestone") return;

        const productsTotalPrice = products.reduce((prev, cur) => prev + cur?.total, 0);
        setValue("paid", productsTotalPrice);
    }, [products, setValue, processValue]);

    const onProcessChange = (value: string) => {
        if (value === "milestone") {
            setValue("process", "milestone");
            return setValue("paid", "");
        }

        const productsTotalPrice = products.reduce((prev, cur) => prev + cur?.total, 0);
        setValue("process", "all");
        setValue("paid", productsTotalPrice);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const { clientId, discount, method, process, paid } = data as CreateClientType;
        if (!products?.length) return setError("root", { message: "No Products Was Selected." });

        mutate({ clientId, discount, method, process, products, paid }, { onSuccess: () => router.push("/") });
    };

    return (
        <CardForm heading="Client Statement">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-between">
                    <SelectBox
                        label="Choose Client"
                        name="clientId"
                        loading={clients.isLoading}
                        items={clients.lists}
                        error={errors?.clientId}
                        setValue={setValue}
                    />
                    <SelectBox label="Choose Method" name="method" error={errors?.method} items={methods} setValue={setValue} />
                </div>

                <div className={cn("flex-between", processValue === "milestone" && "flex-wrap")}>
                    <SelectBox
                        label="Choose Process"
                        name="process"
                        error={errors?.process}
                        items={process}
                        onChange={onProcessChange}
                    />

                    <div className="flex-between w-full">
                        <Input type="number" placeholder="Discount" {...register("discount", { valueAsNumber: true })} />

                        {processValue === "milestone" && (
                            <Input type="number" placeholder="Paid Amount" {...register("paid", { valueAsNumber: true })} />
                        )}
                    </div>
                </div>

                <AlertError root={errors?.root} />
                <OpenModuleButton clearErrors={clearErrors} />

                {!!products.length && <DataTable columns={columns} data={products} smallSize totalFor="total" />}
                <SubmitButton text="Buy" isPending={isPending} />
            </form>

            <InsertProducts setProducts={setProducts} />
        </CardForm>
    );
};

Clients.displayName = "Clients";
export default Clients;
