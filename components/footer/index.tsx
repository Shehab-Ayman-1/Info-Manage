import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "lucide-react";

type FooterProps = {};

export const Footer = ({}: FooterProps) => {
    return (
        <footer className="flex-between bg-gradient p-4 print:hidden">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-300 sm:text-lg">Create With ❤️ By Shehab Ayman</h3>
            <div className="flex-start">
                <FacebookIcon className="size-4 !text-slate-500 hover:!text-slate-800 dark:!text-slate-300 dark:hover:!text-slate-500 sm:size-6" />
                <InstagramIcon className="size-4 !text-slate-500 hover:!text-slate-800 dark:!text-slate-300 dark:hover:!text-slate-500 sm:size-6" />
                <TwitterIcon className="size-4 !text-slate-500 hover:!text-slate-800 dark:!text-slate-300 dark:hover:!text-slate-500 sm:size-6" />
                <YoutubeIcon className="size-4 !text-slate-500 hover:!text-slate-800 dark:!text-slate-300 dark:hover:!text-slate-500 sm:size-6" />
            </div>
        </footer>
    );
};

Footer.displayName = "Footer";
