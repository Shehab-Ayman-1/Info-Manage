import { ArchiveRestoreIcon, ArrowRightLeftIcon, BadgeDollarSignIcon, CalendarPlus2Icon } from "lucide-react";
import { CalendarPlusIcon, HandCoinsIcon, ReceiptTextIcon, RocketIcon, SchoolIcon } from "lucide-react";
import { ShoppingCartIcon, TargetIcon, ThumbsDownIcon, UserCheck, UserIcon } from "lucide-react";
import { BookKeyIcon, StoreIcon, UsersIcon } from "lucide-react";
import { LayoutDashboardIcon } from "lucide-react";

export type NavLinkType = {
    Icon: any;
    title: string;
    href: string;
    role: "org:admin" | "org:member";
};

export const showLinks: NavLinkType[] = [
    {
        Icon: StoreIcon,
        title: "Market Products",
        href: "/show/market",
        role: "org:member",
    },
    {
        Icon: ArchiveRestoreIcon,
        title: "Store Products",
        href: "/show/store",
        role: "org:member",
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "Transactions",
        href: "/show/transactions",
        role: "org:admin",
    },
    {
        Icon: UsersIcon,
        title: "Clients",
        href: "/show/clients",
        role: "org:admin",
    },
    {
        Icon: UsersIcon,
        title: "Suppliers",
        href: "/show/suppliers",
        role: "org:admin",
    },
    {
        Icon: BookKeyIcon,
        title: "Total Cashes",
        href: "/show/cashes",
        role: "org:admin",
    },
    {
        Icon: ReceiptTextIcon,
        title: "Client's Bills",
        href: "/show/clients-bills",
        role: "org:member",
    },
    {
        Icon: ReceiptTextIcon,
        title: "Supplier's Bills",
        href: "/show/suppliers-debts",
        role: "org:member",
    },
];

export const statementLinks: NavLinkType[] = [
    {
        Icon: HandCoinsIcon,
        title: "Clients Statement",
        href: "/statements/clients",
        role: "org:member",
    },
    {
        Icon: UsersIcon,
        title: "Suppliers Statement",
        href: "/statements/suppliers",
        role: "org:admin",
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "Transfer Products",
        href: "/statements/transfer",
        role: "org:admin",
    },
    {
        Icon: RocketIcon,
        title: "Locker Withdrawal / Deposit",
        href: "/statements/locker",
        role: "org:admin",
    },
];

export const createLinks: NavLinkType[] = [
    {
        Icon: LayoutDashboardIcon,
        title: "Add Category",
        href: "/create/category",
        role: "org:admin",
    },
    {
        Icon: SchoolIcon,
        title: "Add Company",
        href: "/create/company",
        role: "org:admin",
    },
    {
        Icon: TargetIcon,
        title: "Add Product",
        href: "/create/product",
        role: "org:admin",
    },
    {
        Icon: UserIcon,
        title: "Add Supplier",
        href: "/create/supplier",
        role: "org:admin",
    },
    {
        Icon: UserCheck,
        title: "Add Client",
        href: "/create/client",
        role: "org:admin",
    },
];

export const statisticsLinks: NavLinkType[] = [
    {
        Icon: ReceiptTextIcon,
        title: "Today Purchases Receipt",
        href: "/statistics/today-purchases",
        role: "org:admin",
    },
    {
        Icon: ReceiptTextIcon,
        title: "Today Sales Receipt",
        href: "/statistics/today-sales",
        role: "org:admin",
    },
    {
        Icon: ArrowRightLeftIcon,
        title: "Product Movement",
        href: "/statistics/movement",
        role: "org:admin",
    },
    {
        Icon: BadgeDollarSignIcon,
        title: "Sales Statistics",
        href: "/statistics/sales",
        role: "org:admin",
    },
    {
        Icon: BadgeDollarSignIcon,
        title: "Profits Statistics",
        href: "/statistics/profits",
        role: "org:admin",
    },
    {
        Icon: ShoppingCartIcon,
        title: "Insuffients Products",
        href: "/statistics/insufficients",
        role: "org:admin",
    },
    {
        Icon: ThumbsDownIcon,
        title: "Least Selling",
        href: "/statistics/least-selling",
        role: "org:admin",
    },
    {
        Icon: CalendarPlusIcon,
        title: "Best Selling Of The (Month)",
        href: "/statistics/best-selling-of-month",
        role: "org:admin",
    },
    {
        Icon: CalendarPlus2Icon,
        title: "Best Selling Of The (Year)",
        href: "/statistics/best-selling-of-year",
        role: "org:admin",
    },
];
