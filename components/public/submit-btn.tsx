import { Button } from "@/ui/button";

type SubmitButtonProps = {
    text: string;
    isPending: boolean;
};

export const SubmitButton = ({ text, isPending }: SubmitButtonProps) => {
    return (
        <Button type="submit" className="my-4 w-full text-base font-bold sm:text-lg" size="lg" disabled={isPending}>
            {text}
        </Button>
    );
};

SubmitButton.displayName = "SubmitButton";
