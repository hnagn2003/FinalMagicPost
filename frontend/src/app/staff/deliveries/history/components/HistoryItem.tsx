import HoverNote from "@/app/staff/components/HoverNote/HoverNote";
import ShipmentLink from "@/app/staff/components/Order/OrderLink/OrderLink";
import TableRow from "@/app/staff/components/Table/TableRow";
import { ShippingHistoryProps } from "@/app/staff/utils/deliveries";
import { formatDate } from "@/utils/helper";
import {
	faCheck,
	faXmark,
	faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HistoryItem({
	orderId,
	type,
	point,
	time,
	status,
	reason,
	deliveryId,
}: ShippingHistoryProps) {
	return (
		<TableRow>
			<td>
				<ShipmentLink id={orderId} />
			</td>
			<td>{deliveryId}</td>
			<td>{type}</td>
			<td>{point}</td>
			<td>{formatDate(time)}</td>
			<td>
				<StatusBadge status={status} />
			</td>
			<td>{reason ? <HoverNote note={reason} /> : "-"}</td>
		</TableRow>
	);
}

function getStatusBadgeClassAndIcon(
	status: "confirmed" | "rejected" | "pending"
) {
	if (status === "confirmed")
		return {
			badgeClass: "badge-success",
			icon: faCheck,
		};
	if (status === "rejected")
		return {
			badgeClass: "badge-error",
			icon: faXmark,
		};
	return {
		badgeClass: "badge-info",
		icon: faHourglassHalf,
	};
}

function StatusBadge({
	status,
}: {
	status: "confirmed" | "rejected" | "pending";
}) {
	const { badgeClass, icon } = getStatusBadgeClassAndIcon(status);
	return (
		<div className={`badge ${badgeClass} flex flex-row gap-1`}>
			<FontAwesomeIcon icon={icon} />
			<div>{status}</div>
		</div>
	);
}
