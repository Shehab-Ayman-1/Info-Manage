import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export default getRequestConfig(async () => {
    const cookieLocale = cookies().get("NEXT_LOCALE")?.value;

    const locale = cookieLocale || "en";

    const dir = path.join("i18n", "messages", locale);
    const files = fs.readdirSync(dir);

    const messages = await files.reduce(async (acc, file) => {
        const fileContents = (await import(`@/i18n/messages/${locale}/${file}`)).default;
        const previousValues = await acc;
        return { ...previousValues, ...fileContents };
    }, {});

    return {
        locale,
        messages,
    };
});
