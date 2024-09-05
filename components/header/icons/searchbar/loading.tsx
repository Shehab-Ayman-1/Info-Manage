import { Loader2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

type LoadingType = {
    isLoading: boolean;
};

export const Loading = ({ isLoading }: LoadingType) => {
    const text = useTranslations();
    if (!isLoading) return;

    return (
        <h3 className="flex-start">
            <Loader2Icon className="size-6 animate-spin" />
            {text("loading")}
        </h3>
    );
};

Loading.displayName = "Loading";
