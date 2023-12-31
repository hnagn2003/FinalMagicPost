import { PackageTypeProps } from "@/app/staff/types/Shipment/package";
import RadioInput from "../../../../../components/Form/RadioInput";

export default function PackageTypeField({
	value,
	handleChange,
}: PackageTypeProps) {
	const types = [
		{ label: "Bưu Kiện", value: "parcel" },
		{ label: "Tài Liệu", value: "document" },
	];
	return (
		<div>
			<div className="text-md font-medium mb-2">Loại Gói Hàng</div>
			<div className="flex flex-row gap-44">
				{types.map((type) => (
					<RadioInput
						key={type.value}
						label={type.label}
						value={type.value}
						name="package-type"
						checked={value === type.value}
						handleChange={() => {
							if (value !== type.value)
								handleChange(type.value as "parcel" | "document");
						}}
					/>
				))}
			</div>
		</div>
	);
}
