"use client";
import { useTranslations } from "next-intl";

type HeadingProps = {
    title: string;
};

export const Heading = ({ title }: HeadingProps) => {
    const text = useTranslations();
    return <h1 className="text-2xl font-bold capitalize text-primary">{text(title)}</h1>;
};
