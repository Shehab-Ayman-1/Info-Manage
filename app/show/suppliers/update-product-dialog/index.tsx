import { DataTable } from "@/components/table";
import { DialogForm } from "@/components/ui/dialog";
import { SelectBox } from "@/components/ui/select";
import { useLists } from "@/hooks/data/useLists";
import { useModel } from "@/hooks/useModel";
import { Button } from "@/ui/button";
import { columns } from "./table-columns";
import { DeleteDialog } from "./delete-dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUpdate } from "@/hooks/api/useUpdate";

export type ProductType = {
    _id: string;
    name: string;
};

type RequestType = {
    supplierId: string;
    productsIds: string[];
};

export const UpdateProductsDialog = () => {
    const { mutate, isPending } = useUpdate<RequestType>("/api/show/suppliers/products", ["suppliers"]);

    const { type, data, onClose } = useModel();
    const { products: productsLists, onReset } = useLists();

    const [supplierId, setSupplierId] = useState("");
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        if (!data?.products?.length || !data?.supplierId) return;
        setProducts(data.products);
        setSupplierId(data.supplierId);
    }, [data]);

    useEffect(() => {
        (async () => productsLists.fetcher?.())();
    }, [productsLists]);

    if (type !== "update-products-model") return;

    const onChange = (productId: string) => {
        const { _id, name } = productsLists.data.find((product) => product._id === productId)!;

        setProducts((products) => {
            const isExist = products.some((product) => product._id === productId);
            if (!isExist) return products.concat({ _id, name });

            toast.info("This Product Is Already Exist");
            return products;
        });
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        const productsIds = products.map((product) => product._id);
        mutate(
            { supplierId, productsIds },
            {
                onSuccess: () => {
                    onClose();
                    onReset(["suppliers"]);
                },
            },
        );
    };

    return (
        <DialogForm heading="Update Products" description="Any Changes Can't Be Undo After Saving">
            <form onSubmit={onSubmit}>
                <SelectBox label="Product" name="productId" groups={productsLists.groups} onChange={onChange} required={false} />
                {!!products.length && <DataTable columns={columns} data={products} smallSize />}

                <Button type="submit" className="w-full" disabled={isPending}>
                    Update
                </Button>
            </form>

            <DeleteDialog setProducts={setProducts} />
        </DialogForm>
    );
};

UpdateProductsDialog.displayName = "UpdateProductsDialog";
