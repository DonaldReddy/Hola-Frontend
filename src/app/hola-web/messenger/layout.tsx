"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import MessengerNavbar from "@/components/MessengerNavbar";
import { changeUser } from "@/redux/slices/userSlice";

function Layout({ children }: { children: ReactNode }) {
	const user = useAppSelector((state) => state.userReducer.user);
	const router = useRouter();
	const [isClient, setIsClient] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setIsClient(true);
		if (typeof window !== "undefined") {
			const userFromStorage = localStorage.getItem("user") || "";
			dispatch(changeUser(userFromStorage));
			if (!userFromStorage) {
				router.push("/hola-web/");
			}
		}
	}, [isClient]);

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
