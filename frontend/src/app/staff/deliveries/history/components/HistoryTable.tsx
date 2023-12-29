"use client";

import { ShippingHistoryProps } from "@/app/staff/utils/deliveries";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import HistoryItem from "./HistoryItem";
import uniqid from "uniqid";
import { useState } from "react";
import HistoryFilter from "./HistoryFilter";
import { Moment } from "moment";
import Table from "@/components/legacy/Table/Table";
import { Address } from "@/app/staff/utils/orders";
import Navigation from "@/components/Pagination/Navigation";

async function filterHistory(
	numOfPage: number,
	startingDay?: Date,
	endingDay?: Date,
	type?: string,
	status?: string,
	province?: string | undefined | null,
	district?: string | undefined | null,
	ward?: string | undefined | null
) {
	const filter: { [key: string]: string } = {
		numOfPage: numOfPage.toString(),
	};
	if (startingDay) filter[`startingDay`] = startingDay.toISOString();
	if (endingDay) filter[`endingDay`] = endingDay.toISOString();
	if (type) filter["type"] = type;
	if (status) filter["status"] = status;
	if (province) filter[`province`] = province;
	if (district) filter[`district`] = district;
	if (ward) filter[`province`] = ward;

	return fetch(
		`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/history?` +
			new URLSearchParams(filter),
		{
			credentials: "include",
		}
	).then(async (res) => {
		if (res.status !== 200) {
			const json = await res.json();
			throw new Error(json.message);
		}
		return res.json();
	});
}

export default function HistoryTable() {
	const [typeFilter, setTypeFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [timeRange, setTimeRange] = useState<Array<Moment | null>>([
		null,
		null,
	]);
	const [pointChosen, setPointFilter] = useState<Address>({
		province: "",
		district: "",
		ward: "",
	});
	const [menuFilter, setMenuFilter] = useState(false);
	const [numOfPage, setPageNumber] = useState(1);

	const { isLoading, error, data } = useQuery({
		queryKey: ["history", menuFilter, numOfPage],
		queryFn: () =>
			filterHistory(
				numOfPage,
				timeRange[0]?.toDate(),
				timeRange[1]?.toDate(),
				typeFilter,
				statusFilter,
				pointChosen.province,
				pointChosen.district,
				pointChosen.ward
			),
	});

	if (isLoading) return <div>Loading...</div>;

	if (error) toast.error(error.message);

	return (
		<div className="flex flex-col gap-4">
			<HistoryFilter
				{...{
					pointChosen,
					setPointFilter,
					statusFilter,
					setStatusFilter,
					timeRange,
					setTimeRange,
					typeFilter,
					setTypeFilter,
					handleConfirm: () => setMenuFilter(!menuFilter),
				}}
			/>
			<Table
				columnHeadings={[
					"Shipment ID",
					"Shipping ID",
					"Type",
					"From/To",
					"Time",
					"Status",
					"Reason",
				]}
			>
				{data?.data.data.map((event: ShippingHistoryProps) => (
					<HistoryItem key={uniqid()} {...event} />
				))}
			</Table>
			<Navigation
				numOfPage={numOfPage}
				setPageNumber={setPageNumber}
				numberOfPages={data?.data.totalPage || 1}
			/>
		</div>
	);
}
