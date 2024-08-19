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
        href: "/show/market",
        userRole: "org:member",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: ArchiveRestoreIcon,
        title: "Store Products",
        href: "/show/store",
        userRole: "org:member",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: BookKeyIcon,
        title: "Total Cashes",
        href: "/show/cashes",
        userRole: "org:admin",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "Transactions",
        href: "/show/transactions",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: UsersIcon,
        title: "Clients",
        href: "/show/clients",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: UsersIcon,
        title: "Suppliers",
        href: "/show/suppliers",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "Client Bills",
        href: "/show/client-bills",
        userRole: "org:member",
        subscriptions: ["premium"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "Supplier Bills",
        href: "/show/supplier-debts",
        userRole: "org:member",
        subscriptions: ["premium"],
    },
];

export const statementLinks: NavLinkType[] = [
    {
        Icon: HandCoinsIcon,
        title: "Quick Client's Statement",
        href: "/statements/clients/quick-statement",
        userRole: "org:member",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: HandCoinsIcon,
        title: "Client's Statement",
        href: "/statements/clients",
        userRole: "org:member",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: UsersIcon,
        title: "Supplier's Statement",
        href: "/statements/suppliers",
        userRole: "org:admin",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "Transfer Products",
        href: "/statements/transfer",
        userRole: "org:member",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: RocketIcon,
        title: "Locker Withdrawal / Deposit",
        href: "/statements/locker",
        userRole: "org:admin",
        subscriptions: ["basic", "premium"],
    },
];

export const createLinks: NavLinkType[] = [
    {
        Icon: LayoutDashboardIcon,
        title: "Add Category",
        href: "/create/category",
        userRole: "org:admin",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: SchoolIcon,
        title: "Add Company",
        href: "/create/company",
        userRole: "org:admin",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: TargetIcon,
        title: "Add Product",
        href: "/create/product",
        userRole: "org:admin",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: UserIcon,
        title: "Add Supplier",
        href: "/create/supplier",
        userRole: "org:admin",
        subscriptions: ["basic", "premium"],
    },
    {
        Icon: UserCheck,
        title: "Add Client",
        href: "/create/client",
        userRole: "org:admin",
        subscriptions: ["basic", "premium"],
    },
];

export const statisticsLinks: NavLinkType[] = [
    {
        Icon: ReceiptTextIcon,
        title: "Today Purchases Receipt",
        href: "/statistics/today-purchases",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "Today Sales Receipt",
        href: "/statistics/today-sales",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "Product Movement",
        href: "/statistics/movement",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: BadgeDollarSignIcon,
        title: "Sales Statistics",
        href: "/statistics/sales",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: BadgeDollarSignIcon,
        title: "Profits Statistics",
        href: "/statistics/profits",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: ShoppingCartIcon,
        title: "Insuffients Products",
        href: "/statistics/insufficients",
        userRole: "org:member",
        subscriptions: ["premium"],
    },
    {
        Icon: ThumbsDownIcon,
        title: "Least Selling",
        href: "/statistics/least-selling",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: CalendarPlusIcon,
        title: "Best Selling Of The (Month)",
        href: "/statistics/best-selling-of-month",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
    {
        Icon: CalendarPlus2Icon,
        title: "Best Selling Of The (Year)",
        href: "/statistics/best-selling-of-year",
        userRole: "org:admin",
        subscriptions: ["premium"],
    },
];
