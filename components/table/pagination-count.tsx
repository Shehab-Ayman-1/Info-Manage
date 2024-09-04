"use client";
import { useTranslations } from "next-intl";

type PaginationCountProps = {
    totalPaginationCount: number;
    currentPaginationCount: number;
};

export const PaginationCount = ({ totalPaginationCount, currentPaginationCount }: PaginationCountProps) => {
    const text = useTranslations("table");
    if (totalPaginationCount <= 1) return;

    return (
        <h3 className="whitespace-nowrap text-primary">
            {text("table-pagination", { currentPaginationCount, totalPaginationCount })}
        </h3>
    );
};

PaginationCount.displayName = "PaginationCount";
