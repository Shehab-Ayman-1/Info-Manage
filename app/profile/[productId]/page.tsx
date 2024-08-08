"use client";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useModel } from "@/hooks/useModel";
import { useGet } from "@/hooks/api/useGet";

import { ProfileLoading } from "@/components/loading/product-profile";
import { CardForm } from "@/components/CardForm";
import { Label } from "@/ui/label";

import DeleteDialog from "./deleteDialog";
import UpdateDialog from "./updateDialog";

export type ProfileType = {
    company: { _id: string; name: string; image: string };
    name: string;
    barcode: string;
    market: { price: number; count: number };
    store: { price: number; count: number };
};

type ProductProfileProps = {
    params: { productId: string };
};

const ProductProfile = ({ params }: ProductProfileProps) => {
    const { data, isPending, error } = useGet<ProfileType>(`/api/profile/${params.productId}`, [params.productId]);
    const { onOpen } = useModel();
    const router = useRouter();

    if (isPending || !data) return <ProfileLoading />;
    if (error) return router.push("/");

    const [{ company, name, barcode, market, store }] = data;

    const labelStyle = "text-xl font-bold text-primary";
    const textStyle = "bg-primary-100 text-xl font-bold px-4 py-2 rounded-md shadow dark:text-black";

    return (
        <CardForm heading="Product Profile">
            <div className="flex-center flex-col">
                <Image src={company.image} alt="company image" width={128} height={128} className="rounded-[100%]" />
                <div className="flex-start">
                    <EditIcon className="size-8 !text-orange-500" onClick={() => onOpen("update-profile")} />
                    <Trash2Icon className="size-8 !text-rose-500" onClick={() => onOpen("delete-profile")} />
                </div>
            </div>

            <hr className="my-4 dark:border-slate-500" />

            <div className="">
                <Label className={labelStyle}>Company:</Label>
                <p className={textStyle}>{company.name}</p>
            </div>

            <div className="">
                <Label className={labelStyle}>Name:</Label>
                <p className={textStyle}>{name}</p>
            </div>

            <div className="">
                <Label className={labelStyle}>Barcode:</Label>
                <p className={textStyle}>{barcode || "No Barcode"}</p>
            </div>

            <hr className="my-4 dark:border-slate-500" />

            <div className="flex-between">
                <div className="w-full">
                    <Label className={labelStyle}>Purchase Price:</Label>
                    <p className={textStyle}>{market.price}</p>
                </div>

                <div className="w-full">
                    <Label className={labelStyle}>Sale Price:</Label>
                    <p className={textStyle}>{market.price}</p>
                </div>
            </div>

            <div className="flex-between">
                <div className="w-full">
                    <Label className={labelStyle}>Market Count:</Label>
                    <p className={textStyle}>{market.count}</p>
                </div>

                <div className="w-full">
                    <Label className={labelStyle}>Store Count:</Label>
                    <p className={textStyle}>{store.count}</p>
                </div>
            </div>

            <UpdateDialog productId={params.productId} data={data!} />
            <DeleteDialog productId={params.productId} />
        </CardForm>
    );
};

ProductProfile.displayName = "ProductProfile";
export default ProductProfile;
