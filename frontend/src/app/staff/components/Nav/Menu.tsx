import SubMenu from "./SubMenu";
import MenuItem from "./MenuItem";
import {
	faUserGroup,
	faListCheck,
	faBuilding,
	IconDefinition,
	faArrowRightFromBracket,

	faClockRotateLeft,
	faFolderPlus,
	faArrowRightToBracket,

} from "@fortawesome/free-solid-svg-icons";

export default function Menu() {
	const getMenuItemProps = (
		label: string,
		path: string,
		icon: IconDefinition | null = null
	): { label: string; path: string; icon: IconDefinition | null } => {
		return { label, path, icon };
	};
	const orderItems = [
		getMenuItemProps("Create", "/staff/orders/create", faFolderPlus),
		getMenuItemProps("Status", "/staff/orders/status", faListCheck),
	].map((props) => <MenuItem {...props} key={props.path} />);

	const deliveryItems = [
		getMenuItemProps(
			"Nhận",
			"/staff/deliveries/incoming",
			faArrowRightToBracket
		),
		getMenuItemProps(
			"Gửi Đi",
			"/staff/deliveries/outgoing",
			faArrowRightFromBracket
		),
		getMenuItemProps("History", "/staff/deliveries/history", faClockRotateLeft),
	].map((props) => <MenuItem {...props} key={props.path} />);
	const managementItems = [
		getMenuItemProps("Staffs", "/staff/management/staffs", faUserGroup),
		getMenuItemProps("Points", "/staff/management/points", faBuilding),
	].map((props) => <MenuItem {...props} key={props.path} />);

	return (
		<ul className="menu w-full rounded-box">
			<div className="btn bg-base-0 w-100">
			<MenuItem label="Thống Kê" path="/staff" /></div>
			<SubMenu label="Đơn Hàng">{orderItems}</SubMenu>
			<SubMenu label="Vận Chuyển">{deliveryItems}</SubMenu>
			<SubMenu label="Quản Lý">{managementItems}</SubMenu>
		</ul>
	);
}
