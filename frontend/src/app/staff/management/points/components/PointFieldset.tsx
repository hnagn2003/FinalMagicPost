import AddressInput from "@/components/AddressInput";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Fieldset from "../../../../../components/Form/Fieldset";
import Select from "../../../../../components/Form/Select";
import TextInput from "../../../../../components/Form/TextInput";
import { PointShipmentStatusProps } from "../../../utils/points";
import { UserOutlined } from '@ant-design/icons';
import { MailOutlined } from '@ant-design/icons';
import { PhoneOutlined } from '@ant-design/icons';

export default function PointFieldSet({
	state,
	disabled = false,
}: {
	state: PointShipmentStatusProps;
	disabled?: boolean;
}) {
	return (
		<Fieldset
			legend={"Thông Tin Điểm"}
			icon={faLocationDot}
			className="sm:flex-col"
			disabled={disabled}
		>
			<TextInput
				label="Tên Điểm"
				placeholder="Tên Điểm"
				required={true}
				name="point-name"
				value={state.pointName.value}
				handleChange={(pointName: string) =>
					state.pointName.handleChange(pointName)
				}
				prefix={<UserOutlined />}

			/>
			<Select
				label="Loại Điểm"
				name="type"
				options={[
					{ label: "Điểm Giao Dịch", value: "TRANSACTION_POINT" },
					{ label: "Điểm Tập Kết", value: "GATHERING_POINT" },
				]}
				handleChange={(value) => {
					state.type.handleChange(value);
				}}
				className="text-sm"
				value={state.type.value}
				required={true}
			/>
			<TextInput
				label="Số Điện Thoại"
				placeholder="Số Điện Thoại"
				required={true}
				name="phone"
				value={state.phone.value}
				handleChange={(phone: string) => state.phone.handleChange(phone)}
				prefix={<PhoneOutlined />}
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
			<AddressInput
				value={state.address.value}
				handleChange={(newAddress) =>
					state.address.handleChange({
						...state.address.value,
						...newAddress,
					})
				}
			/>
		</Fieldset>
	);
}
