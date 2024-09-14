"use client";
import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "lucide-react";
import { useKey } from "react-use";

import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Tooltip } from "@/components/ui/tooltip";
import { useLists } from "@/hooks/data/useLists";
import { Products } from "@/hooks/data/types";
import { ListItems } from "./listItems";
import { Input } from "@/ui/input";
import { Loading } from "./loading";

type SearchbarProps = {};

export const Searchbar = ({}: SearchbarProps) => {
    const [filteredProducts, setFilteredProducts] = useState<Products["data"]>();
    const [open, setOpen] = useState(false);
    const { products } = useLists();

    const mount = useRef(false);

    useEffect(() => {
        if (mount.current) return;
        (async () => products.fetcher())();
        mount.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (event: any) => {
        const filtered = products.data.filter(
            (product) => product.company.name.includes(event.target.value) || product.name.includes(event.target.value),
        );
        setFilteredProducts(filtered);
    };

    const onOpen = () => setOpen(!open);
    useKey((event) => event.ctrlKey && event.key.toLowerCase() === "q", onOpen);

    return (
        <Popover open={open} onOpenChange={onOpen}>
            <PopoverTrigger>
                <Tooltip content="CTRL + Q">
                    <SearchIcon className="hover:text-primary" />
                </Tooltip>
            </PopoverTrigger>

            <PopoverContent align="end" className="w-auto rounded-xl border-none shadow-xl sm:w-[600px]">
                <Input type="search" placeholder="search" useTranslate={{ placeholder: "public" }} onChange={onChange} />

                <div className="max-h-96 overflow-y-auto">
                    <Loading isLoading={products.isLoading} />
                    <ListItems data={filteredProducts || products.data} setOpen={setOpen} />
                </div>
            </PopoverContent>
        </Popover>
    );
};

Searchbar.displayName = "Searchbar";
