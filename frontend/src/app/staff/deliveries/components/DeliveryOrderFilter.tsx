import TimeRangeFilter from "@/app/staff/components/Order/Filter/TimeRangeFilter";
import { Address } from "@/app/staff/utils/orders";
import AddressInput from "@/components/AddressInput";
import { Dispatch, SetStateAction } from "react";

import FilterFieldset from "../../components/Order/Filter/FilterFieldset";

export default function ShippingShipmentFilter({
	pointChosen,
	timeRange,
	setTimeRange,
	setPointFilter,
	handleConfirm,
}: {
	pointChosen: Address;
	timeRange: any;
	setTimeRange: any;
	setPointFilter: Dispatch<SetStateAction<Address>>;
	handleConfirm: () => void;
}) {
	return (
		<FilterFieldset
			className="md:grid md:grid-rows-4 gap-2 flex flex-col text-sm"
			handleConfirm={handleConfirm}
		>
			<div className="flex flex-col gap-4 ">
				<AddressInput
					
					handleChange={(address) =>
						setPointFilter({ ...pointChosen, ...address })
					}
					value={pointChosen}
					realAddress={false}
				/>

				<div >
					<TimeRangeFilter {...{ timeRange, setTimeRange }} />
				</div>{" "}

			</div>

		</FilterFieldset>
	);
}
