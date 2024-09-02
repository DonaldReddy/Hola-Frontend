"use client";
import React, { useEffect, useRef } from "react";
import RequestCard from "./RequestCard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getSentFriendRequests } from "@/redux/slices/friendSlice";
import { AiOutlineLoading } from "react-icons/ai";

function RequestSent() {
	const requests = useAppSelector((s) => s.friendSlice.requestSent);
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

			dispatch(getSentFriendRequests({ user, signal: controller.signal }))
				.unwrap()
				.then(() => {
					abortControllerRef.current = null; // Clear the controller after the call is complete
				});
		}

		return () => {
			// Cancel the request if the component unmounts
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, [user, dispatch]);

	return (
		<div className="flex h-[70svh] justify-center items-center pt-2">
			{isLoading.requestSent ? (
				<AiOutlineLoading className="animate-spin" size={30} />
			) : requests.length > 0 ? (
				<div className="flex h-full rounded-md flex-col p-1 overflow-y-scroll items-center chat-card ">
					{requests.map((request) => (
						<RequestCard
							userName={request.to}
							id={request.requestId}
							key={request.requestId}
							type="sent"
						/>
					))}
				</div>
			) : (
				<div>No Friend Requests Yet</div>
			)}
		</div>
	);
}

export default RequestSent;
