"use client";

import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import TerminateButton from "@/components/Button/TerminateButton";
import Form from "@/components/Form/Form";
import Title from "@/components/Title/Title";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { ShipmentProps } from "../../types/Order/orders";
import { ItemProps } from "../../types/Order/package";
import { defautShipment, useShipmentStatus } from "../../utils/orders";
import CustomerFieldset from "./Customer/CustomerFieldset";
import ExtraDataFieldset from "./MoreInfo/ExtraDataFieldset";
import PackageFieldset from "./Package/PackageFieldset";
import { Steps } from "antd";

export default function Shipment({
	order = null,
	handleSubmit,
}: {
	order?: ShipmentProps | null;
	handleSubmit: (order: ShipmentProps) => void;
}) {
	const {
		id,
		createdAt,
		status,
		sender,
		receiver,
		itemsInfo,
		moreInfo,
		resetShipment,
	} = useShipmentStatus(order || defautShipment);
	const [editable, setEditable] = useState(order === null);
	const packageValue = itemsInfo.items.value.reduce(
		(packageValue: number, item: ItemProps) => packageValue + item.value,
		0
	);
	const newShipment = {
		sender: sender.value,
		receiver: receiver.value,
		itemsInfo: {
			type: itemsInfo.type.value,
			items: itemsInfo.items.value,
			properties: itemsInfo.properties.value,
		},
		moreInfo: {
			cod: moreInfo.cod.value,
			payer: moreInfo.payer.value,
			note: moreInfo.note.value,
		},
		id,
		createdAt,
		status: status.value,
	};
	const [currentStep, setCurrentStep] = useState(0);

	const onChangeStep = (value: number) => {
		setCurrentStep(value);
		console.log(value);
	}

	return (
		<div>
			<div className="flex flex-row justify-between items-center">
				<Title>{order ? `Shipment ID: ${order.id}` : "Đơn hàng mới"}</Title>
				{editable ? null : (
					<button
						className="btn btn-success mb-4 btn-sm"
						type="button"
						onClick={() => setEditable(true)}
					>
						CHỈNH SỬA
					</button>
				)}
			</div>
			{order ? (
				<Link
					className="w-fit link link-neutral mb-4 block"
					href={`/view/${order.id}`}
				>
					<FontAwesomeIcon icon={faReceipt} className="mr-2" />
					View receipt
				</Link>
			) : null}
			<Form
				// handleSubmit={() => handleSubmit({ ...order, ...newShipment })}
				// className="w-full gap-4 lg:grid lg:grid-cols-2 flex flex-col"
				handleSubmit={() => handleSubmit(newShipment)}
				className="w-full gap-4 lg:grid flex flex-col"
			>
				{currentStep == 0 ?
					<CustomerFieldset
						type="sender"
						info={sender.value}
						handleChange={sender.handleChange}
						disabled={!editable}
					/>
					: null}
				{currentStep == 1 ?
					<CustomerFieldset
						type="receiver"
						info={receiver.value}
						handleChange={receiver.handleChange}
						disabled={!editable}
					/>
					: null}
				{currentStep == 2 ?
					<PackageFieldset {...itemsInfo} disabled={!editable} />
					: null}
				{currentStep == 3 ?
					<>
						<ExtraDataFieldset
							{...{ ...moreInfo, packageValue }}
							disabled={!editable}
						/>
						<div className="flex flex-row gap-4 justify-end items-center">
							{order ? (
								editable ? (
									<>
										<PrimaryButton type="submit">Lưu Thay Đổi</PrimaryButton>
										<TerminateButton
											type="button"
											handleClick={() => {
												resetShipment();
												setEditable(false);
											}}
										>
											Hủy Bỏ Thay Đổi
										</TerminateButton>
									</>
								) : null
							) : (
								<>
									<PrimaryButton type="submit">Xác Nhận</PrimaryButton>
									<SecondaryButton type="reset" handleClick={() => resetShipment()}>
										Làm Mới
									</SecondaryButton>
								</>
							)}
						</div>
					</>


					: null}
				<Steps
					current={currentStep}
					onChange={onChangeStep}
					items={[
						{
							title: 'Bước 1',
						},
						{
							title: 'Bước 2',
						},
						{
							title: 'Bước 3',
						},
						{
							title: 'Bước 4',
						},
					]}
				/>

			</Form>
		</div>
	);
}
