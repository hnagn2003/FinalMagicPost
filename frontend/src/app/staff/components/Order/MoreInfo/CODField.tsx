"use client";

import { CODProps } from "@/app/staff/types/Order/extradata";
import Checkbox from "@/components/Form/Checkbox";
import NumberInput from "@/components/Form/NumberInput";
import { useEffect, useState } from "react";

export default function ShippingCOD({
	value,
	handleChange,
	packageValue,
}: CODProps & { packageValue: number }) {
	const [checked, setChecked] = useState(false);
	useEffect(() => {
		if (checked) {
			handleChange(packageValue);
		}
	}, [packageValue, checked, handleChange]);
	return (
		<div className="flex flex-col gap-2">
			<div className="font-medium">Thu khi vận chuyển</div>
			<Checkbox
				label="Giá trị đơn hàng"
				handleChange={() => {
					if (!checked) {
						handleChange(packageValue);
					}
					setChecked(!checked);
				}}
				name="use-package-value"
				checked={checked}
				value=""
				className="text-sm"
			/>
			<NumberInput
				label=""
				placeholder="Amount"
				name="cod-fee"
				value={value}
				handleChange={(amount) => handleChange(amount)}
				minValue={0}
				disabled={checked}
			/>
		</div>
	);
}
