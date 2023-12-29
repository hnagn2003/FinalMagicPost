import { Dispatch, SetStateAction } from "react";
import SelectFilter from "../../Filter/SelectFilter";

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

export default function StatusFilter({
	statusFilter,
	setStatusFilter,
}: {
	statusFilter: string;
	setStatusFilter: Dispatch<SetStateAction<string>>;
}) {
	return (
		<SelectFilter
			label="Trạng Thái"
			name="status"
			value={statusFilter}
			setValue={setStatusFilter}
			options={statuses}
		/>
	);
}
