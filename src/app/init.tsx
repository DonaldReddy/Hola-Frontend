"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setIsClient, setScreenWidth } from "@/redux/slices/generalSlice";

function Init() {
	const dispatch = useAppDispatch();
	function handleResize() {
		dispatch(setScreenWidth(window.innerWidth));
	}
	useEffect(() => {
		dispatch(setIsClient(true));
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return <></>;
}

export default Init;
