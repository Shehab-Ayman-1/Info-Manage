"use client";
import { useOrganization } from "@clerk/nextjs";
import { CheckCheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { Badge } from "@/ui/badge";
import { Card } from "@/ui/card";
import { cn } from "@/utils/shadcn";
import { animate } from "@/constants";

type SubscriptionCardProps = {
    heading: "basic" | "premium" | "enterprise";
    costs: { month: number; year: number; life: number } | { month: number; halfYear: number; year: number };
    features: string[];
    className?: string;
};

type Cost = keyof SubscriptionCardProps["costs"];

export const SubscriptionCard = ({ heading, costs, features, className }: SubscriptionCardProps) => {
    const text = useTranslations("subscriptions");
    const { organization } = useOrganization();

    const subscription = organization?.publicMetadata?.subscription as string;
    const additionalSubscriptions = organization?.publicMetadata?.additionalSubscriptions as string[];

    const isSubscribe = subscription === heading || additionalSubscriptions?.includes(heading.toLowerCase());

    return (
        <Card
            className={cn(
                "relative w-full max-w-sm rounded-md border-none p-4 shadow-md dark:shadow-slate-500",
                isSubscribe ? "bg-green-50/50 dark:bg-green-900/30" : "bg-primary-50 dark:bg-slate-900",
                className,
            )}
        >
            <motion.div {...animate("opacity")}>
                {isSubscribe && <Badge className="absolute right-2 top-2 bg-green-800 text-white">Active</Badge>}
                <h2 className="mt-4 text-center text-2xl font-bold sm:text-4xl">{heading.toUpperCase()}</h2>
            </motion.div>

            <div className="flex-between my-4 !flex-wrap sm:my-8">
                {Object.keys(costs).map((cost) => (
                    <motion.p
                        key={cost}
                        {...animate("opacity")}
                        className="text-center text-base text-slate-600 dark:text-slate-300"
                    >
                        ${costs[cost as Cost].toLocaleString()} /{" "}
                        {cost === "halfYear" ? text("durations.half-year") : text(`durations.${cost}`)}
                    </motion.p>
                ))}
            </div>

            <hr className="border-slate-300 dark:border-slate-600" />

            <div className="">
                <TooltipProvider>
                    {features.map((feature, index) => (
                        <Tooltip key={index}>
                            <TooltipTrigger asChild className="flex-start w-fit whitespace-nowrap py-4 text-xs sm:text-base">
                                <motion.div {...animate("opacity")} whileHover={{ scale: 1.1 }}>
                                    <CheckCheckIcon className="size-4 !text-green-500 sm:size-6" />
                                    {text(`${heading}.${feature}.label`)}
                                </motion.div>
                            </TooltipTrigger>
                            <TooltipContent>{text(`${heading}.${feature}.description`)}</TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </div>
        </Card>
    );
};

SubscriptionCard.displayName = "SubscriptionCard";
