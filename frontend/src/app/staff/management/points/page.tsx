"use client";

import PrimaryButton from "@/components/Button/PrimaryButton";
import { useRouter } from "next/navigation";

import Title from "@/components/Title/Title";
import PointsSummaryTable from "./components/PointsSummaryTable";

function Page() {
	const router = useRouter();

	return (
		<div className="flex flex-col">
			<div className="flex justify-between">
				<Title>Điểm</Title>
				<PrimaryButton handleClick={() => router.push("points/create")}>
					Thêm Điểm
				</PrimaryButton>
			</div>
			<PointsSummaryTable />
		</div>
	);
}

export default Page; 
