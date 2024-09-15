import { Skeleton } from "@/ui/skeleton";

type CashesLoadingProps = {};

export const CashesLoading = ({}: CashesLoadingProps) => {
    return (
        <div className="flex-between mt-4 !flex-wrap">
            <Skeleton className="h-36 w-full max-w-sm rounded-md p-4" />
            <Skeleton className="h-36 w-full max-w-sm rounded-md p-4" />
            <Skeleton className="h-36 w-full max-w-sm rounded-md p-4" />
            <Skeleton className="h-36 w-full max-w-sm rounded-md p-4" />
            <Skeleton className="h-36 w-full max-w-sm rounded-md p-4" />
        </div>
    );
};

CashesLoading.displayName = "CashesLoading";
