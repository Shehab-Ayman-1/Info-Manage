import { Card } from "@/ui/card";
import { CheckCheckIcon } from "lucide-react";

type SubscriptionCardProps = {
    heading: "Basic" | "Premium" | "Enterprise";
    cost: number;
    features: string[];
};

export const SubscriptionCard = ({ heading, cost, features }: SubscriptionCardProps) => {
    return (
        <Card className="w-full max-w-sm rounded-md border-none bg-primary-50 p-4 shadow-md dark:bg-slate-900 dark:shadow-slate-500">
            <h2 className="text-center text-4xl font-bold text-primary">{heading}</h2>
            <p className="my-8 text-center text-xl text-slate-400 dark:text-slate-300">${cost} / month</p>

            <div className="">
                {features.map((feature, index) => (
                    <h3 key={index} className="my-8 mt-4 flex">
                        <CheckCheckIcon className="!text-green-500" />
                        {feature}
                    </h3>
                ))}
            </div>
        </Card>
    );
};

SubscriptionCard.displayName = "SubscriptionCard";
