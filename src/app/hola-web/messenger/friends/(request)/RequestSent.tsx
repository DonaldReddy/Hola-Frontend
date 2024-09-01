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
				})
				.catch((error) => {
					if (error.name !== "AbortError") {
						console.error("Error fetching friend requests:", error);
					}
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
		<div className="flex h-[77svh] justify-center items-center">
			{isLoading ? (
				<AiOutlineLoading className="animate-spin" size={30} />
			) : requests.length > 0 ? ( // Add a safeguard check
				<div className="flex h-[56svh] rounded-md flex-col p-1 overflow-y-scroll items-center chat-card">
					{requests.map((request) => (
						<div key={request.requestId}>
							<RequestCard
								userName={request.to}
								key={request.requestId}
								id={request.requestId}
								type="sent"
							/>
						</div>
					))}
				</div>
			) : (
				<div>No Friend Requests Yet</div> // Adjusted the message to be more specific
			)}
		</div>
	);
}

export default RequestSent;
