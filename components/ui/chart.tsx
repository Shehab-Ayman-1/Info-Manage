"use client";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useTranslations } from "next-intl";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

type ChartProps = {
    Icon: any;
    title: string;
    className?: string;
    configs: ChartConfig;
    data: {
        month: string;
        desktop: number;
    }[];
};

export const Chart = ({ Icon, title, className, data, configs }: ChartProps) => {
    const text = useTranslations();

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="flex-start !items-start font-extrabold text-primary">
                    <div className="flex-center bg-gradient-heavy w-fit rounded-xl p-4">
                        <Icon className="size-12 text-white hover:text-white" />
                    </div>
                    <div className="">
                        <h1>{text(title)}</h1>
                        <p className="mt-1.5 text-sm text-slate-400">{text("pages.statistics.track")}</p>
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <ChartContainer config={configs}>
                    <AreaChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />

                        {data?.[0]?.month ? (
                            <XAxisComponent dataKey="month" tickFormatter={(value) => value.slice(0, 3)} />
                        ) : (
                            <XAxisComponent dataKey="day" />
                        )}

                        <ChartTooltip content={<ChartTooltipContent />} />

                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>

                        <Area
                            dataKey="chart_1"
                            fillOpacity={0.4}
                            stackId="a"
                            type="bump"
                            fill="url(#fillMobile)"
                            stroke="var(--color-mobile)"
                            className="pointer-events-none"
                        />

                        <Area
                            dataKey="chart_2"
                            fillOpacity={0.4}
                            stackId="a"
                            type="bump"
                            fill="url(#fillDesktop)"
                            stroke="var(--color-desktop)"
                            className="pointer-events-none"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

type XAxisComponent = {
    dataKey: string;
    tickFormatter?: (value: any, index: number) => string;
};

const XAxisComponent = ({ dataKey, tickFormatter }: XAxisComponent) => {
    return <XAxis dataKey={dataKey} tickMargin={8} tickFormatter={tickFormatter} />;
};

XAxisComponent.displayName = "XAxisComponent";
