"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-accounts";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

type Props = {
	id: string;
};

export const Actions = ({ id }: Props) => {
	const [ConfirmDialog, confirm] = useConfirm(
		"Delete Account",
		"Are you sure you want to delete this Account?"
	);

	const deleteMutation = useDeleteAccount(id);
	const { onOpen } = useOpenAccount();

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
