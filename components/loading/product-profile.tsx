import { CardForm } from "@/components/page-structure/CardForm";
import { Skeleton } from "@/ui/skeleton";

type ProfileLoadingProps = {};

export const ProfileLoading = ({}: ProfileLoadingProps) => {
    return (
        <CardForm heading="Product Profile">
            <div className="image">
                <Skeleton className="m-auto h-32 w-32 rounded-full" />
            </div>

            <div className="icons flex-center m-auto my-5 w-fit">
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
            </div>

            <div className="my-4">
                <Skeleton className="h-10" />
                <Skeleton className="mt-4 h-10" />
            </div>

            <div className="flex-between">
                <Skeleton className="mt-4 h-10 w-full" />
                <Skeleton className="mt-4 h-10 w-full" />
            </div>

            <div className="flex-between">
                <Skeleton className="mt-4 h-10 w-full" />
                <Skeleton className="mt-4 h-10 w-full" />
            </div>

            <div className="flex-between">
                <Skeleton className="mt-4 h-10 w-full" />
                <Skeleton className="mt-4 h-10 w-full" />
            </div>
        </CardForm>
    );
};

ProfileLoading.displayName = "ProfileLoading";
