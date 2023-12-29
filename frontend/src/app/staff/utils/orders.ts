"use client";

import { useReducer, useState } from "react";
import uniqid from "uniqid";
import { ShipmentProps } from "../types/Order/orders";
import { ItemProps, PackageProperties } from "../types/Order/package";
import { copyObject } from "@/utils";

export type Address = {
	id?: string | null;
	name?: string | null;
	lat?: number | null;
	long?: number | null;
	province?: string | null;
	district?: string | null;
	ward?: string | null;
};

export const defautShipment = {
	id: "",
	sender: {
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
		items: [] as Array<ItemProps>,
		properties: [] as Array<PackageProperties>,
	},
	moreInfo: {
		cod: 0,
		payer: "sender" as "sender" | "receiver",
		note: "",
	},
	createdAt: "",
	status: "",
};

export function useShipmentStatus(order: ShipmentProps) {
	function itemsReducer(
		items: Array<ItemProps>,
		action: { type: string; item?: ItemProps }
	) {
		const { type, item } = action;
		switch (type) {
			case "item_added": {
				return [
					...items,
					{ id: uniqid(), name: "", quantity: 1, value: 0, weight: 0 },
				];
			}
			case "item_changed": {
				return items.map((curItem) => {
					if (item && curItem.id === item.id) {
						return item;
					}
					return curItem;
				});
			}
			
			
			case "items_reset": {
				return copyObject(order.itemsInfo.items);
			}
			case "item_removed": {
				return items.filter((curItem) => item && curItem.id !== item.id);
			}
		}
		return [];
	}
	const [sender, setSender] = useState(order.sender);
	const [receiver, setReceiver] = useState(order.receiver);
	const [type, setType] = useState(order.itemsInfo.type);
	const [items, itemsDispatch] = useReducer(
		itemsReducer,
		order.itemsInfo.items as Array<ItemProps>
	);
	const [packageProperties, setPackageProperties] = useState(
		order.itemsInfo.properties as Array<PackageProperties>
	);
	const [cod, setCod] = useState(order.moreInfo.cod);
	const [payer, setPayer] = useState(order.moreInfo.payer);
	const [note, setNote] = useState(order.moreInfo.note);
	const [status, setStatus] = useState(order.status);

	function resetShipment() {
		setSender(copyObject(order.sender));
		setReceiver(copyObject(order.receiver));
		setType(copyObject(order.itemsInfo.type));
		itemsDispatch({ type: "items_reset" });
		setCod(copyObject(order.moreInfo.cod));
		setPayer(copyObject(order.moreInfo.payer));
		setNote(copyObject(order.moreInfo.note));
		setStatus(copyObject(order.status));
	}

	return {
		id: order.id,
		sender: {
			value: sender,
			handleChange: setSender,
		},
		receiver: {
			value: receiver,
			handleChange: setReceiver,
		},
		itemsInfo: {
			type: {
				value: type,
				handleChange: setType,
			},
			items: {
				value: items,
				handleChange: itemsDispatch,
			},
			properties: {
				value: packageProperties,
				handleChange: setPackageProperties,
			},
		},
		moreInfo: {
			cod: {
				value: cod,
				handleChange: setCod,
			},
			payer: {
				value: payer,
				handleChange: setPayer,
			},
			note: {
				value: note,
				handleChange: setNote,
			},
		},
		resetShipment,
		createdAt: order.createdAt,
		status: {
			value: status,
			handleChange: setStatus,
		},
	};
}

export async function getShipments() {
	return fetch(`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/get`, {
		credentials: "include",
	}).then(async (res) => {
		if (res.status !== 200) {
			const json = await res.json();
			throw new Error(json.message);
		}
		return res.json();
	});
}

export async function getShipmentById(orderId: string) {
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
