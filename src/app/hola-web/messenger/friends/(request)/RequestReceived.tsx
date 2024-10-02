"use client";
import React, { useEffect, useRef } from "react";
import RequestCard from "./RequestCard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getReceivedFriendRequests } from "@/redux/slices/friendSlice";
import { AiOutlineLoading } from "react-icons/ai";

function RequestReceived() {
	const requests = useAppSelector((s) => s.friendSlice.requestReceived);
	const user = useAppSelector((s) => s.userReducer.user);
	const isLoading = useAppSelector((s) => s.friendSlice.isLoading);
	const abortControllerRef = useRef<AbortController | null>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (user && requests.length === 0) {
			if (abortControllerRef.current) {
				// Cancel the previous API call
				abortControllerRef.current.abort();
			}

			// Create a new AbortController for the new API call
			const controller = new AbortController();
			abortControllerRef.current = controller;

			dispatch(getReceivedFriendRequests({ user, signal: controller.signal }))
				.unwrap()
				.then(() => {
					abortControllerRef.current = null; // Clear the controller after the call is complete
				})
				.catch((error) => {});
		}

		return () => {
			// Cancel the request if the component unmounts
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, [user, dispatch]);

	return (
		<div className="h-[70svh] w-[90svw] overflow-y-scroll scroll-area flex justify-center items-center">
			{isLoading.requestReceived ? (
				<AiOutlineLoading className="animate-spin" size={30} />
			) : requests.length > 0 ? (
				<div className="h-full w-full">
					{requests.map((request) => (
						<RequestCard
							userName={request.from}
							key={request.requestId}
							id={request.requestId}
						/>
					))}
				</div>
			) : (
				<div>No Friend Requests yet</div>
			)}
		</div>
	);
}

export default RequestReceived;
