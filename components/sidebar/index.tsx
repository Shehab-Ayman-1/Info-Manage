"use client";
import { ChevronLeftIcon } from "lucide-react";

import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/ui/sheet";
import { useSidebarModel } from "@/hooks/useSidebarModel";
import { SheetLinks } from "./sheet-links";

type SidebarProps = {};

export const Sidebar = ({}: SidebarProps) => {
    const { open, onOpen } = useSidebarModel();

    return (
        <Sheet open={open} onOpenChange={onOpen}>
            <SheetTrigger
                onClick={() => onOpen(true)}
                className="fixed right-0 top-1/2 -translate-y-1/2 rounded-l-3xl bg-primary px-px py-16 transition-all hover:px-2 xl:hidden"
            >
                <ChevronLeftIcon className="text-white hover:text-white dark:!text-black" />
            </SheetTrigger>

            <SheetContent className="bg-gradient overflow-y-auto">
                <SheetTitle className="text-center text-2xl font-bold text-primary">Sidebar</SheetTitle>
                <SheetDescription className="text-center">Easy To Navigate Between Pages</SheetDescription>
                <SheetLinks />
            </SheetContent>
        </Sheet>
    );
};
Sidebar.displayName = "Sidebar";
