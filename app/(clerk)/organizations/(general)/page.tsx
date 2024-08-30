"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrganization } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import Image from "next/image";

import { useModel } from "@/hooks/useModel";
import { LeaveDialog } from "./leave-dialog";

import { CardForm } from "@/components/page-structure/CardForm";
import { SubmitButton } from "@/components/public/submit-btn";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

const schema = z.object({
    name: z.string(),
    slug: z.string(),
});

const OrganizationsLists = () => {
    const { formState, register, watch, setValue, handleSubmit } = useForm({ resolver: zodResolver(schema) });
    const { organization } = useOrganization();
    const [imageSrc, setImageSrc] = useState("");
    const { onOpen } = useModel();

    const name = watch("name");
    const { errors } = formState;

    useEffect(() => {
        if (!name) return;
        setValue("slug", name?.split(" ").join("-").toLowerCase());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organization, name]);

    if (!organization) return;

    const onFileReader = (event: any) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageSrc(reader.result as string);
            organization.setLogo({ file });
        };
    };

    const onSubmit = async (data: any) => {
        const { name, slug } = data;
        await organization.update({ name, slug });
        toast.success("The Organization Was Updated.");
    };

    return (
        <CardForm heading="General">
            <form onSubmit={handleSubmit(onSubmit)} className="min-w-[500px]">
                <div className="flex-between my-12">
                    <div className="flex-start">
                        <Image
                            src={imageSrc || organization.imageUrl}
                            className="rounded-md"
                            alt="org-logo"
                            height={50}
                            width={50}
                        />
                        {organization.name}
                    </div>

                    <div className="file">
                        <Input type="file" id="file" accept="image/*" className="hidden" onChange={onFileReader} />
                        <Button asChild variant="outline" className="cursor-pointer">
                            <label htmlFor="file">Change Logo</label>
                        </Button>
                    </div>
                </div>

                <Input placeholder="Name" error={errors.name} {...register("name", { value: organization.name })} />
                <Input placeholder="Slug" error={errors.slug} {...register("slug", { value: organization.slug })} disabled />

                <Button
                    type="button"
                    variant="ghost"
                    className="mx-auto mt-6 flex text-rose-500 hover:bg-rose-900/30"
                    onClick={() => onOpen("leave-model")}
                >
                    Leave Organization
                </Button>

                <SubmitButton text="Update" isPending={false} />
            </form>

            <LeaveDialog />
        </CardForm>
    );
};

OrganizationsLists.displayName = "OrganizationsLists";
export default OrganizationsLists;
