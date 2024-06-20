"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transactions";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

type Props = {
	id: string;
};

export const Actions = ({ id }: Props) => {
	const [ConfirmDialog, confirm] = useConfirm(
		"Delete transaction",
		"Are you sure you want to delete this transaction?"
	);

	const deleteMutation = useDeleteTransaction(id);
	const { onOpen } = useOpenTransaction();

	const handleDelete = async() => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate();
        }
    };

	return (
		<>
			<ConfirmDialog />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="size-4 p-0">
						<MoreHorizontal />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem
						disabled={deleteMutation.isPending}
						onClick={() => onOpen(id)}
					>
						<Edit className="size-4 mr-2" />
						Edit
					</DropdownMenuItem>
                    <DropdownMenuItem
						disabled={deleteMutation.isPending}
						onClick={handleDelete}
					>
						<Trash className="size-4 mr-2" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
