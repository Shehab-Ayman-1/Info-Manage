import { Dispatch, SetStateAction } from "react";
import { XIcon } from "lucide-react";

type ShowChoosenProductsProps = {
    products: any[];
    setProducts: Dispatch<SetStateAction<any[]>>;
};

export const ShowChoosenProducts = ({ products, setProducts }: ShowChoosenProductsProps) => {
    const onCancel = (current: string) => {
        setProducts((products: any) => products.filter((product: any) => product.productId !== current));
        setProducts((products: any) => products.filter((product: any) => product.name !== current));
    };

    return (
        <div className="">
            {products.map((product, index) => (
                <p key={index} className="flex-start mb-2">
                    <XIcon
                        className="text-rose-500 hover:text-rose-300 dark:text-rose-500"
                        onClick={() => onCancel(product?.productId || product?.name!)}
                    />
                    {product?.productName || product?.name}
                </p>
            ))}
        </div>
    );
};

ShowChoosenProducts.displayName = "ShowChoosenProducts";
