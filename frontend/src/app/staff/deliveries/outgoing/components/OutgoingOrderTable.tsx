"use client";

import { confirmShipments, rejectShipments } from "@/app/staff/utils/deliveries";
import { Address } from "@/app/staff/utils/orders";
import Navigation from "@/components/Pagination/Navigation";
import Table from "@/components/legacy/Table/Table";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { Moment } from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import Actions from "../../components/Actions/Actions";
import ShippingShipmentFilter from "../../components/DeliveryOrderFilter";
import OutgoingShipmentSummary from "./OutgoingShipmentSummary";

async function filterOutgoingShipments(
	numOfPage: number,
	startingDay?: Date,
	endingDay?: Date,
	province?: string | undefined | null,
	district?: string | undefined | null,
	ward?: string | undefined | null
) {
	const filter: { [key: string]: string } = {
		numOfPage: numOfPage.toString(),
	};
	if (startingDay) filter[`startingDay`] = startingDay.toISOString();
	if (endingDay) filter[`endingDay`] = endingDay.toISOString();
	if (province) filter[`province`] = province;
	if (district) filter[`district`] = district;
	if (ward) filter[`province`] = ward;

	return fetch(
		`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/getOutgoingShipments?` +
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

export default function OutgoingShipmentTable() {
	const [selectedShipments, setSelectedShipments] = useState<Array<string>>([]);
	const [timeRange, setTimeRange] = useState<Array<Moment | null>>([
		null,
		null,
	]);
	const [selectAll, setSelectAll] = useState(false);
	const [denyReason, setDenyReason] = useState("");
	const [numOfPage, setPageNumber] = useState(1);
	const [pointChosen, setPointFilter] = useState<Address>({
		province: "",
		district: "",
		ward: "",
	});
	const [menuFilter, setMenuFilter] = useState(false);
	const { isLoading, error, data } = useQuery({
		queryKey: ["outgoing", menuFilter, numOfPage],
		queryFn: () =>
			filterOutgoingShipments(
				numOfPage,
				timeRange[0]?.toDate(),
				timeRange[1]?.toDate(),
				pointChosen.province,
				pointChosen.district,
				pointChosen.ward
			),
	});

	if (isLoading) return <Skeleton active />;

	if (error) toast.error(error.message);
	return (
		<div className="flex flex-row gap-4">
			<div className="flex-grow-1" >
				<ShippingShipmentFilter
					{...{ pointChosen, setPointFilter, timeRange, setTimeRange }}
					handleConfirm={() => setMenuFilter(!menuFilter)}
				/>
			</div>

			<div className="flex flex-col gap-4 flex-grow-3">

				<Actions
					selectAll={selectAll}
					onSelectAll={() => {
						setSelectAll(!selectAll);
						!selectAll
							? setSelectedShipments(
								data.data.data.map((order: any) => order.id as string)
							)
							: setSelectedShipments([]);
					}}
					selected={!!selectedShipments.length}
					denyReason={denyReason}
					setDenyReason={setDenyReason}
					onConfirm={() => confirmShipments(selectedShipments, "outgoing")}
					onReject={() => rejectShipments(selectedShipments, denyReason, "outgoing")}
				/>
				<Table columnHeadings={["", "ID", "Arrived At", "Next Point"]}>
					{data?.data.data.map(
						({
							id,
							to,
							arrivedAt,
						}: {
							id: string;
							to: string;
							arrivedAt: string;
						}) => {
							const selected =
								selectedShipments.findIndex((selectedId) => selectedId === id) !==
								-1;
							const onChange = () => {
								const index = selectedShipments.findIndex(
									(selectedId) => selectedId === id
								);
								if (index === -1) {
									setSelectedShipments([...selectedShipments, id as string]);
								} else {
									setSelectedShipments(
										selectedShipments.filter((selectedId) => selectedId !== id)
									);
								}
							};
							return (
								<OutgoingShipmentSummary
									key={id}
									{...{ id, to, arrivedAt, selected, onChange }}
								/>
							);
						}
					)}
				</Table>
				<Navigation
					numberOfPages={data?.data.totalPage || 1}
					setPageNumber={setPageNumber}
					numOfPage={numOfPage}
				/>
			</div>

		</div>
	);
}
