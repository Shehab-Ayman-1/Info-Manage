import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { Clients } from "@/server/models";
import { json } from "@/utils/response";
import { editSchema } from "./schema";

export const GET = async () => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const clients = await Clients.aggregate([
            {
                $match: {
                    orgId,
                    name: { $ne: "unknown" },
                },
            },
            {
                $project: {
                    _id: 1,
                    discounts: 1,
                    level: 1,
                    bronzeTo: 1,
                    silverTo: 1,
                    client: "$name",
                    purchases: "$purchasesSalary",
                    pending: "$pendingCosts",
                },
            },
        ]);

        return json(clients);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};

export const PUT = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId, orgSlug } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const organization = await clerkClient().organizations.getOrganization({ organizationId: orgId, slug: orgSlug });

        const body = await req.json();
        const { clientId, name, bronzeTo, silverTo } = editSchema.parse(body);

        const updated = await Clients.updateOne({ orgId, _id: clientId }, { name, bronzeTo, silverTo });
        if (!updated.modifiedCount) return json("Something Went Wrong.", 400);

        await Clients.updateLevel({ orgId, clientId });

        const refreshAfter = +(organization?.publicMetadata?.refreshClientsPurchases as string)?.split(" ")[0];
        await Clients.updateLastRefreshDate({ orgId, clientId, refreshAfter });

        return json("The Client Was Successfully Updated.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const { clientId } = await req.json();
        if (!clientId) return json("Something Went Wrong", 400);

        const deleted = await Clients.deleteOne({ orgId, _id: clientId });
        if (!deleted.deletedCount) return json("Something Went Wrong", 400);

        return json("The Client Was Successfully Deleted.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
