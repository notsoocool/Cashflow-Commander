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
import { useCreateCategory } from "../api/use-create-category";
import { useNewCategory } from "../hooks/use-new-category";

const formSchema = insertCategorySchema.pick({
	name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewCategorySheet = () => {
	const { isOpen, onClose } = useNewCategory();

	const mutation = useCreateCategory();

	const onSubmit = (values: FormValues) => {
		mutation.mutate(values, {
			onSuccess: () => {
				onClose();
			},
		});
	};

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="space-y-4">
				<SheetHeader>
					<SheetTitle>Create a new category</SheetTitle>
					<SheetDescription>
						Categories are used to organize your transactions into groups.
					</SheetDescription>
				</SheetHeader>
				<CategoryForm
					onSubmit={onSubmit}
					disabled={mutation.isPending}
					defaultValues={{
						name: "",
					}}
				/>
			</SheetContent>
		</Sheet>
	);
};
