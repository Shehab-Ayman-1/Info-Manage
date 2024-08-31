"use client";
import { SheetDescription, SheetHeader, SheetTitle } from "@/ui/sheet";
import { useTranslations } from "next-intl";

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
    const text = useTranslations("sidebar");

    return (
        <SheetHeader>
            <SheetTitle className="text-center text-2xl font-extrabold text-primary">{text("heading")}</SheetTitle>
            <SheetDescription className="text-center text-xs sm:text-base">{text("description")}</SheetDescription>
        </SheetHeader>
    );
};

Header.displayName = "Header";
