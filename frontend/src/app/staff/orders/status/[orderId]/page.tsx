"use client";

import { Shipment } from "@/app/staff/components";
import { ShipmentProps } from "@/app/staff/types/Shipment/orders";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

async function fetchShipment(orderId: string) {
	return await fetch(
		`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/get/${orderId}`,
		{ credentials: "include" }
	).then(async (response) => {
		if (response.status !== 200) {
			const message = await Promise.resolve(response.json()).then(
				(json) => json.message
			);
			throw new Error(message);
		}
		return response.json();
	});
}

async function updateShipment(order: ShipmentProps) {
	console.log(order);
	return;
	try {
		toast.info(`Updating order ${order.id}`);
		await fetch(
			`${process.env.NEXT_PUBLIC_API_ENDPOINT}/order/UpdateShipment/${order.id}`,
			{
				credentials: "include",
				body: JSON.stringify(order),
				method: "PUT",
			}
		).then(async (response) => {
			const message = await Promise.resolve(response.json()).then(
				(json) => json.message
			);
			if (response.status !== 200) {
				throw new Error(message);
			}
			toast.success(message);
		});
	} catch (error: any) {
		toast.error(error.message);
	}
}

export default function Page({
	params,
}: {
	params: {
		orderId: string;
	};
}) {
	const router = useRouter();
	const { orderId } = params;
	const { isPending, error, data } = useQuery({
		queryKey: ["order-by-id", orderId],
		queryFn: () => fetchShipment(orderId),
	});

	if (isPending) return <Skeleton active />;

	if (error) toast.error(error.message);

	if (data) {
		const order = data.data;

		return (
			<Shipment
				order={order}
				handleSubmit={(newShipment: ShipmentProps) => {
					router.push("/staff/orders/status");
					updateShipment(newShipment);
				}}
			/>
		);
	}

	return "Not found";
}
