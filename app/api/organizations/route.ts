import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { configsSchema } from "./schema";
import { json } from "@/utils/response";

export const PUT = async (req: NextRequest) => {
    try {
        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const body = await req.json();
        const { organizationId, ...publicMetadata } = configsSchema.parse(body);

        await clerkClient.organizations.updateOrganizationMetadata(organizationId, { publicMetadata });
        return json("The Organization Configs Was Successfully Updated.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
