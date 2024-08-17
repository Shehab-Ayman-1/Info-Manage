export type SupplierType = {
    _id: string;
    supplier: string;
    phone: string;
    pending: number;
    products: { _id: string; name: string }[];
};
