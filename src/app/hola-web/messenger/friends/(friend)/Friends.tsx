"use client";
import React, { useEffect, useRef } from "react";
import FriendCard from "./FriendCard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getAllFriends } from "@/redux/slices/friendSlice";
import { AiOutlineLoading } from "react-icons/ai";

function Friends() {
	const friends = useAppSelector((s) => s.friendSlice.friends);
	const isLoading = useAppSelector((s) => s.friendSlice.isLoading);
	const user = useAppSelector((s) => s.userReducer.user);
	const abortControllerRef = useRef<AbortController | null>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		console.log("friend");

		if (user && friends.length === 0) {
			if (abortControllerRef.current) {
				// Cancel the previous API call
				abortControllerRef.current.abort();
			}
			// Create a new AbortController for the new API call
			const controller = new AbortController();
			abortControllerRef.current = controller;
			dispatch(getAllFriends({ user, signal: controller.signal }))
				.unwrap()
				.then(() => {
					abortControllerRef.current = null; // Clear the controller after the call is complete
				})
				.catch((error) => {
					if (error.name !== "AbortError") {
						console.error("Error fetching friends:", error);
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
		<div className="flex h-[70svh] justify-center items-center">
			{isLoading ? (
				<AiOutlineLoading className="animate-spin" size={30} />
			) : friends?.length > 0 ? (
				<div className="flex h-[70svh] flex-col p-1 overflow-y-scroll items-center chat-card">
					{friends.map((friend) => (
						<FriendCard key={friend} friendUserName={friend} />
					))}
				</div>
			) : (
				<div>No Friends Yet</div>
			)}
		</div>
	);
}

export default Friends;
