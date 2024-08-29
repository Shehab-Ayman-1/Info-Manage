export type Item = {
    _id: string;
    name: string;
};

export type List = {
    _id: string;
    value: string;
    title: string;
};

export type Group = {
    _id: string;
    label: string;
    list: List[];
};

export type Categories = {
    data: Item[];
    lists: List[];
    isLoading: false | true;
    fetcher: () => Promise<void>;
};

export type Companies = {
    data: (Item & {
        category: Item;
    })[];
    groups: Group[];
    isLoading: false | true;
    fetcher: () => Promise<void>;
};

export type Products = {
    data: (Item & {
        purchasePrice: number;
        soldPrice: number;
        company: Item;
    })[];
    groups: Group[];
    isLoading: false | true;
    fetcher: () => Promise<void>;
};

export type Suppliers = {
    data: (Item & {
        products: Products["data"];
    })[];
    lists: List[];
    isLoading: false | true;
    fetcher: () => Promise<void>;
};

export type Clients = {
    data: Item[];
    lists: List[];
    isLoading: false | true;
    fetcher: () => Promise<void>;
};

export type Bills = {
    data: (Item & {
        barcode: number;
        products: (Item & {
            productId: string;
            purchasePrice: number;
            soldPrice: number;
            count: number;
        })[];
    })[];
    lists: List[];
    isLoading: false | true;
    fetcher: () => Promise<void>;
};

export type ProductsBySupplier = {
    data: Products["data"];
    groups: Group[];
    isLoading: false | true;
    fetcher: (supplierId: string) => Promise<void>;
};

export type ProductsByBill = {
    data: (Item & {
        productId: string;
        purchasePrice: number;
        soldPrice: number;
        count: number;
    })[];
    lists: List[];
    isLoading: false | true;
    fetcher: (billBarcode: number) => Promise<void>;
};

export type ListsType = {
    categories: Categories;
    companies: Companies;
    products: Products;
    clients: Clients;
    suppliers: Suppliers;
    bills: Bills;
    productsBySupplier: ProductsBySupplier;
    productsByBill: ProductsByBill;
    onReset: (keys: ("categories" | "companies" | "products" | "suppliers" | "clients" | "bills")[]) => void;
};

export type SetType = (
    partial: ListsType | Partial<ListsType> | ((state: ListsType) => ListsType | Partial<ListsType>),
    replace?: boolean | undefined,
) => void;

export type GetType = () => ListsType;

export type MakeGroupData = Item & {
    list: Item;
};
