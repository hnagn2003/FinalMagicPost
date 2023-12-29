import FilterFieldset from "@/app/staff/components/Order/Filter/FilterFieldset";
import { Address } from "@/app/staff/utils/orders";
import AddressInput from "@/components/AddressInput";
import Filter from "@/components/Filter";
import { Dispatch, SetStateAction } from "react";

const types = [
	{
		label: "Transaction Point",
		value: "TRANSACTION_POINT",
	},
	{
		label: "Gathering Point",
		value: "GATHERING_POINT",
	},
];

export default function PointFilter({
	pointTypeFilter,
	setPointTypeFilter,
	pointChosen,
	setPointFilter,
	handleConfirm,
}: {
	pointTypeFilter: string;
	setPointTypeFilter: Dispatch<SetStateAction<string>>;
	pointChosen: Address;
	setPointFilter: Dispatch<SetStateAction<Address>>;
	handleConfirm: () => void;
}) {
	return (
		<FilterFieldset
			handleConfirm={handleConfirm}
			className="md:grid md:grid-cols-1 gap-2 flex flex-col w-full text-sm"
		>
			<AddressInput
				// className="row-span-1"
				realAddress={false}
				value={pointChosen}
				handleChange={(address) =>
					setPointFilter({ ...pointChosen, ...address })
				}
			/>
			<Filter
				label="Loại Điểm"
				name="point-type"
				value={pointTypeFilter}
				setValue={setPointTypeFilter}
				options={types}
			/>
		</FilterFieldset>
	);
}
