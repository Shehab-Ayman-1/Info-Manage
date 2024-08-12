import { redirect } from "next/navigation";

type PageNotFoundProps = {};

const PageNotFound = ({}: PageNotFoundProps) => {
    return redirect("/");
};

PageNotFound.displayName = "PageNotFound";
export default PageNotFound;
