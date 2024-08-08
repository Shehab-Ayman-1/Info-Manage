import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { useUpdate } from "@/hooks/api/useUpdate";
import { useLists } from "@/hooks/data/useLists";
import { useModel } from "@/hooks/useModel";
import { ProfileType } from "./page";

import { editSchema, EditProfileSchema } from "@/app/api/profile/[productId]/schema";
import { SubmitButton } from "@/components/submit-btn";
import { DialogForm } from "@/components/dialog";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

type UpdateDialogProps = {
    productId: string;
    data: ProfileType[];
};

const UpdateDialog = ({ productId, data }: UpdateDialogProps) => {
    const { mutate, isPending } = useUpdate<EditProfileSchema>(`/api/profile/${productId}`, ["profile", "market", "store"]);
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

    return (
        <DialogForm heading="Update Product" description="After The Product Updating, You Can't Undo Any Changes">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-center w-full">
                    <Image
                        src={availableImageSrc ? image : company.image}
                        alt="company image"
                        width={128}
                        height={128}
                        className="rounded-md"
                    />
                </div>

                <hr className="my-4 dark:border-slate-500" />

                <div className="flex-between">
                    <div className="w-full">
                        <Label className="font-bold">Company:</Label>
                        <Input placeholder="Company" error={errors?.company} {...register("company")} />
                    </div>
                    <div className="w-full">
                        <Label className="font-bold">Image:</Label>
                        <Input placeholder="Company Image" error={errors?.image} {...register("image")} />
                    </div>
                </div>

                <div className="flex-between">
                    <div className="w-full">
                        <Label className="font-bold">Name:</Label>
                        <Input placeholder="Name" error={errors?.name} {...register("name")} />
                    </div>
                    <div className="w-full">
                        <Label className="font-bold">Barcode:</Label>
                        <Input placeholder="Barcode" error={errors?.barcode} {...register("barcode")} />
                    </div>
                </div>

                <hr className="my-4 dark:border-slate-500" />

                <div className="flex-between">
                    <div className="w-full">
                        <Label className="font-bold">Purchase Price:</Label>
                        <Input
                            type="number"
                            placeholder="Purchase Price"
                            error={errors?.purchasePrice}
                            {...register("purchasePrice")}
                        />
                    </div>
                    <div className="w-full">
                        <Label className="font-bold">Sale Price:</Label>
                        <Input type="number" placeholder="Sale Price" error={errors?.salePrice} {...register("salePrice")} />
                    </div>
                </div>

                <div className="flex-between">
                    <div className="w-full">
                        <Label className="font-bold">Market Count:</Label>
                        <Input
                            type="number"
                            placeholder="Market Count"
                            error={errors?.marketCount}
                            {...register("marketCount")}
                        />
                    </div>
                    <div className="w-full">
                        <Label className="font-bold">Store Count:</Label>
                        <Input type="number" placeholder="Store Count" error={errors?.storeCount} {...register("storeCount")} />
                    </div>
                </div>

                <SubmitButton text="Update" isPending={isPending} />
            </form>
        </DialogForm>
    );
};

UpdateDialog.displayName = "UpdateDialog";
export default UpdateDialog;
