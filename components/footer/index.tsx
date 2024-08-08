import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "lucide-react";

type FooterProps = {};

export const Footer = ({}: FooterProps) => {
    return (
        <footer className="flex-between bg-gradient p-4 print:hidden">
            <h3 className="text-lg font-bold text-slate-500 dark:text-slate-300">Create With ❤️ By Shehab Ayman</h3>
            <div className="flex-start">
                <FacebookIcon className="!text-slate-500 hover:!text-slate-800 dark:!text-slate-300 dark:hover:!text-slate-500" />
                <InstagramIcon className="!text-slate-500 hover:!text-slate-800 dark:!text-slate-300 dark:hover:!text-slate-500" />
                <TwitterIcon className="!text-slate-500 hover:!text-slate-800 dark:!text-slate-300 dark:hover:!text-slate-500" />
                <YoutubeIcon className="!text-slate-500 hover:!text-slate-800 dark:!text-slate-300 dark:hover:!text-slate-500" />
            </div>
        </footer>
    );
};

Footer.displayName = "Footer";
