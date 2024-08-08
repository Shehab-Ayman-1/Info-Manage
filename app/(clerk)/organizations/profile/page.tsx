import { OrganizationProfile } from "@clerk/nextjs";

type OrganizationProfileeProps = {};

const OrganizationProfilee = ({}: OrganizationProfileeProps) => {
    return <OrganizationProfile routing="virtual" />;
};

OrganizationProfilee.displayName = "OrganizationProfilee";
export default OrganizationProfilee;
