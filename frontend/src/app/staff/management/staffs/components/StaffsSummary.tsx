import { formatDate } from "@/utils/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StaffProps } from "@/app/staff/utils/staffs";
import TableRow from "@/app/staff/components/Table/TableRow";

import Link from "next/link";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function StaffsSummary({ staff }: { staff: StaffProps }) {
	return (
		<TableRow>
			<td>
				<button type="button" className="mx-auto block">
					<FontAwesomeIcon icon={faBars} />
				</button>
			</td>
			<td>
				<Link
					className=" w-fit  block text-[#007FFF] link mx-auto"
					href={`/staff/orders/status/${staff.id}`}
				>
					{staff.id}
				</Link>
			</td>
			{[formatDate(staff.createdAt!)].map((cell, index) => (
				<td className="text-center text-xs" key={index}>
					{cell}
				</td>
			))}
		</TableRow>
	);
}
