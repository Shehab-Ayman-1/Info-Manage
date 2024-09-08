import { Skeleton } from "@/ui/skeleton";

type ProfileLoadingProps = {};

export const ProfileLoading = ({}: ProfileLoadingProps) => {
    return (
        <section className="">
            <div className="text-center">
                <div className="flex-between mb-4">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-10 w-64" />
                </div>
                <Skeleton className="m-auto h-16 w-48" />
            </div>

            <div className="mt-2">
                <Skeleton className="my-4 h-10" />
                <Skeleton className="my-4 h-10" />
                <Skeleton className="my-4 h-10" />
                <Skeleton className="my-4 h-10" />
                <Skeleton className="my-4 h-10" />
            </div>

            <div className="flex-around flex-wrap md:flex-nowrap">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-48" />
            </div>

            <div className="flex-around mt-4 flex-wrap md:flex-nowrap">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-48" />
            </div>

            <div className="flex-center mt-10 w-full flex-col">
                <Skeleton className="h-32 w-32 rounded-full" />
            </div>
        </section>
    );
};

ProfileLoading.displayName = "ProfileLoading";
