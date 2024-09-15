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

            <hr className="my-4 dark:border-slate-500" />

            <div className="flex-between">
                <div className="w-full">
                    <Skeleton className="mt-4 h-5 w-1/4" />
                    <Skeleton className="mt-4 h-10 w-full" />
                </div>

                <div className="w-full">
                    <Skeleton className="mt-4 h-5 w-1/4" />
                    <Skeleton className="mt-4 h-10 w-full" />
                </div>
            </div>

            <div className="flex-between">
                <div className="w-full">
                    <Skeleton className="mt-4 h-5 w-1/4" />
                    <Skeleton className="mt-4 h-10 w-full" />
                </div>

                <div className="w-full">
                    <Skeleton className="mt-4 h-5 w-1/4" />
                    <Skeleton className="mt-4 h-10 w-full" />
                </div>
            </div>

            <hr className="my-4 dark:border-slate-500" />

            <div className="flex-between">
                <div className="w-full">
                    <Skeleton className="mt-4 h-5 w-1/4" />
                    <Skeleton className="mt-4 h-10 w-full" />
                </div>

                <div className="w-full">
                    <Skeleton className="mt-4 h-5 w-1/4" />
                    <Skeleton className="mt-4 h-10 w-full" />
                </div>
            </div>

            <div className="flex-between">
                <div className="w-full">
                    <Skeleton className="mt-4 h-5 w-1/4" />
                    <Skeleton className="mt-4 h-10 w-full" />
                </div>

                <div className="w-full">
                    <Skeleton className="mt-4 h-5 w-1/4" />
                    <Skeleton className="mt-4 h-10 w-full" />
                </div>
            </div>
        </CardForm>
    );
};

ProfileLoading.displayName = "ProfileLoading";
