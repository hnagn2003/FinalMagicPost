import { Address } from "../../utils/orders";
import { ItemProps, PackageProperties } from "./package";

export type CustomerProps = {
	name: string;
	address: Address;
	phone: string;
};

export type ShipmentProps = {
	status?: string;
	createdAt?: string | undefined;
	id?: string | undefined;
	sender: CustomerProps;
	receiver: CustomerProps;
	itemsInfo: {
		type: "parcel" | "document";
		items: Array<ItemProps>;
		properties: Array<PackageProperties>;
	};
	moreInfo: {
		cod: number;
		payer: "sender" | "receiver";
		note: string;
	};
};
