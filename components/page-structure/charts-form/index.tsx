import { ChartColumnIncreasingIcon, ChartSplineIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader } from "@/ui/card";
import { Heading } from "@/components/public/heading";
import { Chart } from "@/components/ui/chart";
import { ChartDetails } from "./ChartDetails";
import { ChartConfig } from "@/ui/chart";
import { columns } from "./table-columns";
import { animate } from "@/constants";

const configs = {
    desktop: { label: "Purchases", color: "hsl(var(--chart-2))" },
    mobile: { label: "Profits", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

export type Data = {
    month: string;
    desktop: number;
};

type ChartsFormProps = {
    children?: React.ReactNode;
    heading: string;
    chart1: {
        heading: string;
        data: Data[];
    };
    chart2: {
        data: Data[];
        heading: string;
        columns?: ColumnDef<any>[];
        invoicements?: Record<string, string | number>[];
    };
};

export const ChartsForm = ({ heading, chart1, chart2, children }: ChartsFormProps) => {
    return (
        <Card className="p-3 sm:p-6">
            <CardHeader className="text-center">
                <Heading title={heading} />
            </CardHeader>

            {children}

            {!!(chart1.data?.length || chart2.data?.length) && (
                <CardContent className="flex-between !items-start">
                    <motion.div {...animate("translate")} className="w-1/2">
                        <Chart
                            Icon={ChartColumnIncreasingIcon}
                            title={chart1.heading}
                            data={chart1.data}
                            configs={configs}
                            className="w-full"
                        />

                        <ChartDetails data={chart1.data} columns={columns} />
                    </motion.div>

                    <motion.div {...animate("translate")} className="w-1/2">
                        <Chart
                            Icon={ChartSplineIcon}
                            title={chart2.heading}
                            data={chart2.data}
                            configs={configs}
                            className="w-full"
                        />

                        <ChartDetails data={chart2?.invoicements || chart2.data} columns={chart2?.columns || columns} />
                    </motion.div>
                </CardContent>
            )}
        </Card>
    );
};

ChartsForm.displayName = "ChartsForm";
