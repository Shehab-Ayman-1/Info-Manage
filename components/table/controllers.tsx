"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/ui/button";
import { animate } from "@/constants";

type ControllersProps = {
    previousPage: () => void;
    nextPage: () => void;
    getCanPreviousPage: () => boolean;
    getCanNextPage: () => boolean;
};

export const Controllers = ({ previousPage, nextPage, getCanPreviousPage, getCanNextPage }: ControllersProps) => {
    const text = useTranslations("public");
    const prev = getCanPreviousPage();
    const next = getCanNextPage();

    if (!prev && !next) return;

    return (
        <motion.div {...animate("opacity")} className="flex-end w-full">
            <Button
                type="button"
                variant="outline"
                className="text-xs text-primary sm:text-sm"
                onClick={previousPage}
                disabled={!prev}
            >
                {text("previous")}
            </Button>
            <Button
                type="button"
                variant="outline"
                className="text-xs text-primary sm:text-sm"
                onClick={nextPage}
                disabled={!next}
            >
                {text("next")}
            </Button>
        </motion.div>
    );
};
