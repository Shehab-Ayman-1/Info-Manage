"use client";
import { ChevronLeftIcon } from "lucide-react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/ui/sheet";
import { useSidebarModel } from "@/hooks/useSidebarModel";
import { useModel } from "@/hooks/useModel";
import { SheetLinks } from "./sheet-links";
import { Button } from "@/ui/button";

type SidebarProps = {};

export const Sidebar = ({}: SidebarProps) => {
    const { open, onOpen } = useSidebarModel();
    const { onOpen: onOpenModel } = useModel();

    return (
        <Sheet open={open} onOpenChange={onOpen}>
            <SheetTrigger
                onClick={() => onOpen(true)}
                className="fixed right-0 top-1/2 -translate-y-1/2 rounded-l-3xl bg-primary px-px py-16 transition-all hover:px-2 print:hidden"
            >
                <ChevronLeftIcon className="text-white hover:text-white dark:!text-black" />
            </SheetTrigger>

            <SheetContent className="bg-gradient overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-center text-2xl font-extrabold text-primary">Sidebar</SheetTitle>
                    <SheetDescription className="text-center text-xs sm:text-base">
                        Navigate Between Application Pages
                    </SheetDescription>
                </SheetHeader>

                <SheetLinks />

                <div className="flex-between mt-4">
                    <Button
                        variant="outline"
                        className="h-auto w-full py-4 leading-7"
                        onClick={() => onOpenModel("backup-model")}
                    >
                        Back Up <br /> To Online
                    </Button>
                    <Button
                        variant="outline"
                        className="h-auto w-full py-4 leading-7"
                        onClick={() => onOpenModel("restore-model")}
                    >
                        Restore <br /> Last Backup
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};
Sidebar.displayName = "Sidebar";
