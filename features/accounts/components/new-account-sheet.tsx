import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetDescription,
	SheetTitle,
} from "@/components/ui/sheet";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateAccount } from "../api/use-create-account";

const formSchema = insertAccountSchema.pick({
	name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
	const { isOpen, onClose } = useNewAccount();

	const mutation = useCreateAccount();

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
					<SheetTitle>Create a new account</SheetTitle>
					<SheetDescription>
						Sign up to create an account and start using the app.
					</SheetDescription>
				</SheetHeader>
				<AccountForm
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
