"use client";
import { AlertTriangleIcon, Loader2Icon } from "lucide-react";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

import { useSubscription } from "@/hooks/useSubscription";
import { Alert } from "@/ui/alert";

type SubscribeProvider = {
    children: React.ReactNode;
};

export const SubscribeProvider = ({ children }: SubscribeProvider) => {
    const { isSubscribe } = useSubscription();
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
