import { TooltipProvider, Tooltip as ShTooltip, TooltipTrigger, TooltipContent } from "@/ui/tooltip";

type TooltipType = {
    children: React.ReactNode;
    content: string;
};

export const Tooltip = ({ content, children }: TooltipType) => {
    return (
        <TooltipProvider>
            <ShTooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent>{content}</TooltipContent>
            </ShTooltip>
        </TooltipProvider>
    );
};

Tooltip.displayName = "Tooltip";
