"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import MessengerNavbar from "@/components/MessengerNavbar";

function Layout({ children }: { children: ReactNode }) {
	const user = useAppSelector((state) => state.userReducer.user);
	const isClient = useAppSelector((s) => s.generalSlice.isClient);

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
