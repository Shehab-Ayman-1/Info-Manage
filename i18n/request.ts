import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
    const cookie = cookies().get("NEXT_LOCALE")?.value;
    const locale = cookie || "ar";

    const files = ["header", "overview", "pages", "public", "buttons", "dialogs", "subscriptions", "table", "badges", "footer"];
    const messages = files.reduce(async (accumelator, file) => {
        const fileContent = (await import(`@/i18n/${locale}/${file}.json`)).default;
        const previousValues = await accumelator;
        return { ...previousValues, ...fileContent };
    }, {});

    return { locale, messages };
});
