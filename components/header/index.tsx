import { NavIcons } from "./navIcons";
import { Logo } from "./logo";

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
    return (
        <header className="bg-gradient z-10 w-full p-4 shadow-md">
            <div className="flex-between m-auto w-full max-w-screen-xl">
                <Logo />
                <NavIcons />
            </div>
        </header>
    );
};
Header.displayName = "Header";
