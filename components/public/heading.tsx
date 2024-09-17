"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { animate } from "@/constants";

type HeadingProps = {
    title: string;
};

export const Heading = ({ title }: HeadingProps) => {
    const text = useTranslations();
    return (
        <motion.h1 {...animate("opacity")} className="text-2xl font-bold capitalize text-primary">
            {text(title)}
        </motion.h1>
    );
};
