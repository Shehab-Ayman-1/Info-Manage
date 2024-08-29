"use client";
import type { Companies, Products, Clients, Suppliers, Categories, Bills } from "./types";
import type { ListsType, Group, MakeGroupData } from "./types";
import { create } from "zustand";

const makeGroup = (data: MakeGroupData[]) => {
    const groups = data?.reduce((prev, cur) => {
        // Category Index
        const groupIndex = prev.findIndex((group) => group._id === cur._id);

        // Add new Category With Its Company
        if (groupIndex === -1) {
            const item = { _id: cur.list._id, value: cur.list._id, title: cur.list.name };
            return prev.concat({ _id: cur._id, label: cur.name, list: [item] });
        }

        // Is The Company Already Exists?
        const isListExist = prev[groupIndex].list.some((item) => item._id === cur.list._id);
        if (isListExist) return prev;

        // Add New Company To This Category
        prev[groupIndex].list.push({ _id: cur.list._id, value: cur.list._id, title: cur.list.name });
        return prev;
    }, [] as Group[]);
    return groups;
};

export const useLists = create<ListsType>((set, get) => ({
    categories: {
        data: [],
        lists: [],
        isLoading: true,
        fetcher: async function () {
            const { categories } = get();
            if (categories.data.length) return;

            const response = await fetch("/api/lists/categories");
            const data: Categories["data"] = await response.json();

            if (!response.ok) return console.log(data);
            const lists = data.map((item) => ({ _id: item._id, value: item._id, title: item.name }));

            set({ categories: { data, lists, isLoading: false, fetcher: this.fetcher } });
        },
    },

    companies: {
        data: [],
        groups: [],
        isLoading: true,
        fetcher: async function () {
            const { companies } = get();
            if (companies.data.length) return;

            const response = await fetch("/api/lists/companies");
            const data: Companies["data"] = await response.json();

            if (!response.ok) return console.log(data);
            const companiesList = data
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(({ category, ...company }) => ({ ...category, list: company }));

            const groups = makeGroup(companiesList);
            set({ companies: { data, groups, isLoading: false, fetcher: this.fetcher } });
        },
    },

    products: {
        data: [],
        groups: [],
        isLoading: true,
        fetcher: async function () {
            const { products } = get();
            if (products.data.length) return;

            const response = await fetch("/api/lists/products");
            const data: Products["data"] = await response.json();

            if (!response.ok) return console.log(data);
            const productsList = data
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(({ company, ...product }) => ({ ...company, list: product }));

            const groups = makeGroup(productsList);
            set({ products: { data, groups, isLoading: false, fetcher: this.fetcher } });
        },
    },

    clients: {
        data: [],
        lists: [],
        isLoading: true,
        fetcher: async function () {
            const { clients } = get();
            if (clients.data.length) return;

            const response = await fetch("/api/lists/clients");
            const data: Clients["data"] = await response.json();

            if (!response.ok) return console.log(data);
            const lists = data.map(({ _id, name }) => ({ _id, value: _id, title: name }));

            set({ clients: { data, lists, isLoading: false, fetcher: this.fetcher } });
        },
    },

    suppliers: {
        data: [],
        lists: [],
        isLoading: true,
        fetcher: async function () {
            const { suppliers } = get();
            if (suppliers.data.length) return;

            const response = await fetch("/api/lists/suppliers");
            const data: Suppliers["data"] = await response.json();

            if (!response.ok) return console.log(data);
            const lists = data
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(({ _id, name }) => ({ _id, value: _id, title: name }));

            set({ suppliers: { data, lists, isLoading: false, fetcher: this.fetcher } });
        },
    },

    bills: {
        data: [],
        lists: [],
        isLoading: true,
        fetcher: async function () {
            const { bills } = get();
            if (bills.data.length) return;

            const response = await fetch("/api/lists/bills");
            const data: Bills["data"] = await response.json();

            if (!response.ok) return console.log(data);
            const lists = data.map(({ _id, name }) => ({ _id, value: _id, title: name }));

            set({ bills: { data, lists, isLoading: false, fetcher: this.fetcher } });
        },
    },

    productsBySupplier: {
        data: [],
        groups: [],
        isLoading: true,
        fetcher: async function (supplierId) {
            const { suppliers } = get();
            if (!suppliers.data.length) await suppliers.fetcher?.();

            const supplier = suppliers?.data.find((supplier) => supplier._id === supplierId);
            if (!supplier) return;

            const productLists = supplier.products
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(({ company, ...product }) => ({ ...company, list: product }));

            const groups = makeGroup(productLists);
            set({ productsBySupplier: { data: supplier.products, groups, isLoading: false, fetcher: this.fetcher } });
        },
    },

    productsByBill: {
        data: [],
        lists: [],
        isLoading: true,
        fetcher: async function (billBarcode) {
            const { bills } = get();
            if (!bills.data.length) await bills.fetcher?.();

            console.log(bills);

            const bill = bills.data.find((bill) => bill.barcode === billBarcode);
            if (!bill) return;

            const lists = bill.products.map(({ name }) => ({ _id: `${billBarcode}`, value: `${billBarcode}`, title: name }));
            set({ productsByBill: { data: bill.products, lists, isLoading: false, fetcher: this.fetcher } });
        },
    },

    onReset: async function (keys) {
        const { categories, companies, products, clients, suppliers } = get();

        if (keys.includes("categories")) {
            set({ categories: { data: [], lists: [], isLoading: true, fetcher: categories.fetcher } });
            await categories.fetcher();
        }
        if (keys.includes("companies")) {
            set({ companies: { data: [], groups: [], isLoading: true, fetcher: companies.fetcher } });
            await companies.fetcher();
        }
        if (keys.includes("products")) {
            set({ products: { data: [], groups: [], isLoading: true, fetcher: products.fetcher } });
            await products.fetcher();
        }
        if (keys.includes("clients")) {
            set({ clients: { data: [], lists: [], isLoading: true, fetcher: clients.fetcher } });
            await clients.fetcher();
        }
        if (keys.includes("suppliers")) {
            set({ suppliers: { data: [], lists: [], isLoading: true, fetcher: suppliers.fetcher } });
            await suppliers.fetcher();
        }
    },
}));
