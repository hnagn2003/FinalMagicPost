import ShipmentLink from "@/app/staff/components/Order/OrderLink/OrderLink";
import TableRow from "@/components/legacy/Table/TableRow";
import { formatDate } from "@/utils/helper";

export default function OutgoingShipmentSummary({
	id,
	to,
	arrivedAt,
	selected,
	onChange,
}: {
	id: string | undefined;
	to: string;
	arrivedAt: string;
	selected: boolean;
	onChange: () => void;
}) {
	return (
		<TableRow>
			<td className="flex items-center justify-center ">
				<input
					type="checkbox"
					className="checkbox border-1 checkbox-sm rounded-sm border-custom-text-color"
					onChange={onChange}
					checked={selected}
				/>
			</td>
			<td>
				<ShipmentLink id={id as string} />
			</td>
			<td className="text-xs text-center ">{formatDate(arrivedAt)}</td>
			<td className=" text-xs text-center">{to}</td>
		</TableRow>
	);
}
