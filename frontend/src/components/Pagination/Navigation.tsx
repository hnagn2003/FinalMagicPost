"use client";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";

export default function Navigation({
	numberOfPages,
	numOfPage = 1,
	setPageNumber,
}: {
	numberOfPages: number;
	numOfPage?: number;
	setPageNumber: Dispatch<SetStateAction<number>>;
}) {
	const [pageInput, setPageInput] = useState(NaN);
	return (
		<div className="text-xs relative w-full flex flex-row">
			<div className="absolute right-0 self-center flex flex-row gap-2">
				<input
					className="bg-custom-white border rounded-lg px-2 py-2 w-20 border-gray-300 invalid:border-custom-red"
					type="number"
					onChange={(e) => setPageInput(parseInt(e.currentTarget.value))}
					min={1}
					max={numberOfPages}
					placeholder="Trang #"
				/>
				<button
					type="button"
					onClick={() => {
						if (
							!isNaN(pageInput) &&
							pageInput >= 1 &&
							pageInput <= numberOfPages
						) {
							setPageNumber(pageInput);
						}
					}}
					className="py-2 bg-custom-text-color text-custom-white px-3 rounded-md"
				>
					<FontAwesomeIcon icon={faMagnifyingGlass} />
				</button>
			</div>
			<div className="flex flex-row bg-custom-white w-fit rounded-lg border-gray-300 border mx-auto">
				<button
					type="button"
					onClick={() => {
						if (numOfPage > 1) {
							setPageNumber((numOfPage) => numOfPage - 1);
						}
					}}
					className="py-2 px-4  border-r border-custom-grey"
				>
					«
				</button>
				<div className="px-6 py-2">
					Page&nbsp;{numOfPage}/{numberOfPages}
				</div>
				<button
					type="button"
					className="py-2 px-4  border-l border-custom-grey"
					onClick={() => {
						if (numOfPage < numberOfPages) {
							setPageNumber((numOfPage) => numOfPage + 1);
						}
					}}
				>
					»
				</button>
			</div>
		</div>
	);
}
