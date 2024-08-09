import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";
import { Skeleton } from "@/ui/skeleton";

type CardLoadingProps = {};

export const CardLoading = ({}: CardLoadingProps) => {
    return (
        <Card className="">
            <CardContent>
                <CardHeader className="flex-between sm:flex-row">
                    <Skeleton className="h-10 w-72 rounded-xl" />
                    <Skeleton className="h-14 w-48 rounded-xl" />
                </CardHeader>

                <CardFooter className="flex-col gap-4">
                    <Skeleton className="mb-4 mt-6 h-10 w-full self-start rounded-xl sm:w-96" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                </CardFooter>
            </CardContent>
        </Card>
    );
};

CardLoading.displayName = "CardLoading";
