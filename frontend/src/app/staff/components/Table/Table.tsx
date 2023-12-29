export default function Table({
	columnHeadings,
	children,
}: {
	columnHeadings: Array<{ label: string; value: string }>;
	children: React.ReactNode[];
}) {
	return (
		<div className="flex flex-col gap-4 w-full">
			<table className="table table-sm bg-custom-white w-full rounded-md shadow-md overflow-x-auto">
				<thead className="text-custom-text-color">
					<tr className="border-custom-grey border-b-2 ">
						{[{ label: "", value: "" }, ...columnHeadings].map(
							(header, index) => (
								<th className="text-center text-sm" key={index}>
									{header.label}
								</th>
							)
						)}
					</tr>
				</thead>
				<tbody>
					{children ? (
						children
					) : (
						<tr className="border-none">
							<td colSpan={100} className="text-center italic">
								Không có gì để hiển thị
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
