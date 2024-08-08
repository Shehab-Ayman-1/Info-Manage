"use client";
import { useOrganization } from "@clerk/nextjs";
import { formatDate } from "date-fns";
import Image from "next/image";

import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { ProfileLoading } from "@/components/loading/bill-profile";
import { DataTable } from "@/components/table";
import { Button } from "@/ui/button";

type ResponseType = {
    _id: string;
    client: { name: string; level: string };
    paid: number;
    total: number;
    discount: number;
    state: string;
    createdAt: Date;
    products: {
        company: string;
        product: string;
        count: number;
        price: number;
    }[];
};

type BillProfileProps = {
    params: { billId: string };
};

const BillProfile = ({ params }: BillProfileProps) => {
    const { data, isPending, error } = useGet<ResponseType>(`/api/show/clients-bills/${params.billId}`, [params.billId]);
    const { organization } = useOrganization();
    if (!organization) return;

    if (isPending) return <ProfileLoading />;
    if (error) return <h1>{error.message}</h1>;

    console.log(data);

    const [{ client, createdAt, total, paid, discount, state, products }] = data;

    const styleText = "mb-4 text-xl font-semibold";
    return (
        <section className="">
            <div className="text-center">
                <div className="flex-between mb-4">
                    <h1 className={styleText}>Client: {client.name}</h1>
                    <h1 className={styleText}>Created At: {formatDate(createdAt, "dd / MM / yyyy")}</h1>
                </div>
                <Button className="w-fit text-xl font-bold print:hidden" size="lg" onClick={print}>
                    Print Receipt
                </Button>
            </div>

            <div className="my-4 rounded-md bg-white px-4 shadow-md dark:bg-black">
                <DataTable columns={columns} data={products} totalFor="total" />
            </div>

            <div className="flex-around flex-wrap md:flex-nowrap">
                <h1 className={styleText}>Total: ( ${total} )</h1>
                <h1 className={styleText}>Paid: ( ${paid} )</h1>
                <h1 className={styleText}>Pending: ( ${total - paid} )</h1>
            </div>

            <div className="flex-around flex-wrap md:flex-nowrap">
                <h1 className={styleText}>Discount: ( ${discount} )</h1>
                <h1 className={styleText}>State: ( {state} )</h1>
            </div>

            <div className="flex-center mt-10 w-full flex-col">
                <Image
                    src={organization.hasImage ? organization.imageUrl : "/logo.png"}
                    alt="logo"
                    width={84}
                    height={84}
                    className="mx-auto block rounded-[100%]"
                />
                <h1 className="text-slate-600 dark:text-slate-300">{organization.name} For Trading</h1>
            </div>
        </section>
    );
};

BillProfile.displayName = "BillProfile";
export default BillProfile;
