"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CollapsedContext } from "../../layout";
import { useContext } from "react";

export default function MenuItem({
	label,
	path,
	subitem = true,
	icon = null,
}: {
	label: string;
	path: string;
	subitem?: boolean
	icon?: any;
}) {
	const { setCollapsed } = useContext(CollapsedContext);
	return (
		<li onClick={() => setCollapsed(true)}>
			<Link href={path}>
				{icon ? <FontAwesomeIcon icon={icon} className={subitem === false ? "bg-base-0" : "w-3"} /> : null}
				{label}
			</Link>
		</li>
	);
}
