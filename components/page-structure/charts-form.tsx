import { ShoppingCartIcon } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/ui/card";
import { Heading } from "@/components/public/heading";
import { Chart } from "@/components/ui/chart";
import { ChartConfig } from "@/ui/chart";

const configs = {
    desktop: { label: "Purchases", color: "hsl(var(--chart-1))" },
    mobile: { label: "Profits", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

type Data = {
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
        heading: string;
        data: Data[];
    };
};

export const ChartsForm = ({ heading, chart1, chart2, children }: ChartsFormProps) => {
    return (
        <Card className="p-6">
            <CardHeader className="flex-between">
                <Heading title={heading} />
            </CardHeader>

            {children}

            {!!(chart1.data?.length || chart2.data?.length) && (
                <CardContent className="flex-between">
                    <Chart
                        Icon={ShoppingCartIcon}
                        title={chart1.heading}
                        data={chart1.data}
                        className="w-1/2"
                        configs={configs}
                    />
                    <Chart
                        Icon={ShoppingCartIcon}
                        title={chart2.heading}
                        data={chart2.data}
                        className="w-1/2"
                        configs={configs}
                    />
                </CardContent>
            )}
        </Card>
    );
};

ChartsForm.displayName = "ChartsForm";
