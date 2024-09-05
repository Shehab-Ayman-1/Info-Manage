"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { DollarCell } from "@/components/table/body/price-cell";
import { Actions } from "./table-actions";
import { Button } from "@/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "supplier",
        header: HeaderComponent,
    },
    {
        accessorKey: "phone",
        header: HeaderComponent,
    },
    {
        accessorKey: "pending",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="pending" />,
    },
    {
        accessorKey: "company",
        header: HeaderComponent,
        cell: ({ row }) => (
            <div className="flex-center !flex-wrap">
                {(row.original?.companies).map((company: any) => (
                    <Popover key={company._id}>
                        <PopoverTrigger asChild>
                            <Button type="button" size="sm">
                                {company.name}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent>
                            {row.original.products
                                .filter((product: any) => product.company === company._id)
                                .map((product: any) => {
                                    return (
                                        <Link
                                            key={product._id}
                                            href={`/profile/product/${product._id}`}
                                            className="block w-full cursor-pointer rounded-md p-2 text-start text-lg hover:bg-primary-100 hover:text-black"
                                        >
                                            {product.name}
                                        </Link>
                                    );
                                })}
                        </PopoverContent>
                    </Popover>
                ))}
            </div>
        ),
    },
    {
        accessorKey: "actions",
        header: ({ column }) => <HeaderComponent column={column} noPrint />,
        cell: Actions,
    },
];
