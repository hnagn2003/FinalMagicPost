"use client";
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import './headerStyles.css';
import SubMenu from "../Nav/SubMenu";
import MenuItem from "../Nav/MenuItem";

import {
	faFolderPlus,
	faListCheck,
	faArrowRightFromBracket,
	faArrowRightToBracket,
	faUserGroup,
	faBuilding,
	IconDefinition,
	faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function Header({ }: { onToggle: () => void }) {
	const router = useRouter();
	const handleLogout = async () => {
		const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/logout`, {
			credentials: "include",
			method: "POST",
		});
		const response = await res.json();
		if (res.status === 200) {
			toast.success(response.message);
			router.replace("/login");
		} else {
			toast.error(response.message);
		}
	};
	const getMenuItemProps = (
		label: string,
		path: string,
		icon: IconDefinition | null = null
	): { label: string; path: string; icon: IconDefinition | null } => {
		return { label, path, icon };
	};
	const orderItems = [

		getMenuItemProps("Tạo", "/staff/orders/create", faFolderPlus),
		getMenuItemProps("Tình Trạng", "/staff/orders/status", faListCheck),
	].map((props) => <MenuItem {...props} key={props.path} />);
	const deliveryItems = [
		getMenuItemProps(
			"Nhận",
			"/staff/deliveries/incoming",
			faArrowRightToBracket
		),
		getMenuItemProps(
			"Gửi",
			"/staff/deliveries/outgoing",
			faArrowRightFromBracket
		),
		getMenuItemProps("Lịch Sử", "/staff/deliveries/history", faClockRotateLeft),
	].map((props) => <MenuItem {...props} key={props.path} />);
	const managementItems = [
		getMenuItemProps("Nhân Viên", "/staff/management/staffs", faUserGroup),
		getMenuItemProps("Điểm", "/staff/management/points", faBuilding),
	].map((props) => <MenuItem {...props} key={props.path} />);

	return (
		<header className="p-4 h-16 pr-6 md:gap-6 gap-4 flex flex-row items-center justify-between z-[30] fixed w-full custom-header">
			<picture>
				<source media="(max-width: 500px)" srcSet="/logo_sqrt_notext_crop.png" />
				<Image
					src="/logo_sqrt_notext_crop.png"
					alt=""
					width="0"
					height="0"
					className="md:w-16 w-16 m-6 h-auto"
				/>
			</picture>
			<ul className="menu xl:menu-horizontal  lg:min-w-max bg-base-100 rounded-box h-16">
					<div className="btn bg-base-400 hover:bg-base-100">
					<MenuItem label="Thống Kê" path="/staff/dashboard" subitem={false} />
					</div>
					<SubMenu label="Đơn Hàng">{orderItems}</SubMenu>

					<SubMenu label="Vận Chuyển">{deliveryItems}</SubMenu>

					<SubMenu label="Quản Lý">{managementItems}</SubMenu>

			</ul>
			<div className="flex justify-center items-center">

				<div className="search-bar mr-4 relative">
					<input
						type="text"
						placeholder="Tìm kiếm..."
						className="search-input rounded-full py-2 px-4 border border-gray-300 focus:outline-none focus:border-blue-500 mx-auto custom-search-input" />
				</div>
			</div>
			<button onClick={handleLogout}>
				<FontAwesomeIcon icon={faSignOutAlt} className="h-4" />
			</button>
		</header>
	);
}
