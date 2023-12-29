import FilterFieldset from "@/app/staff/components/Order/Filter/FilterFieldset";
import { Address } from "@/app/staff/utils/orders";
import AddressInput from "@/components/AddressInput";
import Filter from "@/components/Filter";
import { Dispatch, SetStateAction } from "react";

const roles = [
	{
		label: "Company Administrator",
		value: "COMPANY_ADMINISTRATOR",
	},
	{
		label: "Gathering Point Manager",
		value: "COLLECTION_POINT_LEADER",
	},
	{
		label: "Transaction Point Manager",
		value: "TRANSACTION_POINT_LEADER",
	},
	{
		label: "Transaction Staff",
		value: "TRANSACTION_STAFF",
	},
	{
		label: "Gathering Staff",
		value: "GATHERING_STAFF",
	},
];

export default function StaffFilter({
	pointChosen,
	setPointFilter,
	roleFilter,
	setRoleFilter,
	handleConfirm,
}: {
	pointChosen: Address;
	setPointFilter: Dispatch<SetStateAction<Address>>;
	roleFilter: string;
	setRoleFilter: Dispatch<SetStateAction<string>>;
	handleConfirm: () => void;
}) {
	return (
		<FilterFieldset
			handleConfirm={handleConfirm}
			className="md:grid md:grid-cols-1 gap-2 flex flex-colw-full text-sm"
		>
			{/* <div className=""></div> */}
			<AddressInput
				// className="row-span-4"
				realAddress={false}
				value={pointChosen}
				handleChange={(address) =>
					setPointFilter({ ...pointChosen, ...address })
				}

			/>
			<Filter
				label="Role"
				name="role"
				value={roleFilter}
				setValue={setRoleFilter}
				options={roles}
			/>


		</FilterFieldset>
	);
}
