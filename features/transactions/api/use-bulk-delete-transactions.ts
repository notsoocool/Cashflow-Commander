import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteTransactions = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationFn: async (json) => {
			const response = await client.api.transactions["bulk-delete"]["$post"]({json});
			return await response.json();
		},
		onSuccess: () => {
            toast.success("Transaction deleted");
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
		},
		onError: () => {
            toast.error("Failed to delete transactions");
		},
	});

    return mutation;
};
