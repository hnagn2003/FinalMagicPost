"use client";

import { toast } from "react-toastify";
import Shipment from "../../components/Order/Order";
import { ShipmentProps } from "../../types/Order/orders";

async function getPlaceDetail(placeId: string) {
	const res = await fetch(`/api/address/${placeId}`);
	const { data } = await res.json();
	const lat = data.geometry.location.lat;
	const long = data.geometry.location.lng;
	return { lat, long };
}

export default function Page() {
	async function handleSubmit(order: ShipmentProps) {
		const itemsWithoutID = order.itemsInfo.items.map(
			({ name, quantity, weight, value }) => {
				return { name, quantity, weight, value };
			}
		);
		const [senderPlaceInfo, receiverPlaceInfo] = await Promise.all([
			getPlaceDetail(order.sender.address.id!),
			getPlaceDetail(order.receiver.address.id!),
		]);
		const processedShipments = {
			...order,
			sender: {
				...order.sender,
				address: { ...order.sender.address, ...senderPlaceInfo },
			},
			receiver: {
				...order.receiver,
				address: { ...order.receiver.address, ...receiverPlaceInfo },
			},
			itemsInfo: { ...order.itemsInfo, items: itemsWithoutID },
		};
		const body = {
			sender: processedShipments.sender,
			receiver: processedShipments.receiver,
			itemsInfo: processedShipments.itemsInfo,
			moreInfo: processedShipments.moreInfo,
		};
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/create`,
			{
				method: "POST",
				body: JSON.stringify(body),
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const response = await res.json();
		if (res.status === 200) {
			toast.success(response.message);
		} else {
			toast.error(response.message);
		}
	}
	return <Shipment handleSubmit={handleSubmit} />;
}
