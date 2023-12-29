import { ShipmentProps } from "../types/Order/orders";

const date = new Date().toString();
export async function getIncomingShipments() {
	return {
		message: "success",
		orders: [
			{
				id: "13asdasdassdfvzxcdasasddfvvdvdfvdfvd",
				sender: {
					name: "Someone",
					address: {
						id: "1",
						name: "12th Beatle Juice",
						lat: null,
						long: null,
						province: "",
						district: "",
						ward: "",
					},
					phone: "",
				},
				receiver: {
					name: "",
					address: {
						id: "",
						name: "",
						lat: null,
						long: null,
						province: "",
						district: "",
						ward: "",
					},
					phone: "",
				},
				itemsInfo: {
					type: "parcel" as "parcel" | "document",
					items: [],
					properties: [],
				},
				moreInfo: {
					cod: 0,
					payer: "sender" as "sender" | "receiver",
					note: "",
				},
				createdAt: date,
				status: "PENDING",
				from: "Hanoi",
				shippingTime: date,
			},
		] as Array<ShipmentProps & { from: string; shippingTime: string }>,
	};
}

export async function getOutgoingShipments() {
	return {
		message: "success",
		orders: [
			{
				id: "uherhekkher",
				sender: {
					name: "HNGAN",
					address: {
						id: "12",
						name: "CauGiay",
						lat: null,
						long: null,
						province: "",
						district: "",
						ward: "",
					},
					phone: "",
				},
				receiver: {
					name: "",
					address: {
						id: "",
						name: "",
						lat: null,
						long: null,
						province: "",
						district: "",
						ward: "",
					},
					phone: "",
				},
				itemsInfo: {
					type: "parcel" as "parcel" | "document",
					items: [],
					properties: [],
				},
				moreInfo: {
					cod: 0,
					payer: "sender" as "sender" | "receiver",
					note: "",
				},
				createdAt: date,
				status: "PENDING",
				to: "Hanoi",
				arrivedAt: date,
			},
		] as Array<ShipmentProps & { to: string; arrivedAt: string }>,
	};
}

export async function confirmShipments(
	selectedShipments: Array<string>,
	mode: "incoming" | "outgoing"
) {
	try {
		const json = await fetch(
			`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/${
				mode === "incoming" ? "confirmIncomingShipments" : "forwardShipments"
			}`,
			{
				credentials: "include",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(selectedShipments),
			}
		).then((response) => response.json());
		return json;
	} catch (err) {
		throw err;
	}
}

export async function rejectShipments(
	selectedShipments: Array<string>,
	reason: string,
	mode: "incoming" | "outgoing"
) {
	try {
		const json = await fetch(
			`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${mode}/reject`,
			{
				credentials: "include",
				method: "PUT",
				body: JSON.stringify({
					orders: selectedShipments,
					reason: reason,
				}),
			}
		).then((response) => response.json());
		return json;
	} catch (err) {
		throw err;
	}
}

export type ShippingHistoryProps = {
	orderId: string;
	type: "incoming" | "outgoing";
	point: string;
	status: "confirmed" | "rejected" | "pending";
	reason: string;
	time: string;
	deliveryId: string | undefined;
};

export async function getShippingHistory() {
	return Promise.resolve({
		message: "success",
		history: [
			{
				orderId: "23453553",
				type: "incoming",
				point: "Ha Noi",
				status: "confirmed",
				reason: null,
				time: new Date().toString(),
				deliveryId: "123211421112312",
			},
			{
				orderId: "2553532532",
				type: "outgoing",
				point: "Ha Noi",
				status: "rejected",
				reason: "Shipment not found",
				time: new Date().toString(),
				deliveryId: "1232",
			},
			{
				orderId: "522325",
				type: "incoming",
				point: "Ha Noi",
				status: "pending",
				reason: null,
				time: new Date().toString(),
			},
		],
	});
	return await fetch(
		`${process.env.NEXT_PUBLIC_API_ENDPOINT}/deliveries/history`,
		{
			credentials: "include",
		}
	).then(async (response) => {
		if (response.status !== 200) {
			const json = await response.json();
			throw new Error(json.message);
		}
		return response.json();
	});
}
