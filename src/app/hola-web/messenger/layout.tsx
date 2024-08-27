"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import MessengerNavbar from "@/components/MessengerNavbar";

function Layout({ children }: { children: ReactNode }) {
	const user = useAppSelector((state) => state.userReducer.user);
	const router = useRouter();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		if (!user) router.replace("/hola-web");
	}, [user, router]);

	if (!isClient) {
		return (
			<div className="h-svh flex justify-center items-center">Loading...</div>
		);
	}

	if (!user) {
		return (
			<div className="h-svh flex justify-center items-center">
				not logged in
			</div>
		);
	}

	return (
		<div className="h-svh">
			<MessengerNavbar />
			{children}
		</div>
	);
}

export default Layout;
