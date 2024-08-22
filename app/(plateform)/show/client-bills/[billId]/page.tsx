"use client";
import { useClerk, useOrganization } from "@clerk/nextjs";
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
    billProfits: number;
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
    const { data, isPending, error } = useGet<ResponseType>(`/api/show/client-bills/${params.billId}`, [params.billId]);
    const { organization } = useOrganization();
    const { user } = useClerk();

    if (!organization) return;
    if (isPending) return <ProfileLoading />;
    if (error) return <h1>{error.message}</h1>;

    const [values] = data;
    if (!values) return;

    const styleText = "mb-4 text-xl font-semibold";
    return (
        <section className="">
            <div className="text-center">
                <div className="flex-between mb-4">
                    <h1 className={styleText}>Client: {values?.client.name}</h1>
                    <h1 className={styleText}>Created At: {formatDate(values?.createdAt, "dd / MM / yyyy")}</h1>
                </div>
                <Button className="w-fit text-xl font-bold print:hidden" size="lg" onClick={print}>
                    Print Receipt
                </Button>
            </div>

            <div className="my-4 rounded-md px-4 shadow-md">
                <DataTable columns={columns} data={values?.products} totalFor="total" />
            </div>

            <div className="flex-around flex-wrap md:flex-nowrap">
                <h1 className={styleText}>Total: ( ${values?.total} )</h1>
                <h1 className={styleText}>Paid: ( ${values?.paid} )</h1>
                <h1 className={styleText}>Pending: ( ${values?.total - values?.paid} )</h1>
            </div>

            <div className="flex-around flex-wrap md:flex-nowrap">
                <h1 className={styleText}>Discount: ( ${values?.discount} )</h1>
                <h1 className={styleText}>State: ( {values?.state} )</h1>
                <h1 className={styleText}>Profits: ( ${values?.billProfits} )</h1>
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
                <h1 className="text-slate-600 dark:text-slate-300">{user?.fullName}</h1>
            </div>
        </section>
    );
};

BillProfile.displayName = "BillProfile";
export default BillProfile;
