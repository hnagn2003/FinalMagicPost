import { ShipmentProps } from "@/app/staff/types/Order/orders";

export type LookUpResultProps = ShipmentProps & {
	timeline: Array<{ event: string; time: string | null }>;
};

export async function getShipmentById(orderId: string) {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	return Promise.resolve({
		message: "Get order successfully",
		order: {
			id: "4d7d9f32-433b-4846-b55e-f6f550fd510f",
			createdAt: "2023-12-23T07:45:17.9450782Z",
			status: "PENDING",
			sender: {
				name: "string",
				address: {
					name: "string",
					lat: 0,
					long: 0,
					province: "string",
					district: "string",
					ward: "string",
				},
				phone: "string",
			},
			receiver: {
				name: "string",
				address: {
					name: "string",
					lat: 0,
					long: 0,
					province: "string",
					district: "string",
					ward: "string",
				},
				phone: "string",
			},
			itemsInfo: {
				type: "string",
				items: [],
				properties: ["dễ vỡ", "chất lỏng", "khác"],
			},
			moreInfo: {
				cod: 0,
				payer: "RECEIVER",
				note: "string",
			},
			timeline: [
				{
					event: "Nhận từ người gửi ở điểm giao dịch Hà Nội",
					time: new Date().toString(),
				},
				{
					event: "Chuyển tới điểm tập kết Hà Nội",
					time: new Date().toString(),
				},
				{
					event: "Trả về điểm tập kết Hà Nội",
					time: new Date().toString(),
				},
				{
					event: "Chuyển tới điểm tập kết TP HCM",
					time: new Date().toString(),
				},
				{
					event: "Chuyển tới điểm giao dịch TP HCM",
					time: null,
				},
				{
					event: "Tới tay người gửi",
					time: null,
				},
			],
		},
	});
	return fetch(`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/get/${orderId}`, {
		credentials: "include",
	}).then(async (res) => {
		if (res.status !== 200) {
			const json = await res.json();
			throw new Error(json.message);
		}
		return res.json();
	});
}
