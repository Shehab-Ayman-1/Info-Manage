"use client";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { useModel } from "@/hooks/useModel";
import { useGet } from "@/hooks/api/useGet";
import { useOrg } from "@/hooks/useOrg";

import { DeleteItemByRequest } from "@/widgets/public/delete-item-by-request";
import { UpdateProduct } from "@/widgets/profile/product/update-product";
import { ProfileLoading } from "@/components/loading/product-profile";
import { CardForm } from "@/components/page-structure/CardForm";
import { ProfileItem } from "./item";

export type ProductProfileType = {
    name: string;
    barcode: string;
    min: number;
    company: { _id: string; name: string; image: string };
    market: { price: number; count: number };
    store: { price: number; count: number };
};

type ProductProfileProps = {
    params: { productId: string };
};

const ProductProfile = ({ params }: ProductProfileProps) => {
    const { data, isPending, error } = useGet<ProductProfileType>(`/api/profile/product/${params.productId}`, [params.productId]);
    const { onOpen } = useModel();
    const { isAdmin } = useOrg();

    const text = useTranslations();
    const router = useRouter();

    if (isPending) return <ProfileLoading />;
    if (error) return router.push("/");

    const { company, name, barcode, min, market, store } = data;

    return (
        <CardForm heading={text("pages.product-profile.heading")}>
            <div className="flex-center flex-col">
                <div className="mx-auto h-28 w-28 overflow-hidden rounded-[100%]">
                    <Image src={company.image} alt="car" width={50} height={50} className="h-full w-full" />
                </div>
                {isAdmin && (
                    <div className="flex-start">
                        <EditIcon className="size-8 !text-orange-500" onClick={() => onOpen("update-profile")} />
                        <Trash2Icon
                            className="size-8 !text-rose-500"
                            onClick={() => onOpen("profile-product-delete-model", { productId: params.productId })}
                        />
                    </div>
                )}
            </div>

            <hr className="my-4 dark:border-slate-500" />

            <div className="flex-between">
                <ProfileItem label="public.company-name" value={company.name} />
                <ProfileItem label="public.product-name" value={name} />
            </div>

            <div className="flex-between">
                <ProfileItem label="public.barcode" value={barcode || "No Barcode"} />
                <ProfileItem label="table.minimum" value={min || "Not Declared"} />
            </div>

            <hr className="my-4 dark:border-slate-500" />

            <div className="flex-between">
                <ProfileItem label="table.purchase-price" value={store.price} />
                <ProfileItem label="public.sold-price" value={market.price} />
            </div>

            <div className="flex-between">
                <ProfileItem label="public.market-count" value={market.count} />
                <ProfileItem label="public.store-count" value={store.count} />
            </div>

            <UpdateProduct productId={params.productId} data={data} />

            <DeleteItemByRequest
                navigate="/"
                queryKeys={["products"]}
                apiUrl={`/api/profile/product/${params.productId}`}
                dialogType="profile-product-delete-model"
                requestKeys={{ senderId: "productId", dataId: "productId" }}
            />
        </CardForm>
    );
};

ProductProfile.displayName = "ProductProfile";
export default ProductProfile;
