import { Dispatch, SetStateAction } from "react";
import Select from "../../../../components/Form/Select";

export default function SelectFilter({
	value,
	setValue,
	label,
	options,
	name,
}: {
	value: string;
	setValue: Dispatch<SetStateAction<any>>;
	label: string;
	options: Array<{ value: string; label: string }>;
	name: string;
}) {
	return (
		<Select
			label={label}
			name={name}
			options={[
				{
					value: "",
					label: "Tất Cả",
				},
				...options,
			]}
			handleChange={(value) => {
				setValue(value);
			}}
			className="text-sm"
			value={value}
			required={false}
		/>
	);
}
