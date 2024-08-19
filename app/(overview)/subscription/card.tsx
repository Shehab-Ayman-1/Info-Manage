import { Card } from "@/ui/card";
import { CheckCheckIcon } from "lucide-react";

type SubscriptionCardProps = {
    heading: "Basic" | "Premium" | "Enterprise";
    costs: {
        month: number;
        year: number;
        life: number;
    };
    features: string[];
};

type Cost = keyof SubscriptionCardProps["costs"];

export const SubscriptionCard = ({ heading, costs, features }: SubscriptionCardProps) => {
    return (
        <Card className="w-full max-w-sm rounded-md border-none bg-primary-50 p-4 shadow-md dark:bg-slate-900 dark:shadow-slate-500">
            <h2 className="text-center text-2xl font-bold text-primary sm:text-4xl">{heading}</h2>

            <div className="flex-between my-4 !flex-wrap sm:my-8">
                {Object.keys(costs).map((cost) => (
                    <p key={cost} className="text-center text-base text-slate-400 dark:text-slate-300">
                        ${costs[cost as Cost].toLocaleString()} / {cost}
                    </p>
                ))}
            </div>

            <hr className="border-slate-300 dark:border-slate-600" />

            <div className="">
                {features.map((feature, index) => (
                    <h3 key={index} className="flex-start my-8 whitespace-nowrap text-xs sm:text-base">
                        <CheckCheckIcon className="size-4 !text-green-500 sm:size-6" />
                        {feature}
                    </h3>
                ))}
            </div>
        </Card>
    );
};

SubscriptionCard.displayName = "SubscriptionCard";
