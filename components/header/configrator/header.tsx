import { SheetDescription, SheetHeader, SheetTitle } from "@/ui/sheet";

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
    return (
        <SheetHeader>
            <SheetTitle className="text-center text-2xl font-extrabold text-primary">Configrator</SheetTitle>
            <SheetDescription className="text-center text-xs sm:text-base">
                Choose Your Prefer Theme, Mode And Language.
            </SheetDescription>
        </SheetHeader>
    );
};

Header.displayName = "Header";
