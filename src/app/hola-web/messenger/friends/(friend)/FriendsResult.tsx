"use client";
import React, { useEffect, useRef } from "react";
import FriendCard from "./FriendCard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getAllFriends } from "@/redux/slices/friendSlice";
import { AiOutlineLoading } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import useKeyboardScrollNavigation from "@/hooks/useKeyboardScrollNavigation";

function Friends() {
	const friends = useAppSelector((s) => s.friendSlice.friends);
	const isLoading = useAppSelector((s) => s.friendSlice.isLoading);
	const user = useAppSelector((s) => s.userReducer.user);
	const abortControllerRef = useRef<AbortController | null>(null);
	const dispatch = useAppDispatch();
	const searchParams = useSearchParams();
	const { cardRefs, containerRef, selectedIndex } =
		useKeyboardScrollNavigation(friends);

	useEffect(() => {
		if (user) {
			const search = searchParams.get("search") || "";
			if (abortControllerRef.current) {
				// Cancel the previous API call
				abortControllerRef.current.abort();
			}
			// Create a new AbortController for the new API call
			const controller = new AbortController();
			abortControllerRef.current = controller;
			dispatch(getAllFriends({ user, search, signal: controller.signal }))
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
	}, [user, dispatch, searchParams]);

	return (
		<div
			className="h-[70svh] w-[90svw] overflow-y-scroll chat-card flex justify-center items-center"
			ref={containerRef}
		>
			{isLoading.friend ? (
				<AiOutlineLoading className="animate-spin" size={30} />
			) : friends.length > 0 ? (
				<div className="w-full h-full">
					{friends.map((friend, index) => (
						<div
							ref={(el) => {
								cardRefs.current[index] = el;
							}}
						>
							<FriendCard
								key={friend.userName}
								friendUserName={friend.userName}
								name={friend.name}
							/>
						</div>
					))}
				</div>
			) : (
				<div>No friends found</div>
			)}
		</div>
	);
}

export default Friends;
