"use client";

import SummaryTable from "@/components/SummaryTable";
import PointContext, { PropotiesPoint } from "@/contexts/PointContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PointFilter from "./PointFilter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";

import { Address } from "@/app/staff/utils/orders";

async function filterPoints(
	numOfPage: number,
	pointTypeFilter?: string,
	pointChosen?: Address
) {
	const filter: { [key: string]: string } = {
		numOfPage: numOfPage.toString(),
	};
	if (pointTypeFilter) filter["type"] = pointTypeFilter;
	if (pointChosen?.province) filter["province"] = pointChosen?.province;
	if (pointChosen?.district) filter["district"] = pointChosen?.district;
	if (pointChosen?.ward) filter["ward"] = pointChosen?.ward;
	return fetch(
		`${process.env.NEXT_PUBLIC_POINT_ENDPOINT}/filter?` +
			new URLSearchParams(filter),
		{ credentials: "include" }
	).then(async (res) => {
		if (res.status !== 200) {
			const json = await res.json();
			throw new Error(json.message);
		}
		return res.json();
	});
}

const columnHeadings = [
	{
		label: "Điểm Giao Dịch/ Tập Kết",
		value: "pointName",
	},
	{
		label: "Địa Chỉ",
		value: "address.name",
	},
	{
		label: "Số Điện Thoại",
		value: "phone",
	},
	{
		label: "Email",
		value: "email",
	},
	{
		label: "Loại",
		value: "type",
	},
];

export default function PointsSummaryTable() {
	const [numOfPage, setPageNumber] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [pointTypeFilter, setPointTypeFilter] = useState("");
	const [menuFilter, setMenuFilter] = useState(false);
	const [pointChosen, setPointFilter] = useState<Address>({
		province: "",
		district: "",
		ward: "",
	});

	const { points, setPoints } = useContext(PointContext) as PropotiesPoint;
	const {
		isPending,
		error,
		data: response,
	} = useQuery({
		queryKey: ["points", menuFilter, numOfPage],
		queryFn: () => filterPoints(numOfPage, pointTypeFilter, pointChosen),
	});

	useEffect(() => {
		if (response) {
			toast.success(response.message);
			setPoints(response.data.data);
			setTotalPage(response.data.totalPage);
		}
	}, [response, setPoints]);

	if (isPending) return <Skeleton active />;

	if (error) toast.error(error.message);

	return (
		<div className="flex items-center flex-row gap-4">
			<SummaryTable
				items={points}
				columnHeadings={columnHeadings}
				numOfPage={numOfPage}
				totalPage={totalPage}
				setPageNumber={setPageNumber}
			>
				<PointFilter
					{...{
						pointChosen,
						setPointFilter,
						pointTypeFilter,
						setPointTypeFilter,
						handleConfirm: () => setMenuFilter(!menuFilter),
					}}
				/>
			</SummaryTable>
		</div>
	);
}
