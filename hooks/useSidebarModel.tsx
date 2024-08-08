import { create } from "zustand";

type SidebarModel = {
    open: boolean;
    onOpen: (open: boolean) => void;
};

export const useSidebarModel = create<SidebarModel>((set) => ({
    open: false,
    onOpen: (open: boolean) => set({ open }),
}));
