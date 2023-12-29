import ShipmentLink from "@/app/staff/components/Order/OrderLink/OrderLink";
import TableRow from "@/components/legacy/Table/TableRow";
import { formatDate } from "@/utils/helper";

export default function IncomingShipmentSummary({
	id,
	from,
	shippingTime,
	selected,
	onChange,
}: {
	id: string | undefined;
	from: string;
	shippingTime: string;
	selected: boolean;
	onChange: () => void;
}) {
	return (
		<TableRow>
			<td className="flex items-center justify-center">
				<input
					type="checkbox"
					className="checkbox border-1 checkbox-sm rounded-sm border-custom-text-color "
					onChange={onChange}
					checked={selected}
				/>
			</td>
			<td>
				<ShipmentLink id={id as string} />
			</td>
			<td className="text-center text-xs">{from}</td>
			<td className="text-center text-xs">{formatDate(shippingTime)}</td>
		</TableRow>
	);
}
