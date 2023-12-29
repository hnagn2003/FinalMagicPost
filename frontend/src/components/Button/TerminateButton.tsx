export default function TerminateButton({
	children,
	type = "button",
	handleClick = () => {},
}: {
	children: React.ReactNode | Array<React.ReactNode>;
	type: "button" | "submit" | "reset";
	handleClick?: () => void;
}) {
	return (
		<button
			type={type}
			className="btn hover:border-base-100 hover:bg-base-100 btn-outline btn-error text-base-100 btn-sm hover:text-slate-300"
			onClick={() => handleClick()}
		>
			{children}
		</button>
	);
}
