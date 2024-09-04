import { getLocale } from "next-intl/server";
import { Locale, translations } from "@/constants";

export const getTranslations = async (parentKey: string) => {
    const locale = (await getLocale()) as Locale;
    const [folder, page, request] = parentKey.split(".");

    const text = (key: string) => {
        const translationKey = key === "wrong" ? key : `${parentKey}.${key}`;
        // @ts-ignore
        return key === "wrong" ? translations[locale][key] : translations[locale][folder][page][request][key] || translationKey;
    };

    return text;
};
