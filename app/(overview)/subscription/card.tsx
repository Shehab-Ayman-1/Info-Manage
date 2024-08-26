import { auth, clerkClient } from "@clerk/nextjs/server";
import { CheckCheckIcon } from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { Badge } from "@/ui/badge";
import { Card } from "@/ui/card";
import { cn } from "@/utils/shadcn";

type SubscriptionCardProps = {
    heading: "Basic" | "Premium" | "Enterprise";
    costs: { month: number; year: number; life: number } | { month: number; halfYear: number; year: number };
    features: {
        label: string;
        description: string;
    }[];
};

type Cost = keyof SubscriptionCardProps["costs"];

export const SubscriptionCard = async ({ heading, costs, features }: SubscriptionCardProps) => {
    const { orgId, orgSlug } = auth();
    const organization = orgSlug && (await clerkClient().organizations.getOrganization({ organizationId: orgId, slug: orgSlug }));
    const subscription = (organization as any)?.publicMetadata?.subscription;
    const additionalSubscriptions = (organization as any)?.publicMetadata?.additionalSubscriptions;

    const isSubscribe = subscription === heading.toLowerCase() || additionalSubscriptions?.includes(heading.toLowerCase());

    return (
        <Card
            className={cn(
                "relative w-full max-w-sm rounded-md border-none p-4 shadow-md dark:shadow-slate-500",
                isSubscribe ? "bg-green-50 dark:bg-green-900/30" : "bg-primary-50 dark:bg-slate-900",
            )}
        >
            <div className="">
                {isSubscribe && <Badge className="absolute right-2 top-2 bg-green-800 text-white">Active</Badge>}
                <h2 className="text-center text-2xl font-bold sm:text-4xl">{heading}</h2>
            </div>

            <div className="flex-between my-4 !flex-wrap sm:my-8">
                {Object.keys(costs).map((cost) => (
                    <p key={cost} className="text-center text-base text-slate-600 dark:text-slate-300">
                        ${costs[cost as Cost].toLocaleString()} / {cost === "halfYear" ? "6 months" : cost}
                    </p>
                ))}
            </div>

            <hr className="border-slate-300 dark:border-slate-600" />

            <div className="">
                <TooltipProvider>
                    {features.map((feature, index) => (
                        <Tooltip key={index}>
                            <TooltipTrigger className="flex-start my-8 whitespace-nowrap text-xs sm:text-base">
                                <CheckCheckIcon className="size-4 !text-green-500 sm:size-6" />
                                {feature.label}
                            </TooltipTrigger>
                            <TooltipContent>{feature.description}</TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </div>
        </Card>
    );
};

SubscriptionCard.displayName = "SubscriptionCard";
