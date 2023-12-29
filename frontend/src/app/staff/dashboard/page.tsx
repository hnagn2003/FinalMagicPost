"use client";
import Overview from "../components/Dashboard/Overview";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "../utils/statistics";
import { toast } from "react-toastify";
import { Address } from "../utils/orders";

	
export default function Page() {
	const [point, setPoint] = useState<Address>({
		province: "",
		ward: "",
		district: "",
	});
	const [menuFilter, setMenuFilter] = useState(false);
	const { isLoading, error, data } = useQuery({
		queryKey: ["statistics", menuFilter],
		queryFn: () => getStatistics(point),
	});
	if (isLoading) return <div>Loading...</div>;
	if (error) toast.error(error.message);

	if (data) {
		const statistics = data.statistics;
		return (
			
			<div>
				<div className="pt-4">
					<div className=" flex flex-col sm:flex-row sm:items-end w-full">
					</div>
					<div className="">
						<Overview data = {statistics.gatheringPoints} />
					</div>
				</div>
			</div>

		);
	}
}
