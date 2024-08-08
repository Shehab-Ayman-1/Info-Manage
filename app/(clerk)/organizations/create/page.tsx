import { CreateOrganization } from "@clerk/nextjs";

type CreateNewOrganizationProps = {};

const CreateNewOrganization = ({}: CreateNewOrganizationProps) => {
    return (
        <CreateOrganization
            routing="virtual"
            appearance={{
                elements: {
                    cardBox: { boxShadow: "none" },
                },
            }}
        />
    );
};

CreateNewOrganization.displayName = "CreateNewOrganization";
export default CreateNewOrganization;
