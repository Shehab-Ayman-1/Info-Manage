import { create } from "zustand";

type Model = {
    open: boolean;
    type?: string;
    data?: any;
    onOpen: (type?: any, data?: any) => void;
    onClose: () => void;
};

export const useModel = create<Model>((set) => ({
    open: false,
    type: "",
    data: {},
    onOpen: (type?: string, data?: any) => set({ open: true, data, type: type || "" }),
    onClose: () => set({ open: false, type: "", data: {} }),
}));
