import { useEffect, useState } from "react";
import { getShipmentById, LookUpResultProps } from "../../utils/lookup";
import Timeline from "../Timeline/Timeline";

export default function LookupResult({ orderId }: { orderId: string }) {
	const [order, setShipment] = useState<LookUpResultProps | null>(null);
	const [error, setError] = useState<any>(null);
	useEffect(() => {
		(async () => {
			try {
				const order = await getShipmentById(orderId).then((json) => {
					console.log(json);
					return json.order;
				});
				setShipment(order);
				setError(null);
			} catch (error) {
				setShipment(null);
				setError(error);
			}
		})();
	}, [orderId, setShipment]);
	if (!order && !error)
		return (
			<div className=" flex items-center text-custom-white">
				<span className="loading loading-spinner mr-2"></span>Loading...
			</div>
		);

	if (error) return <div>{error}</div>;

	if (order)
		return (
			<div className="flex bg-base-400 p-6 flex-col gap-4  rounded-md w-full items-center">
				<h3 className="text-custom-white font-bold">Đơn Gửi {order.id}</h3>
				<div className="text-custom-white w-fit grid grid-cols-2 gap-x-12">
					<div className="">
						<span className="text-primary">Từ:</span>{" "}
						<span>{order.sender.address.name}</span>
					</div>
					<div className="">
						<span className="text-primary">Tới:</span>{" "}
						<span>{order.receiver.address.name}</span>
					</div>
					<div className="">
						<span className="text-primary">Khối Lượng:</span>{" "}
						<span>
							{order.itemsInfo.items.reduce(
								(total, item) => item.weight + total,
								0
							)}{" "}
							(g)
						</span>
					</div>
					<div className="">
						<span className="text-primary">Loại Gói Hàng:</span>{" "}
						<span>{order.itemsInfo.type}</span>
					</div>
					<div className="">
						<span className="text-primary">Tính Chất:</span>
						<span>{order.itemsInfo.properties.join(", ")}</span>
					</div>
				</div>
				<div>
					<Timeline timeline={order.timeline} />
				</div>
			</div>
		);

	return null;
}
