"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import PeopleCard from "./PeopleCard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { clearSearchResults, getUsers } from "@/redux/slices/friendSlice";
import { AiOutlineLoading } from "react-icons/ai";
import { User } from "@/types";
import useKeyboardScrollNavigation from "@/hooks/useKeyboardScrollNavigation";

function PeopleResult() {
	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();
	const people = useAppSelector((s) => s.friendSlice.people);
	const friends = useAppSelector((s) => s.friendSlice.friends);
	const requests = useAppSelector((s) => s.friendSlice.requestSent);
	const isLoading = useAppSelector((s) => s.friendSlice.isLoading.people);
	let timeout = useRef<NodeJS.Timeout | null>(null);
	const { containerRef, cardRefs, selectedIndex } =
		useKeyboardScrollNavigation(people);

	useEffect(() => {
		const search = searchParams.get("search") || "";
		if (timeout.current) clearTimeout(timeout.current);

		timeout.current = setTimeout(() => {
			if (search) {
				dispatch(getUsers(search));
			} else {
				dispatch(clearSearchResults());
			}
		}, 200);

		return () => {
			if (timeout.current) clearTimeout(timeout.current);
		};
	}, [searchParams, dispatch]);

	useEffect(() => {
		return () => {
			dispatch(clearSearchResults());
		};
	}, [dispatch]);

	function findStatus(person: User): "friend" | "sent" | "not sent" {
		if (friends.some((friend) => friend.userName === person.userName)) {
			return "friend";
		}
		if (requests.some((request) => request.to === person.userName)) {
			return "sent";
		}
		return "not sent";
	}

	return (
		<div
			ref={containerRef}
			className="h-[70svh] w-[90svw] overflow-y-scroll chat-card scroll-smooth"
		>
			{isLoading ? (
				<div className="flex justify-center items-center">
					<AiOutlineLoading className="animate-spin" size={30} />
					<span className="ml-2">Loading...</span>
				</div>
			) : searchParams.get("search") ? (
				people.length > 0 ? (
					people.map((person: User, index: number) => (
						<div
							key={person.userName}
							ref={(el) => {
								cardRefs.current[index] = el;
							}}
						>
							<PeopleCard
								userName={person.userName}
								name={person.name}
								status={findStatus(person)}
								isSelected={index === selectedIndex} // Pass selected state
							/>
						</div>
					))
				) : (
					<div>No friends found</div>
				)
			) : (
				<div>Search for people</div>
			)}
		</div>
	);
}

export default PeopleResult;
