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
        href: "/products",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "Transfer Products",
        href: "/products/transfer",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: ShoppingCartIcon,
        title: "Insuffient Products",
        href: "/products/insufficients",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: ["enterprise"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "Today Purchases Receipt",
        href: "/products/today-purchases",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "Today Sales Receipt",
        href: "/products/today-sales",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: LayoutDashboardIcon,
        title: "Add New Category",
        href: "/products/add-category",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: SchoolIcon,
        title: "Add New Company",
        href: "/products/add-company",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: TargetIcon,
        title: "Add New Product",
        href: "/products/add-product",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
];

export const clientLists: NavLinkType[] = [
    {
        Icon: UsersIcon,
        title: "Show Clients",
        href: "/clients",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "Show Bills",
        href: "/clients/bills",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: UserCheck,
        title: "Add New Client",
        href: "/clients/add-client",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: HandCoinsIcon,
        title: "Add New Statement",
        href: "/clients/statement",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
];

export const supplierLists: NavLinkType[] = [
    {
        Icon: UsersIcon,
        title: "Show Suppliers",
        href: "/suppliers",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: ReceiptTextIcon,
        title: "Show Bills",
        href: "/suppliers/bills",
        userRole: "org:member",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: UserIcon,
        title: "Add New Supplier",
        href: "/suppliers/add-supplier",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: UsersIcon,
        title: "Add New Statement",
        href: "/suppliers/statement",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
];

export const financeLists: NavLinkType[] = [
    {
        Icon: BookKeyIcon,
        title: "Total Cashes",
        href: "/finances",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "Transactions",
        href: "/finances/transactions",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: ["premium"],
    },
    {
        Icon: RocketIcon,
        title: "Locker Withdrawal / Deposit",
        href: "/finances/locker",
        userRole: "org:admin",
        subscriptions: ["basic"],
        additionalSubscriptions: [],
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
