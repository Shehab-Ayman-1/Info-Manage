import { ArchiveRestoreIcon, ArrowRightLeftIcon, BadgeDollarSignIcon, CalendarPlus2Icon } from "lucide-react";
import { CalendarPlusIcon, HandCoinsIcon, ReceiptTextIcon, RocketIcon, SchoolIcon } from "lucide-react";
import { ShoppingCartIcon, TargetIcon, ThumbsDownIcon, UserCheck, UserIcon } from "lucide-react";
import { BookKeyIcon, StoreIcon, UsersIcon } from "lucide-react";
import { LayoutDashboardIcon } from "lucide-react";

export type Subscription = "basic" | "premium";

export type NavLinkType = {
    Icon: any;
    title: string;
    href: string;
    userRole: "org:admin" | "org:member";
    subscriptions: Subscription[];
};

export const showLinks: NavLinkType[] = [
    {
        Icon: StoreIcon,
        title: "Market Products",
        href: "/plateform/show/market",
        userRole: "org:member",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: ArchiveRestoreIcon,
        title: "Store Products",
        href: "/plateform/show/store",
        userRole: "org:member",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: BookKeyIcon,
        title: "Total Cashes",
        href: "/plateform/show/cashes",
        userRole: "org:admin",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "Transactions",
        href: "/plateform/show/transactions",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: UsersIcon,
        title: "Clients",
        href: "/plateform/show/clients",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: UsersIcon,
        title: "Suppliers",
        href: "/plateform/show/suppliers",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "Client Bills",
        href: "/plateform/show/client-bills",
        userRole: "org:member",
        subscriptions: ["premium"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "Supplier Bills",
        href: "/plateform/show/supplier-debts",
        userRole: "org:member",
        subscriptions: ["premium"],
    },
];

export const statementLinks: NavLinkType[] = [
    {
        Icon: HandCoinsIcon,
        title: "Client's Statement",
        href: "/plateform/statements/clients",
        userRole: "org:member",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: UsersIcon,
        title: "Supplier's Statement",
        href: "/plateform/statements/suppliers",
        userRole: "org:admin",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "Transfer Products",
        href: "/plateform/statements/transfer",
        userRole: "org:member",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: RocketIcon,
        title: "Locker Withdrawal / Deposit",
        href: "/plateform/statements/locker",
        userRole: "org:admin",
        subscriptions: ["basic", "premium"],
    },
];

export const createLinks: NavLinkType[] = [
    {
        Icon: LayoutDashboardIcon,
        title: "Add Category",
        href: "/plateform/create/category",
        userRole: "org:admin",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: SchoolIcon,
        title: "Add Company",
        href: "/plateform/create/company",
        userRole: "org:admin",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: TargetIcon,
        title: "Add Product",
        href: "/plateform/create/product",
        userRole: "org:admin",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: UserIcon,
        title: "Add Supplier",
        href: "/plateform/create/supplier",
        userRole: "org:admin",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: UserCheck,
        title: "Add Client",
        href: "/plateform/create/client",
        userRole: "org:admin",
        subscriptions: ["basic", "premium"],
    },
];

export const statisticsLinks: NavLinkType[] = [
    {
        Icon: ReceiptTextIcon,
        title: "Today Purchases Receipt",
        href: "/plateform/statistics/today-purchases",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "Today Sales Receipt",
        href: "/plateform/statistics/today-sales",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "Product Movement",
        href: "/plateform/statistics/movement",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: BadgeDollarSignIcon,
        title: "Sales Statistics",
        href: "/plateform/statistics/sales",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: BadgeDollarSignIcon,
        title: "Profits Statistics",
        href: "/plateform/statistics/profits",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: ShoppingCartIcon,
        title: "Insuffients Products",
        href: "/plateform/statistics/insufficients",
        userRole: "org:member",
        subscriptions: ["premium"],
    },
    {
        Icon: ThumbsDownIcon,
        title: "Least Selling",
        href: "/plateform/statistics/least-selling",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: CalendarPlusIcon,
        title: "Best Selling Of The (Month)",
        href: "/plateform/statistics/best-selling-of-month",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: CalendarPlus2Icon,
        title: "Best Selling Of The (Year)",
        href: "/plateform/statistics/best-selling-of-year",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
];
