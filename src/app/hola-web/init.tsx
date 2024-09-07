"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setIsClient, setScreenWidth } from "@/redux/slices/generalSlice";
import { changeUser, validateSession } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

function Init({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const user = useAppSelector((state) => state.userReducer.user);

	useEffect(() => {
		if (!user) {
			const storedUser = localStorage.getItem("user") || "";
			dispatch(changeUser(storedUser));
		}
		dispatch(setIsClient(true));

		const handleResize = () => {
			dispatch(setScreenWidth(window.innerWidth));
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [dispatch, user]);

	// useEffect(() => {
	// 	if (user) {
	// 		dispatch(validateSession(user))
	// 			.unwrap()
	// 			.then(() => {})
	// 			.catch(() => {
	// 				router.replace("/hola-web");
	// 			});
	// 	}
	// }, [user, dispatch, router]);

	return <>{children}</>;
}

export default Init;
