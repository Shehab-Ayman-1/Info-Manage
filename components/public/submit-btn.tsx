import { Button } from "@/ui/button";
import { cn } from "@/utils/shadcn";
import Image from "next/image";

type SubmitButtonProps = {
    text: string;
    isPending: boolean;
    className?: string;
};

export const SubmitButton = ({ text, isPending, className }: SubmitButtonProps) => {
    return (
        <Button
            size="lg"
            type="submit"
            className={cn(
                "group relative my-4 w-full overflow-hidden text-base font-bold sm:text-lg",
                isPending && "pointer-events-none",
                className,
            )}
        >
            {!isPending && text}

            {isPending && (
                <div className="">
                    <Image
                        src="/images/box.png"
                        alt="box"
                        width={20}
                        height={20}
                        className="animate-box absolute -bottom-8 left-[30%] transition-all"
                    />
                    <Image
                        src="/images/truck.png"
                        alt="truck"
                        width={50}
                        height={10}
                        className="animate-truck absolute -right-16 transition-all"
                    />
                </div>
            )}
        </Button>
    );
};

SubmitButton.displayName = "SubmitButton";
