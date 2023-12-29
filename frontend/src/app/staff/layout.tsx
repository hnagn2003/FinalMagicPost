"use client";
import { ShipmentContextProvider } from "@/contexts/OrderContext";
import { PointContextProvider } from "@/contexts/PointContext";
import withAuth from "@/utils/withAuth";
import { Content, Header, Nav } from "./components";
import { StaffContextProvider } from "@/contexts/StaffContext";
import { Dispatch, SetStateAction, createContext, useState } from "react";


export const CollapsedContext = createContext({
	collapsed: true,
	setCollapsed: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

function Layout({ children }: { children: Array<React.ReactNode> }) {
	const [collapsed, setCollapsed] = useState(true);
	return (
		<ShipmentContextProvider>
			<StaffContextProvider>
				<PointContextProvider>
					<CollapsedContext.Provider value={{ collapsed, setCollapsed }}>
						<div className="h-screen">
							<Header onToggle={() => setCollapsed(!collapsed)} />
							<div className="fle relative h-screen">
								<Nav />
								<Content>{children}</Content>
							</div>
						</div>
					</CollapsedContext.Provider>
				</PointContextProvider>
			</StaffContextProvider>
		</ShipmentContextProvider>
	);
}

export default withAuth(Layout);
