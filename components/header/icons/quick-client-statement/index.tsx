"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useCreate } from "@/hooks/api/useCreate";
import { useLists } from "@/hooks/data/useLists";
import { useModel } from "@/hooks/useModel";
import { columns } from "./table-columns";

import { CreateClientType, createSchema } from "@/app/api/clients/statement/schema";
import { SubmitButton } from "@/components/public/submit-btn";
import { ComboBox } from "@/components/ui/comboBox";
import { DialogForm } from "@/components/ui/dialog";
import { DataTable } from "@/components/table";
import { DeleteDialog } from "./delete-dialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

const productSchema = z.array(
    z.object({
        productId: z.string().min(1),
        company: z.string().min(1),
        name: z.string().min(1),
        count: z.number().int().positive(),
        total: z.number().positive(),
        soldPrice: z.number().positive(),
        purchasePrice: z.number().min(0),
    }),
);

const schema = createSchema.omit({ products: true }).setKey("products", productSchema);

export type StatementType = z.infer<typeof schema>;
type ProductType = z.infer<typeof productSchema>;
type RequestType = Omit<StatementType, "products"> & Pick<CreateClientType, "products">;

const defaultProduct = { productId: "", name: "", company: "", count: 0, purchasePrice: 0, soldPrice: 0, total: 0 };
export const QuickClientStatement = () => {
    const { formState, watch, reset, setValue, handleSubmit } = useForm<StatementType>({ resolver: zodResolver(schema) });
    const { mutate, isPending } = useCreate<RequestType>("/api/clients/statement", ["bills"]);
    const [product, setProduct] = useState<ProductType[0]>(defaultProduct);
    const { clients, products: productLists } = useLists();
    const { type, onClose } = useModel();

    const choosenProducts = watch("products");

    useEffect(() => {
        (async () => clients.fetcher())();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!clients.data.length) return;

        const client = clients.data.find((client) => client.name === "unknown");
        if (!client) return onClose();

        setValue("clientId", client._id);
        setValue("discount", 0);

        setValue("method", "cash");
        setValue("process", "all");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clients]);

    useEffect(() => {
        if (!choosenProducts?.length) return;
        const paid = choosenProducts.reduce((prev, cur) => prev + cur.count * cur.soldPrice, 0);

        setValue("paid", paid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [choosenProducts]);

    useEffect(() => {
        if (!product?.productId) return;
        const prod = productLists.data.find((prod) => prod._id === product.productId);

        setProduct((product) => ({ ...product, soldPrice: prod?.soldPrice || 0 }));
        console.log(product);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product?.productId]);

    if (type !== "quick-client-statement-model") return;

    const handleInsertProduct = () => {
        const prod = choosenProducts?.find((prod) => prod.productId === product.productId);

        if (prod) return toast.info("This Product Is Already Inserted.");
        if (!product.count || !product.soldPrice) return toast.info("Product Count And Sold Price Are Required.");

        const productList = productLists.data.find((prod) => prod._id === product.productId);
        if (!productList) return toast.info("Something Went Wrong.");

        const { name, company, purchasePrice, soldPrice } = productList;
        const newProduct = {
            productId: product.productId,
            company: company.name,
            name,
            soldPrice,
            purchasePrice,
            count: product.count,
            total: product.count * soldPrice,
        };
        const newProducts = choosenProducts?.concat(newProduct);

        setValue("products", newProducts || [newProduct]);
        setProduct((product) => ({ ...product, count: 0 }));
    };

    const onSubmit: SubmitHandler<StatementType> = (values) => {
        const filterProducts = values.products.map(({ company, name, ...product }) => product);
        mutate(
            { ...values, products: filterProducts },
            {
                onSuccess: () => {
                    setProduct(defaultProduct);
                    reset();
                    onClose();
                },
            },
        );
    };

    console.log(formState.errors);

    return (
        <DialogForm heading="Quick Client Statement" description="Create A New Client Statement With One Click">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl overflow-x-auto">
                <ComboBox
                    label="Product Name"
                    name="productId"
                    groups={productLists.groups}
                    loading={productLists.isLoading}
                    onChange={(value) => setProduct((product) => ({ ...product!, productId: value }))}
                />
                <div className="flex-between">
                    <Input
                        type="number"
                        name="count"
                        placeholder="Count"
                        value={product?.count}
                        onChange={(event) => setProduct((product) => ({ ...product!, count: +event.target.value }))}
                    />
                    <Input
                        type="number"
                        name="soldPrice"
                        placeholder="Sold Price"
                        value={product?.soldPrice}
                        onChange={(event) => setProduct((product) => ({ ...product!, soldPrice: +event.target.value }))}
                    />

                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="mx-auto flex py-12"
                        onClick={handleInsertProduct}
                    >
                        Insert
                    </Button>
                </div>

                <p className="text-center text-xs text-rose-500">{formState.errors.products && "No Products Was Selected."}</p>

                {!!choosenProducts?.length && (
                    <DataTable columns={columns} data={choosenProducts || []} smallSize totalFor="total" />
                )}
                <SubmitButton text="Submit" isPending={isPending} />

                <DeleteDialog products={choosenProducts} setValue={setValue} />
            </form>
        </DialogForm>
    );
};

QuickClientStatement.displayName = "QuickClientStatement";
