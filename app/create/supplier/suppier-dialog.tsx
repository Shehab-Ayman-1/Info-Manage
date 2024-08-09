"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { useLists } from "@/hooks/data/useLists";
import { useModel } from "@/hooks/useModel";

import { SubmitButton } from "@/components/public/submit-btn";
import { DialogForm } from "@/components/ui/dialog";
import { SelectBox } from "@/components/ui/select";

const schema = z.object({
    productId: z.string().min(1),
    productName: z.string().min(1).optional(),
});

export type SchemaType = z.infer<typeof schema>;

type SupplierDialogProps = {
    setProducts: Dispatch<SetStateAction<SchemaType[]>>;
};

export const SupplierDialog = ({ setProducts }: SupplierDialogProps) => {
    const { formState, setValue, reset, handleSubmit } = useForm({ resolver: zodResolver(schema) });
    const { errors, isLoading } = formState;

    const { products } = useLists();
    const { onClose } = useModel();

    useEffect(() => {
        (async () => await products.fetcher?.())();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = data as SchemaType;
        let selected: any;
        products.groups.forEach((group) => {
            const exist = group.list.find((item) => item.value === values.productId);
            if (exist) selected = exist;
        });

        setProducts((products) => {
            const isExist = products.some((product) => product.productId === values.productId);
            if (!isExist) return products.concat({ ...values, productName: selected?.title || "Something Was Wrong" });

            toast.info("This Product Is Already Exist");
            return products;
        });

        reset();
        onClose();
    };

    return (
        <DialogForm heading="Insert Product" description="Append Product To The Choosen Supplier">
            <form onSubmit={handleSubmit(onSubmit)}>
                <SelectBox
                    label="Product"
                    name="productId"
                    loading={products.isLoading}
                    groups={products.groups}
                    error={errors?.productId}
                    setValue={setValue}
                />
                <SubmitButton text="Insert" isPending={isLoading} />
            </form>
        </DialogForm>
    );
};

SupplierDialog.displayName = "SupplierDialog";
