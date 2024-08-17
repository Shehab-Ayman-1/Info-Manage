"use client";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { useLists } from "@/hooks/data/useLists";
import { Products } from "@/hooks/data/types";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

type SearchbarProps = {};

export const Searchbar = ({}: SearchbarProps) => {
    const [open, setOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState<Products["data"]>([]);
    const { products } = useLists();
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
        router.push(`/plateform/profile/${productId}`);
        router.refresh();
        setOpen(!open);
    };

    return (
        <Popover open={open} onOpenChange={() => setOpen(!open)}>
            <PopoverTrigger>
                <SearchIcon className="hover:text-slate-500" />
            </PopoverTrigger>

            <PopoverContent className="w-auto rounded-xl border-none shadow-xl" align="end">
                <Input placeholder="Search " className="w-40 sm:w-96" onChange={onChange} />

                <div className="max-h-96 overflow-y-auto">
                    {(filteredProducts.length ? filteredProducts : products.data).map((product) => (
                        <Button
                            key={product._id}
                            variant="ghost"
                            className="flex-between w-full"
                            onClick={() => onClick(product._id)}
                        >
                            <p className="px-4 py-6 text-xl">{product.name}</p>
                            <p className="px-4 py-6 text-xl">{product.company.name}</p>
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};

Searchbar.displayName = "Searchbar";
