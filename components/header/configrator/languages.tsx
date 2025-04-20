"use client";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { ComboBox } from "@/components/ui/comboBox";
import { languages } from "@/constants";

export const Languages = () => {
    const router = useRouter();
    const locale = useLocale();

    const onChange = (lang: string) => {
        const cookie = document.cookie.split("; ").find((cookie) => cookie.startsWith("NEXT_LOCALE"));
        if (!cookie) {
            document.cookie = `NEXT_LOCALE=${lang}; path=/;`;
        } else {
            document.cookie = `NEXT_LOCALE=${lang}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
            document.cookie = `NEXT_LOCALE=${lang}; path=/;`;
        }

        router.refresh();
    };

    return (
        <div className="mt-6">
            <h1 className="text-xl font-bold text-primary sm:text-2xl">Languages</h1>
            <ComboBox
                label="language"
                name="language"
                useTranslate={{ label: "public", name: "public", justPlaceholder: true }}
                items={languages}
                onChange={onChange}
                defaultValue={locale}
            />
        </div>
    );
};

Languages.displayName = "Languages";
