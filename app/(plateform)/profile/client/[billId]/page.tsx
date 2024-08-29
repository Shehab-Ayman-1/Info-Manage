"use client";
import { useClerk, useOrganization } from "@clerk/nextjs";
import { useReactToPrint } from "react-to-print";
import { PrinterCheckIcon } from "lucide-react";
import { formatDate } from "date-fns";
import Image from "next/image";

import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { ProfileLoading } from "@/components/loading/bill-profile";
import { DataTable } from "@/components/table";
import { Button } from "@/ui/button";
import { cn } from "@/utils/shadcn";

type ResponseType = {
    _id: string;
    barcode: number;
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
    const { data, isPending, error } = useGet<ResponseType>(`/api/profile/client/${params.billId}`, [params.billId]);
    const { organization } = useOrganization();
    const { user } = useClerk();
    const values = data?.[0];

    const onPrint = useReactToPrint({
        content: () => document.getElementById("client-bill"),
        documentTitle: `${values?.client.name} Bill`,
        pageStyle: "p-4",
    });

    if (!values || !organization) return;
    if (isPending) return <ProfileLoading />;
    if (error) return <h1>{error.message}</h1>;

    const styleText = "mb-4 text-xl font-semibold";
    return (
        <section id="client-bill">
            <div className="text-center">
                <div className="flex-between mb-4">
                    <h1 className={styleText}>Client: {values.client.name}</h1>
                    {values.state !== "restore" && <h1 className={styleText}>Barcode: {values.barcode.toLocaleString()}</h1>}
                    <h1 className={styleText}>Created At: {formatDate(values.createdAt, "dd / MM / yyyy")}</h1>
                </div>

                <Button size="lg" className="w-fit gap-1 text-lg font-bold print:hidden" onClick={onPrint}>
                    <PrinterCheckIcon className="size-5 !text-white dark:!text-black" />
                    Print Receipt
                </Button>
            </div>

            <div className="my-4 rounded-md px-4 shadow-md">
                <DataTable columns={columns} data={values.products} totalFor="total" />
            </div>

            <div className="flex-around flex-wrap md:flex-nowrap">
                <h1 className={styleText}>Total: ( ${values.total} )</h1>
                <h1 className={styleText}>Paid: ( ${values.paid} )</h1>
                <h1 className={styleText}>Pending: ( ${values.total - values.paid} )</h1>
            </div>

            <div className="flex-around flex-wrap md:flex-nowrap">
                <h1 className={styleText}>Discount: ( ${values.discount} )</h1>
                <h1 className={styleText}>State: ( {values.state} )</h1>
                <h1 className={cn(styleText, "print:hidden")}>Profits: ( ${values.billProfits} )</h1>
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
