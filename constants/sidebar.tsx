import { CalendarPlusIcon, HandCoinsIcon, ReceiptTextIcon, RocketIcon, SchoolIcon } from "lucide-react";
import { ArrowRightLeftIcon, BadgeDollarSignIcon, CalendarPlus2Icon } from "lucide-react";
import { ShoppingCartIcon, TargetIcon, ThumbsDownIcon, UserCheck } from "lucide-react";
import { BookKeyIcon, StoreIcon, UsersIcon } from "lucide-react";
import { LayoutDashboardIcon } from "lucide-react";

export type AdditionalSubscription = "unsubscribe" | "premium" | "enterprise";
export type Subscription = "unsubscribe" | "basic";
export type UserRole = "org:admin" | "org:member";

export type NavLinkType = {
    Icon: any;
    title: string;
    href: string;
    userRole: UserRole;
    subscriptions: Subscription[];
    additionalSubscriptions: AdditionalSubscription[];
};

export const productLists: NavLinkType[] = [
    {
        Icon: StoreIcon,
        title: "market-and-store",
        href: "/products",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "transfer",
        href: "/products/transfer",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: ShoppingCartIcon,
        title: "insufficient",
        href: "/products/insufficients",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["enterprise"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "today-purchases",
        href: "/products/today-purchases",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "today-sales",
        href: "/products/today-sales",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: LayoutDashboardIcon,
        title: "add-category",
        href: "/products/add-category",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: SchoolIcon,
        title: "add-company",
        href: "/products/add-company",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: TargetIcon,
        title: "add-product",
        href: "/products/add-product",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
];

export const clientLists: NavLinkType[] = [
    {
        Icon: UsersIcon,
        title: "clients-list",
        href: "/clients",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "show-invoices",
        href: "/clients/invoices",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: HandCoinsIcon,
        title: "new-statement",
        href: "/clients/statements/new",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: HandCoinsIcon,
        title: "restore-statement",
        href: "/clients/statements/restore",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: UserCheck,
        title: "add-client",
        href: "/clients/add-client",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
];

export const supplierLists: NavLinkType[] = [
    {
        Icon: UsersIcon,
        title: "suppliers-list",
        href: "/suppliers",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "show-invoices",
        href: "/suppliers/invoices",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: HandCoinsIcon,
        title: "new-statement",
        href: "/suppliers/statements/new",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: HandCoinsIcon,
        title: "restore-statement",
        href: "/suppliers/statements/restore",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: UserCheck,
        title: "add-supplier",
        href: "/suppliers/add-supplier",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
];

export const financeLists: NavLinkType[] = [
    {
        Icon: BookKeyIcon,
        title: "cashes",
        href: "/finances",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "transactions",
        href: "/finances/transactions",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: RocketIcon,
        title: "locker-withdraw-deposit",
        href: "/finances/locker",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
];

export const statisticsLinks: NavLinkType[] = [
    {
        Icon: BadgeDollarSignIcon,
        title: "sales",
        href: "/statistics/sales",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["enterprise"],
    },
    {
        Icon: BadgeDollarSignIcon,
        title: "profits",
        href: "/statistics/profits",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["enterprise"],
    },
    {
        Icon: ThumbsDownIcon,
        title: "least-selling",
        href: "/statistics/least-selling",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["enterprise"],
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "product-movement",
        href: "/statistics/movement",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["enterprise"],
    },
    {
        Icon: CalendarPlusIcon,
        title: "best-selling-of-the-month",
        href: "/statistics/best-selling-of-month",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["enterprise"],
    },
    {
        Icon: CalendarPlus2Icon,
        title: "best-selling-of-the-year",
        href: "/statistics/best-selling-of-year",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["enterprise"],
    },
];
