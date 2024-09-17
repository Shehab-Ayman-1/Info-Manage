"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { animate } from "@/constants";

type PaginationCountProps = {
    totalPaginationCount: number;
    currentPaginationCount: number;
};

export const PaginationCount = ({ totalPaginationCount, currentPaginationCount }: PaginationCountProps) => {
    const text = useTranslations("table");
    if (totalPaginationCount <= 1) return;

    return (
        <motion.h3 {...animate("translate")} className="whitespace-nowrap text-primary">
            {text("table-pagination", { currentPaginationCount, totalPaginationCount })}
        </motion.h3>
    );
};

PaginationCount.displayName = "PaginationCount";
