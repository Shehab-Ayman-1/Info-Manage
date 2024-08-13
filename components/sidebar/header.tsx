"use client";
import { SheetDescription, SheetHeader, SheetTitle } from "@/ui/sheet";

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
    return (
        <SheetHeader>
            <SheetTitle className="text-center text-2xl font-extrabold text-primary">Sidebar</SheetTitle>
            <SheetDescription className="text-center text-xs sm:text-base">Navigate Between Application Pages</SheetDescription>
        </SheetHeader>
    );
};

Header.displayName = "Header";
