import { useLocale } from "next-intl";

type PaginationCountProps = {
    totalPaginationCount: number;
    currentPaginationCount: number;
};

export const PaginationCount = ({ totalPaginationCount, currentPaginationCount }: PaginationCountProps) => {
    const locale = useLocale();
    if (totalPaginationCount <= 1) return;

    return (
        <h3 className="whitespace-nowrap text-primary">
            {locale === "en" ? "Page" : "الصفحة"} {currentPaginationCount} {locale === "en" ? "of" : "من"} {totalPaginationCount}
        </h3>
    );
};

PaginationCount.displayName = "PaginationCount";
