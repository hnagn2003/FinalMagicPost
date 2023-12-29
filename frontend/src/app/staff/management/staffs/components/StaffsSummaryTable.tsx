"use client";

import { Address } from "@/app/staff/utils/orders";

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import StaffFilter from "./StaffFilter";

import SummaryTable from "@/components/SummaryTable";

import StaffContext, { StaffContextProps } from "@/contexts/StaffContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
async function filterStaffs(
	numOfPage: number,
	roleFilter: string,
	pointChosen: Address
) {
	const filter: { [key: string]: string } = {
		numOfPage: numOfPage.toString(),
	};
	if (roleFilter) filter["role"] = roleFilter;
	if (pointChosen.province) filter["province"] = pointChosen.province;
	if (pointChosen.district) filter["district"] = pointChosen?.district;
	if (pointChosen.ward) filter["ward"] = pointChosen.ward;

	return fetch(
		`${process.env.NEXT_PUBLIC_USER_ENDPOINT}/filter?` +
			new URLSearchParams(filter),
		{ credentials: "include" }
	).then(async (res) => {
		if (res.status !== 200) {
			const json = await res.json();
			throw new Error(json.message);
		}
		return res.json();
	});
}

const columnHeadings = [
	{
		label: "Tên",
		value: "name",
	},
	{
		label: "Tên Đăng Nhập",
		value: "username",
	},
	{
		label: "Email",
		value: "email",
	},
	{
		label: "Số Điện Thoại",
		value: "phoneNumber",
	},
	{
		label: "Vai Trò",
		value: "role",
	},
];

export default function StaffsSummaryTable() {
	const [numOfPage, setPageNumber] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [roleFilter, setRoleFilter] = useState("");
	const [menuFilter, setMenuFilter] = useState(false);
	const [pointChosen, setPointFilter] = useState<Address>({
		province: "",
		district: "",
		ward: "",
	});
	const { staffs, setStaffs } = useContext(StaffContext) as StaffContextProps;
	const {
		isPending,
		error,
		data: response,
	} = useQuery({
		queryKey: ["staffs", menuFilter, numOfPage],
		queryFn: () => filterStaffs(numOfPage, roleFilter, pointChosen),
	});

	useEffect(() => {
		if (response) {
			toast.success(response.message);
			setStaffs(response.data.data);
			setTotalPage(response.data.totalPage);
		}
	}, [response, setStaffs]);

	if (isPending) return <Skeleton active />;

	if (error) toast.error(error.message);

	return (
		<div className="flex flex-row items-center gap-4">
			<SummaryTable
				items={staffs}
				columnHeadings={columnHeadings}
				numOfPage={numOfPage}
				totalPage={totalPage}
				setPageNumber={setPageNumber}
			>
				<StaffFilter
					{...{
						roleFilter,
						setRoleFilter,
						handleConfirm: () => setMenuFilter(!menuFilter),
						pointChosen,
						setPointFilter,
					}}
				/>
			</SummaryTable>
		</div>
	);
}
