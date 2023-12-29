import { PackageProps } from "@/app/staff/types/Shipment/package";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import Fieldset from "../../../../../components/Form/Fieldset";
import PackageItemsField from "./PackageItemsField";
import PackagePropertiesField from "./PackagePropertiesField";
import PackageTypeField from "./PackageTypeField";

export default function PackageFieldset({
	type,
	items,
	properties,
	disabled = false,
}: PackageProps) {
	return (
		<Fieldset legend="Gói Hàng" icon={faBox} disabled={disabled}>
			<PackageTypeField {...type} />
			<hr className="border" />
			<PackageItemsField {...items} disabled={disabled} />
			<hr className="border" />
			<PackagePropertiesField {...properties} />
		</Fieldset>
	);
}
