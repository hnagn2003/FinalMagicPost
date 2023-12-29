import Fieldset from "@/components/Form/Fieldset";
import Select from "@/components/Form/Select";
import TextInput from "@/components/Form/TextInput";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { StaffShipmentStatusProps } from "../../../utils/staffs";
import { UserOutlined } from '@ant-design/icons';
import { MailOutlined } from '@ant-design/icons';
import { PhoneOutlined } from '@ant-design/icons';

const roles = [
	{
		label: "Company Administrator",
		value: "COMPANY_ADMINISTRATOR",
	},
	{
		label: "Gathering Point Manager",
		value: "COLLECTION_POINT_LEADER",
	},
	{
		label: "Transaction Point Manager",
		value: "TRANSACTION_POINT_LEADER",
	},
	{
		label: "Transaction Staff",
		value: "TRANSACTION_STAFF",
	},
	{
		label: "Gathering Staff",
		value: "GATHERING_STAFF",
	},
];

export default function SettingStaffField({
	state,
	disabled = false,
	editView = false,
}: {
	state: StaffShipmentStatusProps;
	disabled?: boolean;
	editView?: boolean;
}) {
	return (
		<Fieldset
			legend="Thông Tin Nhân Viên"
			icon={faLocationDot}
			className="sm:flex-col"
			disabled={disabled}
		>
			<Select
				label="Vai Trò"
				name="role"
				options={roles}
				handleChange={(value) => {
					state.role.handleChange(value);
				}}
				className="text-sm"
				value={state.role.value}
				required={true}
				disabled={editView}
			/>
			<TextInput
				label="Tên"
				placeholder="Name"
				required={true}
				name="name"
				value={state.name.value}
				handleChange={(name: string) => state.name.handleChange(name)}
				prefix={<UserOutlined />}
			/>
			<TextInput
				label="Tên Người Dùng"
				placeholder="Username"
				required={true}
				name="username"
				value={state.username.value}
				handleChange={(username: string) =>
					state.username.handleChange(username)
				}
				prefix={<UserOutlined />}
			/>
			<TextInput
				label="Email"
				placeholder="Email"
				required={true}
				name="email"
				value={state.email.value}
				handleChange={(email: string) => state.email.handleChange(email)}
				prefix={<MailOutlined />}
			/>
			<TextInput
				label="Số Điện Thoại"
				placeholder="Số Điện Thoại"
				required={true}
				name="phoneNumber"
				value={state.phoneNumber.value}
				handleChange={(phoneNumber: string) =>
					state.phoneNumber.handleChange(phoneNumber)
				}
				prefix={<PhoneOutlined />}
			/>
		</Fieldset>
	);
}
