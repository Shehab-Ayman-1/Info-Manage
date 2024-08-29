import { MutationKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const getData = async <ResponseType,>(apiUrl: string, queries: string) => {
    try {
        const response = await fetch(`${apiUrl}?${queries}`);
        const data: ResponseType = await response.json();

        if (!response.ok) throw new Error(data as string);
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const useGetByQuery = <ResponseType,>(apiUrl: string, revalidateQueryKeys?: MutationKey) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, string>({
        mutationFn: (queries) => getData<ResponseType>(apiUrl, queries),
        onSuccess: () => {
            revalidateQueryKeys?.forEach((query) => queryClient.invalidateQueries({ queryKey: [query] }));
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
