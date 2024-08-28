"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setIsClient, setScreenWidth } from "@/redux/slices/generalSlice";

function Init() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setIsClient(true));

		function handleResize() {
			dispatch(setScreenWidth(window.innerWidth));
		}

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [dispatch]);

	return <></>;
}

export default Init;
