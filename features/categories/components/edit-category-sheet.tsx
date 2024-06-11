import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetDescription,
	SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useOpenCategory } from "../hooks/use-open-category";
import { useGetCategory } from "../api/use-get-category";
import { Loader2 } from "lucide-react";
import { useEditCategory } from "../api/use-edit-category";
import { useDeleteCategory } from "../api/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertCategorySchema.pick({
	name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditCategorySheet = () => {
	const { isOpen, onClose, id } = useOpenCategory();

	const [ConfirmDialog, confirm] = useConfirm(
		"Delete Category",
		"Are you sure you want to delete this Category?"
	);

	const categoryQuery = useGetCategory(id);
	const editMutation = useEditCategory(id);
	const deleteMutation = useDeleteCategory(id);

	const isLoading = categoryQuery.isLoading;
	const isPending = editMutation.isPending || deleteMutation.isPending;

	const onSubmit = (values: FormValues) => {
		editMutation.mutate(values, {
			onSuccess: () => {
				onClose();
			},
		});
	};

	const onDelete = async () => {
		const ok = await confirm();

		if (ok) {
			deleteMutation.mutate(undefined, {
				onSuccess: () => {
					onClose();
				},
			});
		}
	};

	const defaultValues = categoryQuery.data
		? {
				name: categoryQuery.data.name,
		}
		: {
				name: "",
		};

	return (
		<>
			<ConfirmDialog />
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent className="space-y-4">
					<SheetHeader>
						<SheetTitle>Edit Category</SheetTitle>
						<SheetDescription>
							Edit the category details below.
						</SheetDescription>
					</SheetHeader>
					{isLoading ? (
						<div className="absolute inset-0 flex items-center justify-center">
							<Loader2 className="size-4 text-muted-foreground animate-spin" />
						</div>
					) : (
						<CategoryForm
							id={id}
							onSubmit={onSubmit}
							disabled={isPending}
							defaultValues={defaultValues}
							onDelete={onDelete}
						/>
					)}
				</SheetContent>
			</Sheet>
		</>
	);
};