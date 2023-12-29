export default function InputContainer({
	label,
	children,
	required = false,
	className = "",
	flexDirection = "row",
	width = "150px",
}: {
	label: string;
	children: Array<React.ReactNode> | React.ReactNode;
	required?: boolean;
	className?: string;
	flexDirection?: "col" | "row"; 
	width?: string;

}) {
	return (
		<label
			className={`text-left flex flex-1 gap-1 flex-${flexDirection} ${className}`}
			// style={{ width }}
		>
			<span className="font-small" style={{ width }}>
				{label}
				{required ? <span className="text-custom-red ml-1">*</span> : null}

			</span>
			{children}
		</label>
	);
}
