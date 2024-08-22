"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/ui/dialog";
import { useModel } from "@/hooks/useModel";
import { cn } from "@/utils/shadcn";

type DialogFormProps = {
    heading: string;
    description: string;
    className?: string;
    children: React.ReactNode;
};

export const DialogForm = ({ heading, description, className, children }: DialogFormProps) => {
    const { open, onClose } = useModel();

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-gradient max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className={cn("text-2xl font-bold text-primary", className)}>{heading}</DialogTitle>
                    <DialogDescription className="text-slate-500">{description}</DialogDescription>
                </DialogHeader>

                {children}
            </DialogContent>
        </Dialog>
    );
};

DialogForm.displayName = "DialogForm";
