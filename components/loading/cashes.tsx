import { Skeleton } from "@/ui/skeleton";
import { Card } from "@/ui/card";

type CashesLoadingProps = {};

export const CashesLoading = ({}: CashesLoadingProps) => {
    return (
        <Card className="mx-auto mt-6 max-w-4xl border-none">
            <Skeleton className="mt-6 h-16 w-full" />
            <Skeleton className="mt-6 h-16 w-full" />
            <Skeleton className="mt-6 h-16 w-full" />
            <Skeleton className="mt-6 h-16 w-full" />
        </Card>
    );
};

CashesLoading.displayName = "CashesLoading";
