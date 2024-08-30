"use client";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { ComboBox } from "@/components/ui/comboBox";
import { languages } from "@/constants";

export const Languages = () => {
    const router = useRouter();
    const locale = useLocale();

    const onChange = (lang: string) => {
        document.cookie = `NEXT_LOCALE=${lang};`;
        router.refresh();
    };

    return (
        <div className="mt-6">
            <h1 className="text-xl font-bold text-primary sm:text-2xl">Languages</h1>
            <ComboBox label="Languages" name="language" items={languages} onChange={onChange} defaultValue={locale} />
        </div>
    );
};

Languages.displayName = "Languages";
