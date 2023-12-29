import FilterFieldset from "@/app/staff/components/Order/Filter/FilterFieldset";
import { Address } from "@/app/staff/utils/orders";
import AddressInput from "@/components/AddressInput";
import TimeRange from "@/components/Form/TimeRange";
import SelectFilter from "@/components/legacy/Filter/SelectFilter";
import { Dispatch, SetStateAction } from "react";

export default function HistoryFilter({
	typeFilter,
	timeRange,
	statusFilter,
	setTypeFilter,
	setTimeRange,
	setStatusFilter,
	pointChosen,
	setPointFilter,
	handleConfirm,
}: {
	typeFilter: string;
	timeRange: any;
	statusFilter: string;
	setTypeFilter: Dispatch<SetStateAction<string>>;
	setTimeRange: any;
	setStatusFilter: Dispatch<SetStateAction<string>>;
	handleConfirm: () => void;
	pointChosen: Address;
	setPointFilter: Dispatch<SetStateAction<Address>>;
}) {
	return (
		<FilterFieldset
			handleConfirm={handleConfirm}
			className="text-sm md:grid md:grid-cols-1"
		>
			<SelectFilter
				label="Loại"
				name="type"
				options={types}
				value={typeFilter}
				setValue={setTypeFilter}
			/>
			<SelectFilter
				label="Trạng Thái"
				name="status"
				options={statuses}
				value={statusFilter}
				setValue={setStatusFilter}
			/>
			{/* <div className="flex flex-col gap-4"> */}
			<TimeRange
				label="Thời Gian"
				timeRange={timeRange}
				handleChange={setTimeRange}
			/>
			<AddressInput
				realAddress={false}
				value={pointChosen}
				handleChange={(address) =>
					setPointFilter({ ...pointChosen, ...address })
				}
				// className="col-span-3"
			/>
				
			{/* </div> */}
			
		</FilterFieldset>
	);
}

const types = [
	{ value: "incoming", label: "incoming" },
	{ value: "outgoing", label: "outgoing" },
];

const statuses = [
	{ value: "confirmed", label: "confirmed" },
	{ value: "rejected", label: "rejected" },
	{ value: "pending", label: "pending" },
];
