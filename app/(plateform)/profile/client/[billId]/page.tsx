"use client";
import { useClerk, useOrganization, ClerkLoaded } from "@clerk/nextjs";
import { useReactToPrint } from "react-to-print";
import { PrinterCheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { formatDate } from "date-fns";
import Image from "next/image";

import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { ProfileLoading } from "@/components/loading/bill-profile";
import { DataTable } from "@/components/table";
import { Button } from "@/ui/button";
import { cn } from "@/utils/shadcn";

type BillProfileType = {
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
    const { data, isPending, error } = useGet<BillProfileType>(`/api/profile/client/${params.billId}`, [params.billId]);
    const { organization } = useOrganization();
    const { user } = useClerk();
    const text = useTranslations();

    const onPrint = useReactToPrint({
        content: () => document.getElementById("client-bill"),
        documentTitle: `${data?.client.name} Bill`,
        pageStyle: "p-4",
    });

    if (isPending) return <ProfileLoading />;
    if (error) return <h1>{error.message}</h1>;

    const styleText = "mb-4 text-xl font-semibold";

    return (
        <section id="client-bill">
            <div className="text-center">
                <div className="flex-between mb-4">
                    <h1 className={styleText}>
                        {text("public.client")}: {data.client.name}
                    </h1>
                    <h1 className={styleText}>
                        {text("public.barcode")}: {data.barcode.toLocaleString()}
                    </h1>
                    <h1 className={styleText}>
                        {text("table.created-at")}: {formatDate(data.createdAt, "dd / MM / yyyy")}
                    </h1>
                </div>

                <Button type="button" size="lg" className="w-fit gap-2 text-lg font-bold print:hidden" onClick={onPrint}>
                    <PrinterCheckIcon className="size-5 !text-white dark:!text-black" />
                    {text("public.print-receipt")}
                </Button>
            </div>

            <div className="my-4 rounded-md px-4 shadow-md">
                <DataTable columns={columns} data={data.products} totalFor="total" />
            </div>

            <div className="flex-around flex-wrap md:flex-nowrap">
                <h1 className={styleText}>
                    {text("table.total")}: ( ${data.total} )
                </h1>
                <h1 className={styleText}>
                    {text("table.paid")}: ( ${data.paid} )
                </h1>
                <h1 className={styleText}>
                    {text("table.pending")}: ( ${data.total - data.paid} )
                </h1>
            </div>

            <div className="flex-around flex-wrap md:flex-nowrap">
                <h1 className={styleText}>
                    {text("table.discount")}: ( ${data.discount} )
                </h1>
                <h1 className={styleText}>
                    {text("table.state")}: ( {text(`public.${data.state}`)} )
                </h1>
                <h1 className={cn(styleText, "print:hidden")}>
                    {text("table.profits")}: ( ${data.billProfits} )
                </h1>
            </div>

            <ClerkLoaded>
                <div className="flex-center mt-10 w-full flex-col">
                    <Image
                        src={organization?.hasImage ? organization.imageUrl : "/logo.png"}
                        alt="logo"
                        width={84}
                        height={84}
                        className="mx-auto block rounded-[100%]"
                    />
                    <h1 className="text-slate-600 dark:text-slate-300">{organization?.name} For Trading</h1>
                    <h1 className="text-slate-600 dark:text-slate-300">{user?.fullName}</h1>
                </div>
            </ClerkLoaded>
        </section>
    );
};

BillProfile.displayName = "BillProfile";
export default BillProfile;
