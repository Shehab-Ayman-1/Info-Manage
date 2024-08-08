"use client";
import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";

type CardFormProps = {
    heading: string;
    submitText?: string;
    disabled?: boolean;
    onSubmit?: (event: any) => void;
    children: React.ReactNode;
};

export const CardForm = ({ heading, submitText, disabled, onSubmit, children }: CardFormProps) => {
    return (
        <Card className="bg-gradient m-auto mt-8 max-w-xl border-slate-400 shadow-lg dark:border-slate-600">
            <CardContent className="">
                <CardHeader className="bg-gradient-heavy m-auto -mt-8 mb-6 w-[80%] rounded-lg text-center text-2xl font-bold text-white !shadow-xl dark:text-black">
                    {heading}
                </CardHeader>

                {children}

                {submitText && (
                    <CardFooter className="mt-6 p-0 pt-4">
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full text-xl"
                            disabled={disabled}
                            onSubmit={onSubmit}
                        >
                            {submitText}
                        </Button>
                    </CardFooter>
                )}
            </CardContent>
        </Card>
    );
};

CardForm.displayName = "CardForm";
