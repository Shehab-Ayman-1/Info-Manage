"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useKey } from "react-use";
import { toast } from "sonner";
import { z } from "zod";

import { useCreate } from "@/hooks/api/useCreate";
import { useLists } from "@/hooks/data/useLists";
import { useModel } from "@/hooks/useModel";
import { columns } from "./table-columns";

import { CreateClientType, createSchema } from "@/app/api/clients/statements/new/schema";
import { SubmitButton } from "@/components/public/submit-btn";
import { ComboBox } from "@/components/ui/comboBox";
import { DialogForm } from "@/components/ui/dialog";
import { Tooltip } from "@/components/ui/tooltip";
import { DataTable } from "@/components/table";
import { DeleteDialog } from "./delete-dialog";
import { methods } from "@/constants";
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
    const { formState, watch, reset, setValue, clearErrors, handleSubmit } = useForm<StatementType>({
        resolver: zodResolver(schema),
    });
    const { mutate, isPending } = useCreate<RequestType>("/api/clients/statements/new", ["client-invoices"]);
    const [product, setProduct] = useState<ProductType[0]>(defaultProduct);
    const { clients, products: productLists } = useLists();
    const { type, onClose } = useModel();
    const { errors } = formState;

    const choosenProducts = watch("products");
    const clientId = watch("clientId");
    const text = useTranslations();
    const mount = useRef(false);

    useEffect(() => {
        if (mount.current) return;
        (async () => clients.fetcher())();
        mount.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!clients.data.length || clientId) return;
        const client = clients.data.find((client) => client.name === "unknown");

        if (!client) return onClose();
        setValue("clientId", client._id);

        setValue("discount", 0);
        setValue("process", "all");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clients, clientId]);

    useEffect(() => {
        if (!choosenProducts?.length) return;
        const paid = choosenProducts.reduce((prev, cur) => prev + cur.count * cur.soldPrice, 0);

        setValue("paid", paid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [choosenProducts]);

    useEffect(() => {
        if (!product.productId) return;
        const prod = productLists.data.find((prod) => prod._id === product.productId);

        setProduct((product) => ({ ...product, soldPrice: prod?.soldPrice || 0 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product.productId]);

    useKey((event) => event.ctrlKey && event.key === "Enter", handleInsertProduct);
    if (type !== "quick-client-statement-model") return;

    function handleInsertProduct() {
        const prod = choosenProducts?.find((prod) => prod.productId === product.productId);
        if (prod) return toast.info("This Product Is Already Inserted.");

        if (!product.count || !product.soldPrice) return toast.info("Product Count & Sold Price Are Required.");
        if (product.count < 0 || product.soldPrice < 0) return toast.info("Product Count & Sold Price Must Be Greater Then 0");

        const productList = productLists.data.find((prod) => prod._id === product.productId);
        if (!productList) return toast.info("Something Went Wrong.");

        const { name, company, purchasePrice } = productList;
        const newProduct = {
            productId: product.productId,
            company: company.name,
            name,
            purchasePrice,
            count: product.count,
            soldPrice: product.soldPrice,
            total: product.count * product.soldPrice,
        };

        const newProducts = choosenProducts?.concat(newProduct);

        setValue("products", newProducts || [newProduct]);
        setProduct(() => defaultProduct);
    }

    const onSubmit: SubmitHandler<StatementType> = (values) => {
        const filterProducts = values.products.map(({ company, name, ...product }) => product);
        const onSuccess = () => {
            setProduct(defaultProduct);
            reset();
            onClose();
        };

        mutate({ ...values, products: filterProducts }, { onSuccess });
    };

    return (
        <DialogForm
            heading={text("dialogs.quick-client-statement.heading")}
            description={text("dialogs.quick-client-statement.description")}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl overflow-x-auto">
                <ComboBox
                    label="choose-method"
                    name="method"
                    useTranslate={{ label: "public", name: "public", trigger: "public", item: "public" }}
                    error={errors?.method}
                    items={methods}
                    setValue={setValue}
                    clearErrors={clearErrors}
                />

                <ComboBox
                    label="choose-product"
                    name="productId"
                    useTranslate={{ label: "public", name: "public", trigger: "public", customeTrigger: true }}
                    groups={productLists.groups}
                    loading={productLists.isLoading}
                    onChange={(value) => setProduct((product) => ({ ...product, productId: value }))}
                />

                <div className="flex-between">
                    <Input
                        type="number"
                        label="count"
                        useTranslate={{ label: "public" }}
                        value={product.count || ""}
                        onChange={(event) => setProduct((product) => ({ ...product, count: +event.target.value }))}
                    />
                    <Input
                        type="number"
                        label="sold-price"
                        useTranslate={{ label: "public" }}
                        value={product.soldPrice || ""}
                        onChange={(event) => setProduct((product) => ({ ...product, soldPrice: +event.target.value }))}
                    />

                    <Tooltip content="CTRL + ENTER">
                        <Button type="button" variant="outline" className="mx-auto flex sm:py-12" onClick={handleInsertProduct}>
                            {text("buttons.insert")}
                        </Button>
                    </Tooltip>
                </div>

                {errors.products && <p className="text-center text-xs text-rose-500">No Products Was Selected.</p>}
                {!!choosenProducts?.length && <DataTable columns={columns} data={choosenProducts} totalFor="total" smallSize />}

                <SubmitButton text="submit" isPending={isPending} />
                <DeleteDialog products={choosenProducts} setValue={setValue} />
            </form>
        </DialogForm>
    );
};

QuickClientStatement.displayName = "QuickClientStatement";
