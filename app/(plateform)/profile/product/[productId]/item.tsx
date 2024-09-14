import { useTranslations } from "next-intl";
import { Label } from "@/ui/label";

type ProfileItemType = {
    label: string;
    value: string | number;
};

export const ProfileItem = ({ label, value }: ProfileItemType) => {
    const text = useTranslations();

    const textStyle = "bg-primary-100 text-xl font-bold px-4 py-3 mt-2 rounded-md shadow dark:text-black";
    const labelStyle = "text-xl font-bold text-primary";

    return (
        <div className="my-4 w-full">
            <Label className={labelStyle}>{text(label)}</Label>
            <p className={textStyle}>{value}</p>
        </div>
    );
};
