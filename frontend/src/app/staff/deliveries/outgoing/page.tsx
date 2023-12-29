import Title from "@/components/Title/Title";
import OutgoingShipmentTable from "./components/OutgoingOrderTable";

export default function Page() {
	return (
		<div>
			<Title>Đơn Hàng Đi</Title>
			<OutgoingShipmentTable />
		</div>
	);
}
