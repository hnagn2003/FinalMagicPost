import {
	CreateStaffProps,
	emptyCreateStaff,
	useCreateStaffShipmentStatus,
} from "@/app/staff/utils/staffs";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import Form from "@/components/Form/Form";
import StaffAssignPointField from "./StaffAssignPointFieldSet";
import SettingStaffField from "./StaffFieldSet";
import { useRouter } from "next/navigation";

export default function Staff({
	staff = null,
	handleSubmit,
	editable = false,
}: {
	staff?: CreateStaffProps | null;
	handleSubmit: (staff: CreateStaffProps) => void;
	editable?: boolean;
}) {
	const state = useCreateStaffShipmentStatus(staff || emptyCreateStaff);
	const router = useRouter();

	const newStaff: CreateStaffProps = {
		role: state.role.value,
		name: state.name.value,
		username: state.username.value,
		email: state.email.value,
		phoneNumber: state.phoneNumber.value,
		pointId: state.pointId.value,
		address: state.address.value,
	};

	return (
		<Form
			handleSubmit={() =>
				handleSubmit(staff ? { ...staff, ...newStaff } : newStaff)
			}
			className="w-full gap-4 flex flex-col"
		>
			<SettingStaffField state={state} disabled={!editable} editView={!!staff} />
			<StaffAssignPointField state={state} disabled={!editable || !!staff} />
			{editable ? (
				<div className="flex gap-4 flex-row">
					<PrimaryButton type="submit">
						{staff ? "Lưu Thay Đổi" : "Xác Nhận"}
					</PrimaryButton>
					<SecondaryButton
						type="reset"
						handleClick={
							staff
								? () => router.push("/staff/management/staffs")
								: () => state.resetStaff()
						}
					>
						{staff ? "Hủy" : "Làm Lại"}
					</SecondaryButton>
				</div>
			) : null}
		</Form>
	);
}
