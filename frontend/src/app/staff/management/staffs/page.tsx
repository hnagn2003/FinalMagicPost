"use client";

import PrimaryButton from "@/components/Button/PrimaryButton";
import Title from "@/components/Title/Title";
import { useRouter } from "next/navigation";
import StaffsSummaryTable from "./components/StaffsSummaryTable";

function Page() {
	const router = useRouter();

	return (
		<div className="flex flex-col">
			<div className="flex justify-between">
				<Title>Nhân Viên</Title>
				<PrimaryButton handleClick={() => router.push("staffs/create")}>
					Tạo Nhân Viên
				</PrimaryButton>
			</div>
			<StaffsSummaryTable />
		</div>
	);
}

export default Page;
