import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/accordion";
import { DataTable } from "@/components/table";
import { Button } from "@/ui/button";

type ChartDetailsType = {
    data: Record<string, string | number>[];
    columns: ColumnDef<any>[];
};

export const ChartDetails = ({ data, columns }: ChartDetailsType) => {
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="day" className="border-b-0">
                <AccordionTrigger className="no-underline hover:no-underline" arrow={false}>
                    <Button variant="outline" size="sm" className="w-full">
                        Open Details
                    </Button>
                </AccordionTrigger>

                <AccordionContent>
                    <DataTable columns={columns} data={data} pagination={pagination} setPagination={setPagination} smallSize />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

ChartDetails.displayName = "ChartDetails";
