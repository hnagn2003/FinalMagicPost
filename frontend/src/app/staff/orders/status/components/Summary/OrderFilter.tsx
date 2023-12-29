import FilterFieldset from "@/app/staff/components/Order/Filter/FilterFieldset";
import Filter from "@/components/Filter";
import { Dispatch, SetStateAction } from "react";
const statuses = [
	{
		value: "0",
		label: "Đang chờ",
	},
	{
		value: "1",
		label: "Đang vận chuyển",
	},
];
const categories = [
	{
		value: "parcel",
		label: "Bưu Kiện",
	},
	{
		value: "document",
		label: "Tài Liệu",
	},
];

export default function ShipmentFilter({
	statusFilter,
	setStatusFilter,
	categoryFilter,
	setCategoryFilter,
	timeRange,
	setTimeRange,
	handleConfirm,
}: {
	statusFilter: string;
	setStatusFilter: Dispatch<SetStateAction<string>>;
	categoryFilter: string;
	setCategoryFilter: Dispatch<SetStateAction<string>>;
	timeRange: any;
	setTimeRange: any;
	handleConfirm: () => void;
}) {
	return (
		<FilterFieldset handleConfirm={() => handleConfirm()}>
			<Filter
				label="Trạng Thái"
				name="status"
				value={statusFilter}
				setValue={setStatusFilter}
				options={statuses}
			/>
			<Filter
				label="Loại"
				name="category"
				value={categoryFilter}
				setValue={setCategoryFilter}
				options={categories}
			/>
			<Filter
				label="Thời Gian"
				name="timerange"
				type="timerange"
				value={timeRange}
				setValue={setTimeRange}
			/>
			{/* <TimeRangeFilter {...{ timeRange, setTimeRange }} /> */}
		</FilterFieldset>
	);
}
