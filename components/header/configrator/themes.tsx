import { Dispatch, SetStateAction } from "react";

import { SheetClose } from "@/ui/sheet";
import { cn } from "@/utils/shadcn";

type ThemesProps = {
    setTheme: Dispatch<SetStateAction<string>>;
};

const themes1 = [
    { name: "deep-orange", color: "bg-gradient-to-br from-black/80 to-[#ff5722]" },
    { name: "orange", color: "bg-gradient-to-br from-black/80 to-[#ff9800]" },
    { name: "pink", color: "bg-gradient-to-br from-black/80 to-[#e91e63]" },
    { name: "cyan", color: "bg-gradient-to-br from-black/70 to-[#00bcd4]" },
    { name: "teal", color: "bg-gradient-to-br from-black/70 to-[#009688]" },
];

const themes2 = [
    { name: "deep-purple", color: "bg-gradient-to-br from-black/80 to-[#673ab7]" },
    { name: "indigo", color: "bg-gradient-to-br from-black/70 to-[#3f51b5]" },
    { name: "blue", color: "bg-gradient-to-br from-black/70 to-[#2196f3]" },
    { name: "brown", color: "bg-gradient-to-br from-black/80 to-[#795548]" },
    { name: "blue-gray", color: "bg-gradient-to-br from-black/70 to-[#607d8b]" },
];

export const Themes = ({ setTheme }: ThemesProps) => {
    return (
        <div className="my-6">
            <h1 className="text-xl font-bold text-primary sm:text-2xl">Theme Color</h1>
            <div className="flex-between my-8 flex-wrap !gap-6 px-4">
                {themes1.map(({ name, color }) => (
                    <SheetClose key={name} asChild>
                        <p
                            className={cn(
                                "size-5 cursor-pointer rounded-full border-2 border-black/50 hover:opacity-80 dark:border-white/20 sm:size-6",

                                color,
                            )}
                            onClick={() => setTheme(name)}
                        />
                    </SheetClose>
                ))}
            </div>

            <div className="flex-between my-8 flex-wrap !gap-6 px-4">
                {themes2.map(({ name, color }) => (
                    <SheetClose key={name} asChild>
                        <p
                            className={cn(
                                "size-5 cursor-pointer rounded-full border-2 border-black/50 hover:opacity-80 dark:border-white/20 sm:size-6",
                                color,
                            )}
                            onClick={() => setTheme(name)}
                        />
                    </SheetClose>
                ))}
            </div>
        </div>
    );
};

Themes.displayName = "Themes";
