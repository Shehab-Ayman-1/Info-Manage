import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { useUpdate } from "@/hooks/api/useUpdate";
import { useLists } from "@/hooks/data/useLists";
import { useModel } from "@/hooks/useModel";
import { ProfileType } from "./page";

import { editSchema, EditProfileSchema } from "@/app/api/profile/product/[productId]/schema";
import { SubmitButton } from "@/components/public/submit-btn";
import { DialogForm } from "@/components/ui/dialog";
import { Input } from "@/ui/input";

type UpdateDialogProps = {
    productId: string;
    data: ProfileType[];
};

export const UpdateDialog = ({ productId, data }: UpdateDialogProps) => {
    const { mutate, isPending } = useUpdate<EditProfileSchema>(`/api/profile/product/${productId}`, [
        productId,
        "market",
        "store",
    ]);
    const [{ company, name, barcode, market, store }] = data;

    const { formState, register, watch, handleSubmit } = useForm<EditProfileSchema>({
        resolver: zodResolver(editSchema),
        defaultValues: {
            companyId: company._id,
            company: company.name,
            image: company.image,
            name,
            barcode,
            purchasePrice: market.price,
            salePrice: store.price,
            marketCount: market.count,
            storeCount: store.count,
        },
    });

    const { type, onClose } = useModel();
    const { onReset } = useLists();
    const { errors } = formState;

    if (type !== "update-profile") return;

    const image = watch("image");
    const availableImageSrc = image?.startsWith("https://") || image?.startsWith("http://") || image?.startsWith("data:image");

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = data as EditProfileSchema;
        const onSuccess = () => {
            onClose();
            onReset(["products", "suppliers"]);
        };
        mutate({ ...values, image: availableImageSrc ? values.image : company.image }, { onSuccess });
    };

    console.log(errors);

    return (
        <DialogForm heading="Update Product" description="After The Product Updating, You Can't Undo Any Changes">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mx-auto h-28 w-28 overflow-hidden rounded-[100%]">
                    <Image
                        src={availableImageSrc ? image : "/overview.jpeg"}
                        alt="car"
                        width={50}
                        height={50}
                        className="h-full w-full"
                    />
                </div>

                <hr className="my-4 dark:border-slate-500" />

                <div className="flex-between">
                    <Input placeholder="Company" error={errors?.company} {...register("company")} />
                    <Input placeholder="Company Image" error={errors?.image} {...register("image")} />
                </div>

                <div className="flex-between">
                    <Input placeholder="Name" error={errors?.name} {...register("name")} />
                    <Input placeholder="Barcode" error={errors?.barcode} {...register("barcode")} />
                </div>

                <hr className="my-4 dark:border-slate-500" />

                <div className="flex-between">
                    <Input
                        type="number"
                        placeholder="Purchase Price"
                        error={errors?.purchasePrice}
                        {...register("purchasePrice", { valueAsNumber: true })}
                    />
                    <Input
                        type="number"
                        placeholder="Sale Price"
                        error={errors?.salePrice}
                        {...register("salePrice", { valueAsNumber: true })}
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

                <SubmitButton text="Update" isPending={isPending} />
            </form>
        </DialogForm>
    );
};

UpdateDialog.displayName = "UpdateDialog";
