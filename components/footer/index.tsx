"use client";
import { FacebookIcon, InstagramIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const Footer = () => {
    const text = useTranslations();

    return (
        <footer className="flex-between bg-gradient p-4">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-300 sm:text-lg">{text("footer")}</h3>
            <div className="flex-start">
                <Link target="_blank" href="https://www.facebook.com/EngShehabAyman">
                    <FacebookIcon className="size-4 !text-slate-500 hover:!text-slate-800 dark:!text-slate-300 dark:hover:!text-slate-500 sm:size-6" />
                </Link>
                <Link target="_blank" href="https://www.instagram.com/shehab_ayman2023">
                    <InstagramIcon className="size-4 !text-slate-500 hover:!text-slate-800 dark:!text-slate-300 dark:hover:!text-slate-500 sm:size-6" />
                </Link>
            </div>
        </footer>
    );
};

Footer.displayName = "Footer";
