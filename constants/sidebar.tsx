import { CalendarPlusIcon, HandCoinsIcon, ReceiptTextIcon, RocketIcon, SchoolIcon } from "lucide-react";
import { ShoppingCartIcon, TargetIcon, ThumbsDownIcon, UserCheck, UserIcon } from "lucide-react";
import { ArrowRightLeftIcon, BadgeDollarSignIcon, CalendarPlus2Icon } from "lucide-react";
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

// New Tabs
export const productLists: NavLinkType[] = [
    {
        Icon: StoreIcon,
        title: "Market & Store Products",
        href: "/show/products",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium", "enterprise"],
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "Transfer Products",
        href: "/statements/transfer",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium", "enterprise"],
    },
    {
        Icon: ShoppingCartIcon,
        title: "Insuffient Products",
        href: "/statistics/insufficients",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["enterprise"],
    },
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
        Icon: LayoutDashboardIcon,
        title: "Add New Category",
        href: "/create/category",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium", "enterprise"],
    },
    {
        Icon: SchoolIcon,
        title: "Add New Company",
        href: "/create/company",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium", "enterprise"],
    },
    {
        Icon: TargetIcon,
        title: "Add New Product",
        href: "/create/product",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium", "enterprise"],
    },
];

export const clientLists: NavLinkType[] = [
    {
        Icon: UsersIcon,
        title: "Show Clients",
        href: "/show/clients",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "Show Bills",
        href: "/show/client-bills",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium", "enterprise"],
    },
    {
        Icon: UserCheck,
        title: "Add New Client",
        href: "/create/client",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium", "enterprise"],
    },
    {
        Icon: HandCoinsIcon,
        title: "Add New Statement",
        href: "/statements/clients",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium", "enterprise"],
    },
];

export const supplierLists: NavLinkType[] = [
    {
        Icon: UsersIcon,
        title: "Show Suppliers",
        href: "/show/suppliers",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "Show Bills",
        href: "/show/supplier-debts",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium", "enterprise"],
    },
    {
        Icon: UserIcon,
        title: "Add New Supplier",
        href: "/create/supplier",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium", "enterprise"],
    },
    {
        Icon: UsersIcon,
        title: "Add New Statement",
        href: "/statements/suppliers",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium", "enterprise"],
    },
];

export const financeLists: NavLinkType[] = [
    {
        Icon: BookKeyIcon,
        title: "Total Cashes",
        href: "/show/cashes",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium", "enterprise"],
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
        Icon: RocketIcon,
        title: "Locker Withdrawal / Deposit",
        href: "/statements/locker",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium", "enterprise"],
    },
];

export const statisticsLinks: NavLinkType[] = [
    {
        Icon: BadgeDollarSignIcon,
        title: "Sales",
        href: "/statistics/sales",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["enterprise"],
    },
    {
        Icon: BadgeDollarSignIcon,
        title: "Profits",
        href: "/statistics/profits",
        userRole: "org:admin",
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
        Icon: ArrowRightLeftIcon,
        title: "Product Movement",
        href: "/statistics/movement",
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
