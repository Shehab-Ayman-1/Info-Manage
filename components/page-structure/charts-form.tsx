import { Dispatch, SetStateAction } from "react";
import { ShoppingCartIcon } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/ui/card";
import { Group, SelectBox } from "../ui/select";
import { ChartConfig } from "@/ui/chart";
import { Heading } from "../public/heading";
import { Chart } from "../ui/chart";

const configs = {
    desktop: { label: "Purchases", color: "hsl(var(--chart-1))" },
    mobile: { label: "Profits", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

type Data = {
    month: string;
    desktop: number;
};

type ChartsFormProps = {
    heading: string;
    chart1: {
        heading: string;
        data: Data[];
    };
    chart2: {
        heading: string;
        data: Data[];
    };
    groups?: Group[];
    loading?: boolean;
    setProductId?: Dispatch<SetStateAction<string>>;
};

export const ChartsForm = ({ heading, chart1, chart2, groups, loading, setProductId }: ChartsFormProps) => {
    return (
        <Card className="p-6">
            <CardHeader className="flex-between">
                <Heading title={heading} />
            </CardHeader>

            {groups && (
                <SelectBox
                    label="Product"
                    name="productId"
                    loading={loading}
                    groups={groups}
                    onChange={(value) => setProductId?.(value)}
                />
            )}

            <CardContent className="flex-between">
                <Chart Icon={ShoppingCartIcon} title={chart1.heading} data={chart1.data} className="w-1/2" configs={configs} />
                <Chart Icon={ShoppingCartIcon} title={chart2.heading} data={chart2.data} className="w-1/2" configs={configs} />
            </CardContent>
        </Card>
    );
};

ChartsForm.displayName = "ChartsForm";
