import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const getData = async (apiUrl: string) => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) throw new Error(data);
        return data;
    } catch (error: any) {
        const isServerError = error.message === "Unexpected end of JSON input";
        if (!isServerError) return toast.error(error.message);
        throw new Error(error.message);
    }
};

export const useGet = <ResponseType,>(apiUrl: string, queryKey: string[]) => {
    const query = useQuery<ResponseType[], Error>({
        queryKey,
        queryFn: () => getData(apiUrl),
    });
    return query;
};
