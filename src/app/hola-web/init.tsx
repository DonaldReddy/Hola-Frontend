"use client";
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setIsClient, setScreenWidth } from "@/redux/slices/generalSlice";
import {
	changeUser,
	clearError,
	validateSession,
} from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

function Init() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const error = useAppSelector((state) => state.userReducer.error);
	const user = useAppSelector((state) => state.userReducer.user);
	const isClient = useAppSelector((state) => state.generalSlice.isClient);

	const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Initialize client-side state and monitor screen width changes
	useEffect(() => {
		dispatch(setIsClient(true));

		const handleResize = () => {
			dispatch(setScreenWidth(window.innerWidth));
		};

		handleResize(); // Set initial screen width
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [dispatch]);

	// Check for an existing logged-in user and redirect if found
	useEffect(() => {
		if (isClient && !user) {
			const storedUser = localStorage.getItem("user") || "";
			dispatch(changeUser(storedUser));
		}
	}, [user, isClient, dispatch, router]);

	// Automatically clear error messages after 3 seconds
	useEffect(() => {
		if (error) {
			if (errorTimeoutRef.current) {
				clearTimeout(errorTimeoutRef.current);
			}
			errorTimeoutRef.current = setTimeout(() => {
				dispatch(clearError());
				errorTimeoutRef.current = null;
			}, 3000);
		} else if (errorTimeoutRef.current) {
			clearTimeout(errorTimeoutRef.current);
			errorTimeoutRef.current = null;
		}
	}, [error, dispatch]);

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
