"use client";
import { AlertTriangleIcon, Loader2Icon } from "lucide-react";
import { ClerkLoaded, ClerkLoading, useOrganization } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

import {
    productLists,
    clientLists,
    supplierLists,
    financeLists,
    statisticsLinks,
    NavLinkType,
    AdditionalSubscription,
} from "@/constants";
import { useSubscription } from "@/hooks/useSubscription";
import { Alert } from "@/ui/alert";

type SubscribeProvider = {
    children: React.ReactNode;
};

const checkSubscription = (pathname: string, metadata: AdditionalSubscription[]) => {
    const checkSub = (link: NavLinkType) =>
        link.href === pathname && metadata.find((sub) => link.additionalSubscriptions.includes(sub));

    const productExist = productLists.some(checkSub);
    const clientExist = clientLists.some(checkSub);
    const supplierExist = supplierLists.some(checkSub);
    const financeExist = financeLists.some(checkSub);
    const statisticsExist = statisticsLinks.some(checkSub);

    return productExist || clientExist || supplierExist || financeExist || statisticsExist;
};

export const SubscribeProvider = ({ children }: SubscribeProvider) => {
    const { organization } = useOrganization();
    const { isSubscribe } = useSubscription();

    const pathname = usePathname();
    const router = useRouter();

    const metadata = organization?.publicMetadata?.additionalSubscriptions as ("premium" | "enterprise")[];
    const isAdditionalSubscriptionAllowed = checkSubscription(pathname, metadata);

    if (!isAdditionalSubscriptionAllowed) return router.push("/");
    if (isSubscribe) return children;

    return (
        <div className="fixed top-1/2 w-full -translate-y-1/2">
            <ClerkLoading>
                <div className="mx-auto w-fit">
                    <Loader2Icon className="!size-20 animate-spin" />
                </div>
            </ClerkLoading>

            <ClerkLoaded>
                <Alert variant="warning" className="mx-auto w-fit text-xl">
                    <AlertTriangleIcon className="mt-1" />
                    <span>
                        Your Organization Subscription Was Suspended, Please Contact Out Customer Services For More Details.
                    </span>
                </Alert>
            </ClerkLoaded>
        </div>
    );
};

SubscribeProvider.displayName = "SubscribeProvider";
