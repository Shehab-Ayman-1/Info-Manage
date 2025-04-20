"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { SearchIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useKey } from "react-use";

import { Popover, PopoverTrigger, PopoverContent } from "@/ui/popover";
import { Tooltip } from "@/components/ui/tooltip";
import { useLists } from "@/hooks/data/useLists";
import { animate } from "@/constants";
import { Input } from "@/ui/input";

import { ListItems } from "./listItems";
import { Loading } from "./loading";

type SearchbarProps = {};

export const Searchbar = ({}: SearchbarProps) => {
    const [searchText, setSearchText] = useState("");
    const [open, setOpen] = useState(false);

    const { products } = useLists();
    const mount = useRef(false);

    useEffect(() => {
        if (mount.current) return;
        (async () => products.fetcher())();
        mount.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredProducts = useMemo(() => {
        return products.data.filter((product) => product.company.name.includes(searchText) || product.name.includes(searchText));
    }, [searchText, products.data]);

    const onOpen = () => setOpen(!open);
    useKey((event) => event.ctrlKey && event.key.toLowerCase() === "q", onOpen);

    return (
        <Popover open={open} onOpenChange={onOpen}>
            <PopoverTrigger>
                <Tooltip content="CTRL + Q">
                    <motion.span {...animate("opacity")} transition={{ duration: 0.5 }}>
                        <SearchIcon className="hover:text-primary" />
                    </motion.span>
                </Tooltip>
            </PopoverTrigger>

            <PopoverContent align="end" className="w-auto rounded-xl border-none shadow-xl sm:w-[600px]">
                <Input
                    type="search"
                    placeholder="search"
                    useTranslate={{ placeholder: "public" }}
                    onChange={(event) => setSearchText(event.target.value)}
                />

                <div className="max-h-96 overflow-y-auto">
                    <Loading isLoading={products.isLoading} />
                    <ListItems data={filteredProducts || products.data} setOpen={setOpen} />
                </div>
            </PopoverContent>
        </Popover>
    );
};

Searchbar.displayName = "Searchbar";
