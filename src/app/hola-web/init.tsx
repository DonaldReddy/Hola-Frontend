"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setIsClient, setScreenWidth } from "@/redux/slices/generalSlice";
import { changeUser, validateSession } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

function Init() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const user = useAppSelector((state) => state.userReducer.user);

	// Initialize client-side state and monitor screen width changes
	useEffect(() => {
		if (!user) {
			const storedUser = localStorage.getItem("user") || "";
			dispatch(changeUser(storedUser));
		}
		dispatch(setIsClient(true));

		const handleResize = () => {
			dispatch(setScreenWidth(window.innerWidth));
		};

		handleResize(); // Set initial screen width
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [dispatch]);

	// Validate user session and redirect to login page if validation fails
	useEffect(() => {
		if (user) {
			dispatch(validateSession(user))
				.unwrap()
				.catch(() => {
					router.replace("/hola-web");
				});
		}
	}, [user, dispatch, router]);

	return null;
}

export default Init;
