import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-create"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-create"]["$post"]>["json"];

export const useBulkCreateTransactions = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationFn: async (json) => {
			const response = await client.api.transactions["bulk-create"]["$post"]({json});
			return await response.json();
		},
		onSuccess: () => {
            toast.success("Transaction created");
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
		},
		onError: () => {
            toast.error("Failed to create transactions");
		},
	});

    return mutation;
};