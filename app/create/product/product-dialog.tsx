"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { SubmitButton } from "@/components/public/submit-btn";
import { DialogForm } from "@/components/ui/dialog";
import { useModel } from "@/hooks/useModel";
import { Input } from "@/ui/input";

const schema = z.object({
    name: z.string().min(1),
    barcode: z.string().optional(),
    min: z.number().min(0).int(),
    storeCount: z.number().min(0).int(),
    marketCount: z.number().min(0).int(),
    purchasePrice: z.number().min(0),
    sellingPrice: z.number().min(0),
});

export type ProductType = z.infer<typeof schema>;

type ProductDialogProps = {
    setProducts: Dispatch<SetStateAction<ProductType[]>>;
};

export const ProductDialog = ({ setProducts }: ProductDialogProps) => {
    const { register, formState, reset, handleSubmit } = useForm({ resolver: zodResolver(schema) });
    const { onClose } = useModel();

    const { errors, isLoading } = formState;

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = data as ProductType;
        setProducts((products) => {
            const isExist = products.some((product) => product.name === values.name);
            if (!isExist) return products.concat(values);

            toast.info("This Product Is Already Exist.");
            return products;
        });

        reset();
        onClose();
    };

    return (
        <DialogForm heading="Insert Product" description=" Please Fill All The Required Fields To Succefully Create The Account.">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Product Name" error={errors?.name} {...register("name")} />

                <div className="flex-between">
                    <Input placeholder="Barcode (Optional)" error={errors?.barcode} {...register("barcode")} />
                    <Input
                        type="number"
                        placeholder="Minimum Limit"
                        error={errors?.min}
                        {...register("min", { valueAsNumber: true })}
                    />
                </div>

                <div className="flex-between">
                    <Input
                        type="number"
                        placeholder="Market Count"
                        error={errors?.marketCount}
                        {...register("marketCount", { valueAsNumber: true })}
                    />
                    <Input
                        type="number"
                        placeholder="Store Count"
                        error={errors?.storeCount}
                        {...register("storeCount", { valueAsNumber: true })}
                    />
                </div>

                <div className="flex-between">
                    <Input
                        type="number"
                        placeholder="Purchase Price"
                        error={errors?.purchasePrice}
                        {...register("purchasePrice", { valueAsNumber: true })}
                    />
                    <Input
                        type="number"
                        placeholder="Selling Price"
                        error={errors?.sellingPrice}
                        {...register("sellingPrice", { valueAsNumber: true })}
                    />
                </div>

                <SubmitButton text="Insert" isPending={isLoading} />
            </form>
        </DialogForm>
    );
};

ProductDialog.displayName = "ProductDialog";
