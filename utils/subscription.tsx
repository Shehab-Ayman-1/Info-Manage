"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSubscription } from "@/hooks/useSubscription";
import { useUser } from "@clerk/nextjs";

type IsSubscriptionProps = {};

export const IsSubscription = ({}: IsSubscriptionProps) => {
    const { isSubscribe } = useSubscription();
    const { user } = useUser();

    const pathname = usePathname();
    const router = useRouter();

    const isMe = user?.primaryEmailAddress?.emailAddress === process.env.NEXT_PUBLIC_EMAIL;
    if (pathname !== "/" && !isSubscribe && !isMe) {
        router.push("/");
        return null;
    }
};

IsSubscription.displayName = "IsSubscription";
