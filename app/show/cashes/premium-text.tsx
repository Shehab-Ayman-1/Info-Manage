import { Badge } from "@/ui/badge";
import { Card } from "@/ui/card";

type PremiumTextProps = {
    isSubscribe: boolean;
    text: string;
    value: number;
};

export const PremiumText = ({ isSubscribe, text, value }: PremiumTextProps) => {
    if (!value) return;

    return (
        <Card className="flex-between bg-gradient-heavy mx-auto my-6 max-w-4xl p-2 shadow-md sm:p-6">
            <h1 className="text-xl font-extrabold text-white dark:text-black sm:text-2xl">{text}</h1>
            <h1 className="text-xl font-extrabold text-white dark:text-black sm:text-2xl">
                {isSubscribe ? `$${value.toLocaleString()}` : "????"}
                {!isSubscribe && (
                    <Badge variant="destructive" className="ml-4">
                        Premium
                    </Badge>
                )}
            </h1>
        </Card>
    );
};

PremiumText.displayName = "PremiumText";
