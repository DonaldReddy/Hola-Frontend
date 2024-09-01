"use client";
import React, { ReactNode, useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import MessengerNavbar from "@/components/MessengerNavbar";
import { useRouter } from "next/navigation";

function Layout({ children }: { children: ReactNode }) {
	const user = useAppSelector((state) => state.userReducer.user);
	const isClient = useAppSelector((s) => s.generalSlice.isClient);
	const router = useRouter();

	useEffect(() => {
		if (!user && isClient) router.replace("/hola-web");
	}, [user, router, isClient]);

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
