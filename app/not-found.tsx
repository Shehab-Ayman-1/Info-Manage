import { redirect } from "next/navigation";

type PageNotFoundProps = {};

export const PageNotFound = ({}: PageNotFoundProps) => {
    return redirect("/");
};

PageNotFound.displayName = "PageNotFound";
