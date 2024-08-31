"use client";
import { Loader2Icon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { useLists } from "@/hooks/data/useLists";
import { Products } from "@/hooks/data/types";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

type SearchbarProps = {};

export const Searchbar = ({}: SearchbarProps) => {
    const [filteredProducts, setFilteredProducts] = useState<Products["data"]>();
    const [open, setOpen] = useState(false);
    const { products } = useLists();

    const text = useTranslations("public");
    const router = useRouter();

    useEffect(() => {
        (async () => await products.fetcher())();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (event: any) => {
        const filtered = products.data.filter((product) => {
            return product.name.includes(event.target.value) || product.company.name.includes(event.target.value);
        });
        setFilteredProducts(filtered);
    };

    const onClick = (productId: string) => {
        router.push(`/profile/product/${productId}`);
        router.refresh();
        setOpen(!open);
    };

    return (
        <Popover open={open} onOpenChange={() => setOpen(!open)}>
            <PopoverTrigger>
                <SearchIcon className="hover:text-slate-500" />
            </PopoverTrigger>

            <PopoverContent align="end" className="w-auto rounded-xl border-none shadow-xl sm:w-[600px]">
                <Input type="search" placeholder={text("search")} onChange={onChange} />

                <div className="max-h-96 overflow-y-auto">
                    {products.isLoading && (
                        <h3 className="flex-start">
                            <Loader2Icon className="size-6 animate-spin" />
                            {text("loading")}
                        </h3>
                    )}

                    {(filteredProducts ? filteredProducts : products.data).map((product) => (
                        <Button
                            key={product._id}
                            size="lg"
                            variant="ghost"
                            className="flex-between w-full"
                            onClick={() => onClick(product._id)}
                        >
                            <p className="text-xl">{product.name}</p>
                            <p className="text-xl">{product.company.name}</p>
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};

Searchbar.displayName = "Searchbar";
