import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import Fieldset from "@/components/Form/Fieldset";
import { faList, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Dispatch, SetStateAction } from "react";

export default function Actions({
	selectAll,
	onSelectAll,
	selected,
	onConfirm,
	onReject,
	denyReason,
	setDenyReason,
}: {
	selectAll: boolean;
	onSelectAll: () => void;
	selected: boolean;
	onConfirm: () => void;
	onReject: () => void;
	denyReason: string;
	setDenyReason: Dispatch<SetStateAction<string>>;
}) {
	return (
		<Fieldset legend="Hành Động" icon={faList}>
			<div className="w-full flex flex-row gap-4">
				<SecondaryButton
					type="button"
					className="mr-auto"
					handleClick={() => onSelectAll()}
				>
					{!selectAll ? "Chọn Tất Cả" : "Hủy"}
				</SecondaryButton>
				<PrimaryButton
					type="button"
					className="btn-sm disabled:bg-base-100"
					disabled={!selected}
					handleClick={() => onConfirm()}
				>
					Xác Nhận Chọn
				</PrimaryButton>
				<SecondaryButton
					type="button"
					className="btn-error disabled:bg-base-100"
					disabled={!selected || !denyReason}
					handleClick={() => onReject()}
				>
					Từ Chối
				</SecondaryButton>
				<button type="button">
					<FontAwesomeIcon icon={faRotateRight} className="w-full" />
				</button>
			</div>
		</Fieldset>
	);
}
