"use client";

import { ShipmentProps } from "@/app/staff/types/Shipment/orders";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export type ShipmentContextProps = {
	orders: ShipmentProps[];
	setShipments: Dispatch<SetStateAction<ShipmentProps[]>>;
	order: ShipmentProps | null;
	setShipment: Dispatch<SetStateAction<ShipmentProps | null>>;
};

const ShipmentContext = createContext<ShipmentContextProps | null>(null);

const ShipmentContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [orders, setShipments] = useState<ShipmentProps[]>([]);
	const [order, setShipment] = useState<ShipmentProps | null>(null);
	return (
		<ShipmentContext.Provider value={{ orders, setShipments, order, setShipment }}>
			{children}
		</ShipmentContext.Provider>
	);
};

export default ShipmentContext;

export { ShipmentContextProvider };
