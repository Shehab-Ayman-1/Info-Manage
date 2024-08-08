import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const deleteData = async <RequestType,>(apiUrl: string, body: RequestType) => {
    try {
        const options = { method: "DELETE", body: JSON.stringify(body) };
        const response = await fetch(apiUrl, options);

        const data = await response.json();
        if (!response.ok) throw new Error(data);

        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const useDelete = <RequestType,>(apiUrl: string, revalidateQueryKeys?: string[]) => {
    const queryClient = useQueryClient();

    const query = useMutation<string, Error, RequestType>({
        mutationFn: (variables) => deleteData<RequestType>(apiUrl, variables),
        onSuccess: (data) => {
            toast.success(data);
            revalidateQueryKeys?.forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return query;
};
