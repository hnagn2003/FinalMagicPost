"use client";

import { useState } from "react";
import InputContainer from "./InputContainer";
import { Input } from 'antd';

export default function TextInput({
	label = "",
	placeholder,
	name,
	type = "text",
	required = false,
	className = "",
	value,
	handleChange,
	prefix
}: {
	label: string;
	placeholder: string;
	name: string;
	type?: "text" | "tel";
	required?: boolean;
	className?: string;
	value: string;
	handleChange: (value: string) => void;
	prefix: any
}) {
	const [focused, setFocused] = useState(false);
	return (
		<InputContainer {...{ label, required, className }}>
			<Input type={type} size="small" placeholder={placeholder}
				className={`custom-input ${
					focused && value === "" ? "custom-input-invalid" : ""
				}`}
				name={name}
				onFocus={() => setFocused(true)}
				required={required}
				value={value}
				onChange={(e) => handleChange(e.currentTarget.value)}
				prefix={prefix}/>
		</InputContainer>
	);
}
