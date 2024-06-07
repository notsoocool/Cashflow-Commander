import { Header } from "@/components/header";

type Props = {
	children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
	return (
		<>
            <Header />
			<main className=" px-3 lg:px-14">
				<h1>Dashboard Layout</h1>
				{children}
			</main>
		</>
	);
};

export default DashboardLayout;
