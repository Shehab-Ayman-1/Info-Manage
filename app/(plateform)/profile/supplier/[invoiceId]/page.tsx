"use client";
import { ClerkLoaded, useClerk, useOrganization } from "@clerk/nextjs";
import { useReactToPrint } from "react-to-print";
import { PrinterCheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { formatDate } from "date-fns";
import Image from "next/image";

import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { ProfileLoading } from "@/components/loading/invoice-profile";
import { DataTable } from "@/components/table";
import { Button } from "@/ui/button";

type SupplierProfileType = {
    _id: string;
    supplier: string;
    paid: number;
    total: number;
    state: string;
    createdAt: Date;
    products: {
        product: string;
        count: number;
        price: number;
    }[];
};

type InvoiceProfileProps = {
    params: { invoiceId: string };
};

const InvoiceProfile = ({ params }: InvoiceProfileProps) => {
    const { data, isPending, error } = useGet<SupplierProfileType>(`/api/profile/supplier/${params.invoiceId}`, [
        params.invoiceId,
    ]);
    const { organization } = useOrganization();
    const { user } = useClerk();
    const text = useTranslations();

    const onPrint = useReactToPrint({
        content: () => document.getElementById("supplier-invoice"),
        documentTitle: `${data?.supplier} Invoice`,
        pageStyle: "p-4",
    });

    if (isPending) return <ProfileLoading />;
    if (error) return <h1>{error.message}</h1>;

    const styleText = "mb-4 text-xl font-semibold";

    return (
        <section id="supplier-invoice">
            <div className="text-center">
                <div className="flex-between mb-4">
                    <h1 className={styleText}>
                        {text("public.supplier")}: {data.supplier}
                    </h1>
                    <h1 className={styleText}>
                        {text("table.created-at")}: {formatDate(data.createdAt, "dd / MM / yyyy")}
                    </h1>
                </div>
                <Button type="button" size="lg" className="w-fit gap-2 text-lg font-bold print:hidden" onClick={onPrint}>
                    <PrinterCheckIcon className="size-5 !text-white" />
                    {text("public.print-receipt")}
                </Button>
            </div>

            {!!data.products.length && (
                <div className="my-4 rounded-md bg-white px-4 shadow-md dark:bg-black">
                    <DataTable columns={columns} data={data.products} totalFor="total" />
                </div>
            )}

            <div className="flex-around flex-wrap md:flex-nowrap">
                <h1 className={styleText}>
                    {text("table.total")} {data.state === "payment" ? text("table.pending") : text("table.costs")}: ( $
                    {data.total} )
                </h1>
                <h1 className={styleText}>
                    {text("table.paid")}: ( ${data.paid} )
                </h1>
            </div>

            <div className="flex-around flex-wrap md:flex-nowrap">
                <h1 className={styleText}>
                    {text("table.pending")}: ( ${data.total - data.paid} )
                </h1>
                <h1 className={styleText}>
                    {text("table.state")}: ( {text(`public.${data.state}`)} )
                </h1>
            </div>

            <ClerkLoaded>
                <div className="flex-center mt-10 w-full flex-col">
                    <Image
                        src={organization?.hasImage ? organization.imageUrl : "/logo.png"}
                        className="mx-auto block rounded-[100%]"
                        alt="logo"
                        width={84}
                        height={84}
                    />
                    <h1 className="text-slate-600 dark:text-slate-300">{organization?.name} For Trading</h1>
                    <h1 className="text-slate-600 dark:text-slate-300">{user?.fullName}</h1>
                </div>
            </ClerkLoaded>
        </section>
    );
};

InvoiceProfile.displayName = "InvoiceProfile";
export default InvoiceProfile;
