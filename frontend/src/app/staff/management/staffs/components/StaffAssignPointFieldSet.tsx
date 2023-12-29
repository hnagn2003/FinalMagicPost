import { Address } from "@/app/staff/utils/orders";
import { CreateStaffShipmentStatusProps } from "@/app/staff/utils/staffs";
import AddressInput from "@/components/AddressInput";
import Fieldset from "@/components/Form/Fieldset";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function StaffAssignPointField({
	state,
	disabled = false,
}: {
	state: CreateStaffShipmentStatusProps;
	disabled: boolean;
}) {
	return (
		<Fieldset
			legend="Giao Vai Trò"
			icon={faLocationDot}
			className="sm:flex-col"
			disabled={disabled}
		>
			<AddressInput
				className="flex-1"
				value={state.address.value}
				handleChange={(newAddress: Address) =>
					state.address.handleChange({ ...state.address.value, ...newAddress })
				}
				realAddress={false}
			/>
		</Fieldset>
	);
}
