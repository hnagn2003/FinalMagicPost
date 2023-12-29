"use client";

import SummaryTable from "@/components/SummaryTable";

import { useState } from "react";
import { toast } from "react-toastify";
import ShipmentFilter from "./OrderFilter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { Moment } from "moment";
async function filterShipments(
	numOfPage: number,
	statusFilter?: string,
	categoryFilter?: string,
	startingDay?: Date,
	endingDay?: Date
) {
	const filter: { [key: string]: string } = {
		numOfPage: numOfPage.toString(),
	};
	if (statusFilter) filter[`status`] = statusFilter;
	if (categoryFilter) filter[`category`] = categoryFilter;
	if (startingDay) filter[`startingDay`] = startingDay.toISOString();
	if (endingDay) filter[`endingDay`] = endingDay.toISOString();
	return fetch(
		`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/filter?` +
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
		label: "Tạo Vào Lúc",
		value: "createdAt",
	},
	{
		label: "Người Gửi",
		value: "sender.name",
	},
	{
		label: "Từ",
		value: "sender.address.name",
	},
	{
		label: "Người Nhận",
		value: "receiver.name",
	},
	{
		label: "Tới",
		value: "receiver.address.name",
	},
	{
		label: "Loại Hàng",
		value: "itemsInfo.type",
	},
	{
		label: "Tình Trạng",
		value: "status",
	},
];

export default function ShipmentsSummaryTable() {
	const [numOfPage, setPageNumber] = useState(1);
	const [statusFilter, setStatusFilter] = useState("");
	const [timeRange, setTimeRange] = useState<Array<Moment | null>>([
		null,
		null,
	]);
	const [categoryFilter, setCategoryFilter] = useState("");
	const [menuFilter, setMenuFilter] = useState(false);

	const { isPending, error, data } = useQuery({
		queryKey: ["orders", menuFilter, numOfPage],
		queryFn: () =>
			filterShipments(
				numOfPage,
				statusFilter,
				categoryFilter,
				timeRange[0]?.toDate(),
				timeRange[1]?.toDate()
			),
	});

	if (isPending) return <Skeleton active />;

	if (error) toast.error(error.message);

	return (
		<div className="flex flex-col items-center gap-4">
			<SummaryTable
				items={data.data.data}
				columnHeadings={columnHeadings}
				numOfPage={numOfPage}
				totalPage={data.data.totalPage}
				setPageNumber={setPageNumber}
			>
				<ShipmentFilter
					{...{
						statusFilter,
						setStatusFilter,
						timeRange,
						setTimeRange,
						categoryFilter,
						setCategoryFilter,
						handleConfirm: () => setMenuFilter(!menuFilter),
					}}
				/>
			</SummaryTable>
		</div>
	);
}
