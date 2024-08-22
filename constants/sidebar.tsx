import { ArchiveRestoreIcon, ArrowRightLeftIcon, BadgeDollarSignIcon, CalendarPlus2Icon } from "lucide-react";
import { CalendarPlusIcon, HandCoinsIcon, ReceiptTextIcon, RocketIcon, SchoolIcon } from "lucide-react";
import { ShoppingCartIcon, TargetIcon, ThumbsDownIcon, UserCheck, UserIcon } from "lucide-react";
import { BookKeyIcon, StoreIcon, UsersIcon } from "lucide-react";
import { LayoutDashboardIcon } from "lucide-react";

export type Subscription = "unsubscribe" | "basic";
export type UserRole = "org:admin" | "org:member";
export type AdditionalSubscription = "unsubscribe" | "premium" | "enterprise";

export type NavLinkType = {
    Icon: any;
    title: string;
    href: string;
    userRole: UserRole;
    subscriptions: Subscription[];
    additionalSubscriptions: AdditionalSubscription[];
};

export const showLinks: NavLinkType[] = [
    {
        Icon: StoreIcon,
        title: "Market Products",
        href: "/show/market",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["unsubscribe"],
    },
    {
        Icon: ArchiveRestoreIcon,
        title: "Store Products",
        href: "/show/store",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["unsubscribe"],
    },
    {
        Icon: BookKeyIcon,
        title: "Total Cashes",
        href: "/show/cashes",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["unsubscribe"],
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "Transactions",
        href: "/show/transactions",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: UsersIcon,
        title: "Clients",
        href: "/show/clients",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: UsersIcon,
        title: "Suppliers",
        href: "/show/suppliers",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "Client Bills",
        href: "/show/client-bills",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["unsubscribe"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "Supplier Bills",
        href: "/show/supplier-debts",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["unsubscribe"],
    },
];

export const statementLinks: NavLinkType[] = [
    {
        Icon: HandCoinsIcon,
        title: "Quick Client's Statement",
        href: "/statements/clients/quick-statement",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: HandCoinsIcon,
        title: "Client's Statement",
        href: "/statements/clients",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["unsubscribe"],
    },
    {
        Icon: UsersIcon,
        title: "Supplier's Statement",
        href: "/statements/suppliers",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["unsubscribe"],
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "Transfer Products",
        href: "/statements/transfer",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["unsubscribe"],
    },
    {
        Icon: RocketIcon,
        title: "Locker Withdrawal / Deposit",
        href: "/statements/locker",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["unsubscribe"],
    },
];

export const createLinks: NavLinkType[] = [
    {
        Icon: LayoutDashboardIcon,
        title: "Add Category",
        href: "/create/category",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["unsubscribe"],
    },
    {
        Icon: SchoolIcon,
        title: "Add Company",
        href: "/create/company",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["unsubscribe"],
    },
    {
        Icon: TargetIcon,
        title: "Add Product",
        href: "/create/product",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["unsubscribe"],
    },
    {
        Icon: UserIcon,
        title: "Add Supplier",
        href: "/create/supplier",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["unsubscribe"],
    },
    {
        Icon: UserCheck,
        title: "Add Client",
        href: "/create/client",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["unsubscribe"],
    },
];

export const statisticsLinks: NavLinkType[] = [
    {
        Icon: ReceiptTextIcon,
        title: "Today Purchases Receipt",
        href: "/statistics/today-purchases",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "Today Sales Receipt",
        href: "/statistics/today-sales",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "Product Movement",
        href: "/statistics/movement",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["enterprise"],
    },
    {
        Icon: BadgeDollarSignIcon,
        title: "Sales Statistics",
        href: "/statistics/sales",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["enterprise"],
    },
    {
        Icon: BadgeDollarSignIcon,
        title: "Profits Statistics",
        href: "/statistics/profits",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["enterprise"],
    },
    {
        Icon: ShoppingCartIcon,
        title: "Insuffients Products",
        href: "/statistics/insufficients",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["enterprise"],
    },
    {
        Icon: ThumbsDownIcon,
        title: "Least Selling",
        href: "/statistics/least-selling",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["enterprise"],
    },
    {
        Icon: CalendarPlusIcon,
        title: "Best Selling Of The (Month)",
        href: "/statistics/best-selling-of-month",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["enterprise"],
    },
    {
        Icon: CalendarPlus2Icon,
        title: "Best Selling Of The (Year)",
        href: "/statistics/best-selling-of-year",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["enterprise"],
    },
];
